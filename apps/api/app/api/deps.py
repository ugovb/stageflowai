from typing import Generator, Optional
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from pydantic import ValidationError
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.config import get_settings
from app.core.database import get_db
# We assume User model is available. 
# If not, we might need to look at app/models/user.py or define a minimal one if it was just SQLModel before.
# I will check app/models/user.py content in a moment, but assuming it exists.

settings = get_settings()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

async def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(get_db)
) -> "User":
    """
    Validate token and return current user.
    Supports both Supabase JWT (Cloud) and Local JWT (Local).
    Async version.
    """
    try:
        # 1. Decode Token
        # In cloud mode, Supabase tokens might need specific verification keys
        # For now, we rely on the JWT_SECRET from env which should match Supabase JWT secret in cloud
        payload = jwt.decode(
            token,
            settings.jwt_secret,  # Utilise SUPABASE_JWT_SECRET
            algorithms=[settings.jwt_algorithm],
            audience="authenticated"  # Important pour Supabase
        )
        user_id = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=403, detail="Could not validate credentials")
            
    except (JWTError, ValidationError):
        raise HTTPException(status_code=403, detail="Could not validate credentials")
    
    # 2. Fetch User from DB (Async)
    # Import User inside function to avoid potential circular imports if User model imports deps
    # Assuming app.models.user exists. If not, I'll need to create/fix it.
    try:
        from app.models.user import User
    except ImportError:
        # Fallback if model doesn't exist yet, but it should from previous context
        raise HTTPException(status_code=500, detail="User model not found")

    # Use sqlalchemy select
    # Verify if User.id is a string or UUID. In SQLModel/SQLAlchemy, it usually matches.
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return user