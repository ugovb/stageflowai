from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from sqlalchemy import text
from datetime import datetime, timedelta
import json

from app.core.database import get_db
from app.api.deps import get_current_user

router = APIRouter(prefix="/api/user", tags=["RGPD"])

@router.get("/data-export")
async def request_data_export(
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """Request export of all user data (RGPD Article 20)."""
    
    # Check if recent request exists
    existing = db.execute(
        text("""
            SELECT id, status FROM data_export_requests 
            WHERE user_id = :user_id 
            AND requested_at > NOW() - INTERVAL '24 hours'
        """),
        {"user_id": str(current_user.id)}
    ).fetchone()
    
    if existing:
        return {
            "status": existing[0], # Corrected index
            "message": "Une demande est déjà en cours. Vous recevrez un email."
        }
    
    # Create request
    db.execute(
        text("""
            INSERT INTO data_export_requests (user_id, status)
            VALUES (:user_id, 'processing')
        """),
        {"user_id": str(current_user.id)}
    )
    db.commit()
    
    # Process in background
    background_tasks.add_task(
        generate_user_data_export,
        str(current_user.id),
        current_user.email
    )
    
    return {
        "status": "processing",
        "message": "Votre export sera prêt dans quelques minutes. Vous recevrez un email."
    }

@router.delete("/account")
async def request_account_deletion(
    reason: str = None,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """Request account deletion (RGPD Article 17 - Right to be forgotten)."""
    
    # Log the request (we keep this for legal reasons)
    db.execute(
        text("""
            INSERT INTO deletion_requests (user_id, user_email, reason)
            VALUES (:user_id, :email, :reason)
        """),
        {
            "user_id": str(current_user.id),
            "email": current_user.email,
            "reason": reason
        }
    )
    
    # Delete user data (cascades to related tables)
    db.execute(
        text("DELETE FROM users WHERE id = :user_id"),
        {"user_id": str(current_user.id)}
    )
    db.commit()
    
    return {
        "status": "deleted",
        "message": "Votre compte et toutes vos données ont été supprimés."
    }

@router.get("/consents")
async def get_consents(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """Get user's current consent status."""
    results = db.execute(
        text("""
            SELECT consent_type, consented, consented_at, withdrawn_at
            FROM user_consents WHERE user_id = :user_id
        """),
        {"user_id": str(current_user.id)}
    ).fetchall()
    
    consents = {
        "terms": False,
        "privacy": False,
        "analytics": False,
        "marketing": False
    }
    
    for row in results:
        consents[row[0]] = {
            "consented": row[1],
            "date": row[2].isoformat() if row[2] else None
        }
    
    return consents

@router.post("/consents")
async def update_consent(
    consent_type: str,
    consented: bool,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """Update a specific consent."""
    if consent_type not in ["terms", "privacy", "analytics", "marketing"]:
        raise HTTPException(400, "Invalid consent type")
    
    db.execute(
        text("""
            INSERT INTO user_consents (user_id, consent_type, consented, consented_at)
            VALUES (:user_id, :type, :consented, NOW())
            ON CONFLICT (user_id, consent_type) DO UPDATE SET
                consented = :consented,
                consented_at = CASE WHEN :consented THEN NOW() ELSE user_consents.consented_at END,
                withdrawn_at = CASE WHEN NOT :consented THEN NOW() ELSE NULL END
        """),
        {
            "user_id": str(current_user.id),
            "type": consent_type,
            "consented": consented
        }
    )
    db.commit()
    
    return {"status": "updated", "consent_type": consent_type, "consented": consented}

async def generate_user_data_export(user_id: str, user_email: str):
    """Background task to generate data export."""
    # Implementation: Query all user tables, generate JSON, upload to storage
    # Then update data_export_requests with download URL
    pass
