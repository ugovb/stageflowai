import os
import pytest
from unittest.mock import AsyncMock, MagicMock

# Set dummy key before importing service that initializes LLM
os.environ["OPENAI_API_KEY"] = "fake-key"
os.environ["DATABASE_URL"] = "postgresql+asyncpg://user:pass@localhost/db"
os.environ["SECRET_KEY"] = "secret"
os.environ["SUPABASE_URL"] = "https://example.supabase.co"
os.environ["SUPABASE_KEY"] = "fake-key"

from app.services.analyst_service import AnalystService, AnalystResult, SkillExtraction
from app.models.journey import ChatMessage

@pytest.mark.asyncio
async def test_analyze_conversation_complete():
    # Setup
    mock_llm = MagicMock()
    mock_structured_llm = AsyncMock()
    mock_llm.with_structured_output.return_value = mock_structured_llm
    
    # Mock result
    expected_result = AnalystResult(
        is_phase_complete=True,
        reasoning="User provided a detailed story about starting coding with a specific project.",
        extracted_skills=[
            SkillExtraction(skill_name="Python", category="Technical", evidence="I built a web scraper in Python")
        ]
    )
    mock_structured_llm.ainvoke.return_value = expected_result
    
    service = AnalystService(api_key="fake-key")
    service.llm = mock_llm
    service.structured_llm = mock_structured_llm
    
    # Execution
    history = [
        ChatMessage(user_id=1, role="user", content="I started coding because I wanted to automate my work. I built a web scraper in Python.", phase_context=1)
    ]
    result = await service.analyze_conversation(phase_id=1, history=history)
    
    # Assertion
    assert result.is_phase_complete is True
    assert len(result.extracted_skills) == 1
    assert result.extracted_skills[0].skill_name == "Python"

@pytest.mark.asyncio
async def test_analyze_conversation_incomplete():
    # Setup
    mock_llm = MagicMock()
    mock_structured_llm = AsyncMock()
    mock_llm.with_structured_output.return_value = mock_structured_llm
    
    # Mock result
    expected_result = AnalystResult(
        is_phase_complete=False,
        reasoning="User's answer is too brief.",
        extracted_skills=[],
        suggested_focus="Ask for a specific example of when they first used this skill."
    )
    mock_structured_llm.ainvoke.return_value = expected_result
    
    service = AnalystService(api_key="fake-key")
    service.llm = mock_llm
    service.structured_llm = mock_structured_llm
    
    # Execution
    history = [
        ChatMessage(user_id=1, role="user", content="I like computers.", phase_context=1)
    ]
    result = await service.analyze_conversation(phase_id=1, history=history)
    
    # Assertion
    assert result.is_phase_complete is False
    assert result.suggested_focus is not None
