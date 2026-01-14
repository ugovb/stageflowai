from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.api.deps import get_current_user
from app.models.user import User
from app.models.quota import UserQuotaStatus, QuotaCheckResult
from app.services.quota_manager import QuotaManager

router = APIRouter(prefix="/api/quota", tags=["Quota"])


@router.get("/status", response_model=UserQuotaStatus)
async def get_quota_status(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get current user's quota status."""
    manager = QuotaManager(db)
    return await manager.get_full_status(current_user.id)


@router.get("/check/{action}", response_model=QuotaCheckResult)
async def check_action_quota(
    action: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Check if user can perform a specific action."""
    valid_actions = ["cover_letter", "email", "cv_export", "search", "save_company"]
    
    if action not in valid_actions:
        raise HTTPException(400, f"Invalid action. Must be one of: {valid_actions}")
    
    manager = QuotaManager(db)
    return await manager.check_quota(current_user.id, action)


@router.get("/plans")
async def get_available_plans(db: AsyncSession = Depends(get_db)):
    """Get all available plans for pricing page."""
    from sqlalchemy import text
    result = await db.execute(
        text("SELECT * FROM quota_plans WHERE is_active = TRUE ORDER BY sort_order")
    )
    plans = result.fetchall()
    return [dict(row._mapping) for row in plans]
