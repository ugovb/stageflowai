from typing import Optional
from sqlmodel import Field, SQLModel
from datetime import datetime
from enum import Enum

class UserArchetype(str, Enum):
    STEM = "stem"
    HUMANITIES = "humanities"
    BUSINESS = "business"
    GENERAL = "general"

class User(SQLModel, table=True):
    __tablename__ = "users"

    id: Optional[int] = Field(default=None, primary_key=True)
    email: str = Field(unique=True, index=True)
    full_name: Optional[str] = Field(default=None)
    school: Optional[str] = Field(default=None)
    hashed_password: str
    is_active: bool = Field(default=True)
    is_superuser: bool = Field(default=False)
    archetype: UserArchetype = Field(default=UserArchetype.GENERAL)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)