from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
import httpx

from app.core.config import get_settings
from app.core.database import get_db

router = APIRouter(prefix="/api", tags=["Health"])
settings = get_settings()

@router.get("/health")
async def health_check(db: Session = Depends(get_db)):
    """Check all services status."""
    status = {
        "status": "healthy",
        "mode": settings.stageflow_mode,
        "services": {}
    }
    
    # Database check
    try:
        db.execute(text("SELECT 1"))
        status["services"]["database"] = "ok"
    except Exception as e:
        status["services"]["database"] = f"error: {str(e)}"
        status["status"] = "degraded"
    
    # OpenRouter check (simple ping)
    try:
        async with httpx.AsyncClient() as client:
            resp = await client.get(
                "https://openrouter.ai/api/v1/models",
                headers={"Authorization": f"Bearer {settings.openrouter_api_key}"},
                timeout=5.0
            )
            if resp.status_code == 200:
                status["services"]["openrouter"] = "ok"
            else:
                status["services"]["openrouter"] = f"error: {resp.status_code}"
    except Exception as e:
        status["services"]["openrouter"] = f"error: {str(e)}"
        status["status"] = "degraded"
    
    # Payment check (cloud only)
    if settings.is_payment_enabled:
        status["services"]["payment"] = "lemon_squeezy_enabled"
    
    return status
