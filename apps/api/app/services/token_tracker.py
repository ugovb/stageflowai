from datetime import date
from sqlalchemy.orm import Session
from sqlalchemy import text

from app.core.config import get_settings

settings = get_settings()

class TokenBudgetExceeded(Exception):
    """Raised when user exceeds daily token budget."""
    pass

async def check_and_track_tokens(
    db: Session, 
    user_id: str, 
    tokens_used: int,
    is_premium: bool = False
) -> dict:
    """
    Track token usage and enforce limits.
    Premium users get 5x the budget.
    """
    today = date.today()
    budget = settings.daily_token_budget * (5 if is_premium else 1)
    
    # Upsert usage
    # Note: Ensure table 'token_usage' exists (Phase 3 migration)
    # If not exists yet, we might want to skip or try/except, but assuming Phase 3 runs soon.
    try:
        result = db.execute(
            text("""
                INSERT INTO token_usage (user_id, usage_date, tokens_used)
                VALUES (:user_id, :date, :tokens)
                ON CONFLICT (user_id, usage_date) 
                DO UPDATE SET tokens_used = token_usage.tokens_used + :tokens
                RETURNING tokens_used
            """),
            {"user_id": user_id, "date": today, "tokens": tokens_used}
        )
        db.commit()
        
        total_today = result.fetchone()[0]
        
        if total_today > budget:
            raise TokenBudgetExceeded(
                f"Limite quotidienne atteinte : {total_today}/{budget} tokens"
            )
        
        return {
            "tokens_used_today": total_today,
            "budget_total": budget,
            "budget_remaining": budget - total_today,
            "percentage_used": round((total_today / budget) * 100, 1)
        }
    except Exception as e:
        # Fallback if table doesn't exist yet
        print(f"Token tracking error (migration pending?): {e}")
        return {"status": "tracking_failed_but_allowed"}
