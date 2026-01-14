from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List
from enum import Enum


class PlanType(str, Enum):
    RECURRING = "recurring"
    ONE_TIME = "one_time"


class ProfileDepth(str, Enum):
    BASIC = "basic"
    DETAILED = "detailed"


class QuotaPlan(BaseModel):
    id: str
    display_name: str
    description: Optional[str]
    plan_type: PlanType
    profile_depth: ProfileDepth
    
    # Limits
    monthly_cover_letters: int
    monthly_emails: int
    monthly_cv_exports: int
    max_search_results: int
    max_saved_companies: int
    
    # Features
    can_export_pdf: bool
    has_dashboard: bool
    has_reminders: bool
    allowed_models: List[str]
    
    # Pricing
    price_cents: int
    price_yearly_cents: Optional[int]
    
    # Display
    sort_order: int
    is_highlighted: bool


class UserUsage(BaseModel):
    cover_letters_generated: int = 0
    emails_generated: int = 0
    cv_exports: int = 0
    companies_viewed: int = 0
    companies_saved: int = 0
    demo_letter_viewed: bool = False
    demo_email_viewed: bool = False
    period_start: datetime
    period_end: datetime


class QuotaCheckResult(BaseModel):
    allowed: bool
    reason: Optional[str] = None
    current_usage: int
    limit: int  # -1 means unlimited
    remaining: int  # -1 means unlimited


class UserQuotaStatus(BaseModel):
    plan: QuotaPlan
    usage: UserUsage
    is_lifetime: bool = False  # For one-time purchases
    
    # Computed limits status
    cover_letters: QuotaCheckResult
    emails: QuotaCheckResult
    cv_exports: QuotaCheckResult
    search_results: QuotaCheckResult
    saved_companies: QuotaCheckResult
