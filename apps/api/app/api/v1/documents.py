from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import FileResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select
from typing import List

from app.core.security import get_current_user
from app.core.db import get_session
from app.models.user import User
from app.models.skill import Skill
from app.services.pdf_service import generate_cv_pdf

router = APIRouter()

@router.get("/cv", response_class=FileResponse)
async def get_cv_pdf(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_session)
):
    """
    Generate and download the user's CV as PDF.
    """
    # Get user details (refresh from DB to be sure)
    statement = select(User).where(User.id == current_user.id)
    result = await db.execute(statement)
    user = result.scalar_one()
    
    # Get skills
    statement = select(Skill).where(Skill.user_id == current_user.id)
    result = await db.execute(statement)
    skills = result.scalars().all()
    
    # Generate PDF
    try:
        file_path = generate_cv_pdf(user, skills)
        return FileResponse(
            path=file_path, 
            filename=f"CV_{user.email.split('@')[0]}.pdf", 
            media_type='application/pdf'
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate PDF: {str(e)}")
