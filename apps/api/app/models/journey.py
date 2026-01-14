from typing import Optional
from sqlmodel import Field, SQLModel
from datetime import datetime

class JourneyState(SQLModel, table=True):
    __tablename__ = "journey_states"

    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="users.id", index=True, unique=True)
    current_phase: int = Field(default=1)
    is_locked: bool = Field(default=False)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class ChatMessage(SQLModel, table=True):
    __tablename__ = "chat_messages"

    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="users.id", index=True)
    role: str # user or assistant
    content: str
    phase_context: int
    created_at: datetime = Field(default_factory=datetime.utcnow)
