from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select
from typing import List

from app.core.security import get_current_user
from app.core.db import get_session
from app.models.skill import Skill
from app.models.user import User

router = APIRouter()

@router.get("/", response_model=List[Skill])
async def get_my_skills(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_session)
):
    """
    Retrieve all validated skills for the current user.
    """
    statement = select(Skill).where(Skill.user_id == current_user.id).order_by(Skill.created_at.desc())
    result = await db.execute(statement)
    return result.scalars().all()
