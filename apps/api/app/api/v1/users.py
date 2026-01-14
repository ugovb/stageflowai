from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select
from pydantic import BaseModel
from typing import Optional

from app.core.security import get_current_user
from app.core.db import get_session
from app.models.user import User

router = APIRouter()

class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    school: Optional[str] = None

@router.patch("/me", response_model=User)
async def update_user_me(
    user_update: UserUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_session)
):
    """
    Update current user profile.
    """
    # Re-fetch user to be attached to session
    statement = select(User).where(User.id == current_user.id)
    result = await db.execute(statement)
    user = result.scalar_one_or_none()
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if user_update.full_name is not None:
        user.full_name = user_update.full_name
    if user_update.school is not None:
        user.school = user_update.school
        
    db.add(user)
    await db.commit()
    await db.refresh(user)
    return user
