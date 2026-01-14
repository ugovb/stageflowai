import json
import traceback
from typing import AsyncGenerator, List
from langchain_openai import ChatOpenAI
from langchain.schema import SystemMessage, HumanMessage, AIMessage
from app.core.config import settings
from app.services.prompts import get_phase_config
from app.models.journey import ChatMessage as DBChatMessage
from app.models.user import UserArchetype

class ChatService:
    def __init__(self, api_key: str = settings.OPENAI_API_KEY):
        print(f"Initializing ChatService with Base URL: {settings.OPENAI_API_BASE}")
        try:
            self.llm = ChatOpenAI(
                openai_api_key=api_key,
                openai_api_base=settings.OPENAI_API_BASE,
                model="openai/gpt-3.5-turbo", # Fallback safe model
                streaming=True,
                temperature=0.7,
                default_headers={
                    "HTTP-Referer": "http://localhost:3000",
                    "X-Title": "StageFlow AI",
                }
            )
        except Exception as e:
            print(f"Error initializing LLM: {e}")

    async def get_response_stream(
        self, 
        user_id: int, 
        user_message: str, 
        phase_id: int,
        history: List[DBChatMessage],
        archetype: UserArchetype = UserArchetype.GENERAL
    ) -> AsyncGenerator[str, None]:
        try:
            # Fetch prompt based on phase AND archetype
            phase_config = get_phase_config(phase_id, archetype)
            
            messages = [
                SystemMessage(content=phase_config["system_prompt"])
            ]
            
            # Add history
            for msg in history[-10:]:
                if msg.role == "user":
                    messages.append(HumanMessage(content=msg.content))
                else:
                    messages.append(AIMessage(content=msg.content))
                    
            # Add current message
            messages.append(HumanMessage(content=user_message))
            
            print(f"Sending request to LLM... Message count: {len(messages)}")
            
            async for chunk in self.llm.astream(messages):
                if chunk.content:
                    yield chunk.content
                    
        except Exception as e:
            print(f"Error in get_response_stream: {e}")
            traceback.print_exc()
            yield f"Error: {str(e)}"

chat_service = ChatService()