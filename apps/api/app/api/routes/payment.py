from fastapi import APIRouter, Request, HTTPException, Depends, Header
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from typing import Optional
import logging

from app.core.config import get_settings
from app.core.database import get_db
from app.services.lemonsqueezy import lemon_service
from app.api.deps import get_current_user

router = APIRouter(prefix="/api/payment", tags=["Payment"])
settings = get_settings()
logger = logging.getLogger(__name__)

@router.get("/checkout-url")
async def get_checkout_url(
    plan: str = "monthly",  # "monthly", "yearly", or "profil_pro"
    current_user = Depends(get_current_user)
):
    """Get personalized checkout URL for user."""
    if not lemon_service:
        raise HTTPException(status_code=503, detail="Payment not enabled")
    
    if plan == "profil_pro":
        variant_id = settings.lemon_profil_pro_product_id # Assuming product_id acts as variant or we have a specific one
    else:
        variant_id = (
            settings.lemonsqueezy_variant_id_monthly 
            if plan == "monthly" 
            else settings.lemonsqueezy_variant_id_yearly
        )
    
    if not variant_id:
        raise HTTPException(status_code=400, detail=f"Plan {plan} variant not configured")

    url = lemon_service.get_checkout_url(
        variant_id=variant_id,
        user_email=current_user.email,
        user_id=str(current_user.id)
    )
    
    return {"checkout_url": url, "plan": plan}

@router.get("/subscription")
async def get_subscription_status(
    db: AsyncSession = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """Get current user's subscription status."""
    result = await db.execute(
        text("""
            SELECT subscription_id, subscription_status, plan_variant, 
                   current_period_end, lemon_customer_id, is_lifetime, plan_id
            FROM user_subscriptions 
            WHERE user_id = :user_id
        """),
        {"user_id": str(current_user.id)}
    )
    row = result.fetchone()
    
    if not row:
        return {
            "is_premium": False,
            "status": "free",
            "plan": None,
            "is_lifetime": False
        }
    
    return {
        "is_premium": row.subscription_status == "active" or row.is_lifetime,
        "status": row.subscription_status,
        "plan": row.plan_id,
        "is_lifetime": row.is_lifetime,
        "renews_at": row.current_period_end,
        "manage_url": await lemon_service.get_customer_portal_url(row.lemon_customer_id) if row.lemon_customer_id else None
    }

async def handle_order_created(event_data: dict, db: AsyncSession):
    """Handle one-time purchase (Profil Pro)."""
    data = event_data.get("data", {})
    attrs = data.get("attributes", {})
    
    # Get product info to check if it's the Profil Pro
    product_id = str(attrs.get("product_id"))
    
    # Get user from custom_data
    custom_data = event_data.get("meta", {}).get("custom_data", {})
    user_id = custom_data.get("user_id")
    
    if not user_id:
        logger.error("One-time purchase without user_id!")
        return
    
    # Check if this is the Profil Pro product
    if product_id == settings.lemon_profil_pro_product_id:
        # Create lifetime subscription
        query = text("""
            INSERT INTO user_subscriptions (user_id, plan_id, is_lifetime, purchased_at, subscription_status)
            VALUES (:user_id, 'profil_pro', TRUE, NOW(), 'active')
            ON CONFLICT (user_id) DO UPDATE SET
                plan_id = 'profil_pro',
                is_lifetime = TRUE,
                purchased_at = NOW(),
                subscription_status = 'active',
                updated_at = NOW()
        """)
        await db.execute(query, {"user_id": user_id})
        await db.commit()
        logger.info(f"Profil Pro activated for user {user_id}")

@router.post("/webhook")
async def lemon_webhook(
    request: Request,
    db: AsyncSession = Depends(get_db),
    x_signature: Optional[str] = Header(None)
):
    """Handle Lemon Squeezy webhooks."""
    if not lemon_service:
        raise HTTPException(status_code=503, detail="Payment not enabled")
    
    # Verify signature
    body = await request.body()
    if not x_signature or not lemon_service.verify_webhook_signature(body, x_signature):
        raise HTTPException(status_code=401, detail="Invalid signature")
    
    payload = await request.json()
    event_name = payload.get("meta", {}).get("event_name")
    data = payload.get("data", {})
    attrs = data.get("attributes", {})
    
    # 1. Handle One-time orders
    if event_name == "order_created":
        await handle_order_created(payload, db)
        return {"status": "processed"}

    # 2. Extract user_id for subscriptions
    custom_data = payload.get("meta", {}).get("custom_data", {})
    user_id = custom_data.get("user_id")
    
    if not user_id:
        customer_email = attrs.get("user_email")
        result = await db.execute(
            text("SELECT id FROM users WHERE email = :email"),
            {"email": customer_email}
        )
        row = result.fetchone()
        if row:
            user_id = str(row[0])
    
    if not user_id:
        logger.warning(f"⚠️ Webhook received but no user_id found: {event_name}")
        return {"status": "ignored", "reason": "no_user_id"}
    
    # Handle subscription events
    if event_name == "subscription_created":
        plan_id = "starter" # Default or mapping logic needed
        variant_id = str(attrs.get("variant_id"))
        if variant_id == settings.lemonsqueezy_variant_id_yearly:
            # logic to map variant to plan_id
            pass

        await db.execute(
            text("""
                INSERT INTO user_subscriptions 
                (user_id, plan_id, subscription_id, subscription_status, plan_variant, 
                 current_period_end, lemon_customer_id)
                VALUES (:user_id, :plan_id, :sub_id, :status, :variant, :renews_at, :customer_id)
                ON CONFLICT (user_id) DO UPDATE SET
                    plan_id = :plan_id,
                    subscription_id = :sub_id,
                    subscription_status = :status,
                    plan_variant = :variant,
                    current_period_end = :renews_at,
                    lemon_customer_id = :customer_id,
                    updated_at = NOW()
            """),
            {
                "user_id": user_id,
                "plan_id": "starter", # Needs proper mapping
                "sub_id": str(data["id"]),
                "status": attrs["status"],
                "variant": str(attrs["variant_id"]),
                "renews_at": attrs["renews_at"],
                "customer_id": str(attrs["customer_id"])
            }
        )
        await db.commit()
    
    elif event_name in ["subscription_updated", "subscription_resumed"]:
        await db.execute(
            text("""
                UPDATE user_subscriptions SET
                    subscription_status = :status,
                    current_period_end = :renews_at,
                    updated_at = NOW()
                WHERE user_id = :user_id
            """),
            {
                "user_id": user_id,
                "status": attrs["status"],
                "renews_at": attrs["renews_at"]
            }
        )
        await db.commit()
    
    elif event_name in ["subscription_cancelled", "subscription_expired"]:
        await db.execute(
            text("""
                UPDATE user_subscriptions SET
                    subscription_status = :status,
                    updated_at = NOW()
                WHERE user_id = :user_id
            """),
            {
                "user_id": user_id,
                "status": "cancelled" if event_name == "subscription_cancelled" else "expired"
            }
        )
        await db.commit()
    
    return {"status": "processed", "event": event_name}