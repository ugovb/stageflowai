import httpx
import hmac
import hashlib
from typing import Optional
from pydantic import BaseModel

from app.core.config import get_settings

settings = get_settings()

LEMON_API_BASE = "https://api.lemonsqueezy.com/v1"

class LemonSqueezyCustomer(BaseModel):
    id: str
    email: str
    name: Optional[str] = None

class LemonSqueezySubscription(BaseModel):
    id: str
    status: str  # "active", "cancelled", "expired", "past_due"
    variant_id: str
    current_period_end: str
    customer_id: str

class LemonSqueezyService:
    """Service for Lemon Squeezy API interactions."""
    
    def __init__(self):
        self.api_key = settings.lemonsqueezy_api_key
        self.store_id = settings.lemonsqueezy_store_id
        self.webhook_secret = settings.lemonsqueezy_webhook_secret
    
    def _headers(self) -> dict:
        return {
            "Authorization": f"Bearer {self.api_key}",
            "Accept": "application/vnd.api+json",
            "Content-Type": "application/vnd.api+json"
        }
    
    def verify_webhook_signature(self, payload: bytes, signature: str) -> bool:
        """Verify that webhook came from Lemon Squeezy."""
        if not self.webhook_secret:
            return False
        expected = hmac.new(
            self.webhook_secret.encode(),
            payload,
            hashlib.sha256
        ).hexdigest()
        return hmac.compare_digest(expected, signature)
    
    async def get_subscription(self, subscription_id: str) -> Optional[LemonSqueezySubscription]:
        """Fetch subscription details from Lemon Squeezy."""
        async with httpx.AsyncClient() as client:
            resp = await client.get(
                f"{LEMON_API_BASE}/subscriptions/{subscription_id}",
                headers=self._headers()
            )
            
            if resp.status_code != 200:
                return None
            
            data = resp.json()["data"]
            attrs = data["attributes"]
            
            return LemonSqueezySubscription(
                id=data["id"],
                status=attrs["status"],
                variant_id=str(attrs["variant_id"]),
                current_period_end=attrs["renews_at"],
                customer_id=str(attrs["customer_id"])
            )
    
    async def get_customer_portal_url(self, customer_id: str) -> Optional[str]:
        """Get URL for customer to manage their subscription."""
        async with httpx.AsyncClient() as client:
            resp = await client.get(
                f"{LEMON_API_BASE}/customers/{customer_id}",
                headers=self._headers()
            )
            
            if resp.status_code != 200:
                return None
            
            return resp.json()["data"]["attributes"]["urls"]["customer_portal"]
    
    def get_checkout_url(self, variant_id: str, user_email: str, user_id: str) -> str:
        """Generate checkout URL with prefilled data."""
        base = f"https://{settings.lemonsqueezy_store_id}.lemonsqueezy.com/checkout/buy/{variant_id}"
        params = f"?checkout[email]={user_email}&checkout[custom][user_id]={user_id}"
        return base + params

# Singleton
lemon_service = LemonSqueezyService() if settings.is_payment_enabled else None
