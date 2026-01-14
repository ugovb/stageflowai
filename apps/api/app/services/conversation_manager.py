from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime
import httpx

from app.core.config import get_settings

settings = get_settings()

class Message(BaseModel):
    role: str
    content: str
    timestamp: Optional[datetime] = None

class ConversationManager:
    """
    Manages conversation history with:
    - Sliding window (keep last N messages)
    - Summarization of old messages
    - Token counting
    """
    
    MAX_RECENT_MESSAGES = 10
    SUMMARY_TRIGGER = 15
    
    def __init__(self, messages: List[Message], existing_summary: Optional[str] = None):
        self.messages = messages
        self.summary = existing_summary
        self._token_estimate = 0
    
    def get_context_for_llm(self, system_prompt: str) -> List[dict]:
        """Build optimized context for LLM call."""
        context = [{"role": "system", "content": system_prompt}]
        
        # Add summary if exists
        if self.summary:
            context.append({
                "role": "system",
                "content": f"[Résumé des échanges précédents]\n{self.summary}"
            })
        
        # Add recent messages
        recent = self.messages[-self.MAX_RECENT_MESSAGES:]
        for msg in recent:
            context.append({"role": msg.role, "content": msg.content})
        
        # Estimate tokens (rough: 1 token ≈ 4 chars)
        self._token_estimate = sum(len(m["content"]) // 4 for m in context)
        
        return context
    
    @property
    def estimated_tokens(self) -> int:
        return self._token_estimate
    
    def needs_summarization(self) -> bool:
        return len(self.messages) >= self.SUMMARY_TRIGGER and not self.summary
    
    async def generate_summary(self) -> str:
        """Generate summary of older messages."""
        if len(self.messages) <= self.MAX_RECENT_MESSAGES:
            return ""
        
        # Messages to summarize
        to_summarize = self.messages[:-self.MAX_RECENT_MESSAGES]
        
        formatted = "\n".join([
            f"{m.role.upper()}: {m.content[:200]}..." 
            for m in to_summarize
        ])
        
        prompt = f"""
Résume cette conversation en 5 points maximum, en français.
Garde uniquement les informations importantes sur l'utilisateur :
- Son parcours académique
- Ses expériences mentionnées
- Ses compétences identifiées
- Ses objectifs/préférences

Conversation :
{formatted}

Résumé concis :
"""
        
        # Call LLM for summary (use cheap model)
        async with httpx.AsyncClient() as client:
            resp = await client.post(
                "https://openrouter.ai/api/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {settings.openrouter_api_key}",
                    "Content-Type": "application/json"
                },
                json={
                    "model": "openai/gpt-4o-mini",  # Cheap for summaries
                    "messages": [{"role": "user", "content": prompt}],
                    "max_tokens": 300
                }
            )
            
            if resp.status_code == 200:
                self.summary = resp.json()["choices"][0]["message"]["content"]
                return self.summary
        
        return ""
