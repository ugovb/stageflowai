from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from datetime import datetime, date
from typing import Optional
from uuid import UUID

from app.models.quota import (
    QuotaPlan, UserUsage, QuotaCheckResult, 
    UserQuotaStatus, ProfileDepth
)


class QuotaManager:
    """Manages user quotas and usage tracking."""
    
    def __init__(self, db: AsyncSession):
        self.db = db
    
    async def get_user_plan(self, user_id: UUID) -> QuotaPlan:
        """Get user's current plan (defaults to 'free')."""
        query = text("""
            SELECT qp.* FROM quota_plans qp
            LEFT JOIN user_subscriptions us ON us.plan_id = qp.id
            WHERE us.user_id = :user_id 
              AND (us.subscription_status = 'active' OR us.is_lifetime = TRUE)
            ORDER BY qp.sort_order DESC
            LIMIT 1
        """)
        result = await self.db.execute(query, {"user_id": str(user_id)})
        row = result.fetchone()
        
        if not row:
            # Return free plan
            result = await self.db.execute(
                text("SELECT * FROM quota_plans WHERE id = 'free'")
            )
            row = result.fetchone()
        
        return QuotaPlan(**dict(row._mapping))
    
    async def get_or_create_usage(self, user_id: UUID) -> UserUsage:
        """Get current month's usage, create if not exists."""
        current_period = date.today().replace(day=1)
        
        query = text("""
            INSERT INTO user_usage (user_id, period_start)
            VALUES (:user_id, :period_start)
            ON CONFLICT (user_id, period_start) DO UPDATE
            SET updated_at = NOW()
            RETURNING *
        """)
        result = await self.db.execute(query, {
            "user_id": str(user_id),
            "period_start": current_period
        })
        await self.db.commit()
        row = result.fetchone()
        
        return UserUsage(**dict(row._mapping))
    
    async def check_quota(
        self, 
        user_id: UUID, 
        action: str  # 'cover_letter', 'email', 'cv_export', 'search', 'save_company'
    ) -> QuotaCheckResult:
        """Check if user can perform action."""
        plan = await self.get_user_plan(user_id)
        usage = await self.get_or_create_usage(user_id)
        
        limits_map = {
            "cover_letter": (plan.monthly_cover_letters, usage.cover_letters_generated),
            "email": (plan.monthly_emails, usage.emails_generated),
            "cv_export": (plan.monthly_cv_exports, usage.cv_exports),
            "search": (plan.max_search_results, usage.companies_viewed),
            "save_company": (plan.max_saved_companies, usage.companies_saved),
        }
        
        limit, current = limits_map.get(action, (0, 0))
        
        # -1 means unlimited
        if limit == -1:
            return QuotaCheckResult(
                allowed=True,
                current_usage=current,
                limit=-1,
                remaining=-1
            )
        
        # 0 means not included in plan
        if limit == 0:
            return QuotaCheckResult(
                allowed=False,
                reason=f"Cette fonctionnalité n'est pas incluse dans votre plan {plan.display_name}",
                current_usage=current,
                limit=0,
                remaining=0
            )
        
        remaining = limit - current
        allowed = remaining > 0
        
        return QuotaCheckResult(
            allowed=allowed,
            reason=None if allowed else f"Quota mensuel atteint ({current}/{limit})",
            current_usage=current,
            limit=limit,
            remaining=max(0, remaining)
        )
    
    async def increment_usage(self, user_id: UUID, action: str) -> None:
        """Increment usage counter after successful action."""
        column_map = {
            "cover_letter": "cover_letters_generated",
            "email": "emails_generated",
            "cv_export": "cv_exports",
            "search": "companies_viewed",
            "save_company": "companies_saved",
        }
        
        column = column_map.get(action)
        if not column:
            return
        
        current_period = date.today().replace(day=1)
        
        query = text(f"""
            UPDATE user_usage 
            SET {column} = {column} + 1, updated_at = NOW()
            WHERE user_id = :user_id AND period_start = :period_start
        """)
        await self.db.execute(query, {
            "user_id": str(user_id),
            "period_start": current_period
        })
        await self.db.commit()
    
    async def get_full_status(self, user_id: UUID) -> UserQuotaStatus:
        """Get complete quota status for dashboard."""
        plan = await self.get_user_plan(user_id)
        usage = await self.get_or_create_usage(user_id)
        
        # Check subscription type
        sub_query = text("""
            SELECT is_lifetime FROM user_subscriptions 
            WHERE user_id = :user_id AND subscription_status = 'active'
        """)
        result = await self.db.execute(sub_query, {"user_id": str(user_id)})
        row = result.fetchone()
        is_lifetime = row.is_lifetime if row else False
        
        return UserQuotaStatus(
            plan=plan,
            usage=usage,
            is_lifetime=is_lifetime,
            cover_letters=await self.check_quota(user_id, "cover_letter"),
            emails=await self.check_quota(user_id, "email"),
            cv_exports=await self.check_quota(user_id, "cv_export"),
            search_results=await self.check_quota(user_id, "search"),
            saved_companies=await self.check_quota(user_id, "save_company"),
        )
    
    async def can_access_detailed_profile(self, user_id: UUID) -> bool:
        """Check if user has access to detailed profile analysis."""
        plan = await self.get_user_plan(user_id)
        return plan.profile_depth == ProfileDepth.DETAILED
