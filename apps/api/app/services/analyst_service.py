from typing import List, Optional
from pydantic import BaseModel, Field
from langchain_openai import ChatOpenAI
from langchain.output_parsers import PydanticOutputParser
from langchain.prompts import ChatPromptTemplate
from app.core.config import settings
from app.models.journey import ChatMessage
from app.services.prompts import get_phase_config

class ExtractedSkill(BaseModel):
    skill_name: str = Field(description="The name of the skill identified")
    category: str = Field(description="Category (Hard Skill, Soft Skill, Tool)")
    evidence: str = Field(description="The short excerpt from conversation proving this skill")

class AnalysisResult(BaseModel):
    is_phase_complete: bool = Field(description="True if user has provided enough evidence to pass the current phase")
    extracted_skills: List[ExtractedSkill] = Field(default_factory=list, description="List of skills extracted from this interaction")
    feedback_for_interviewer: Optional[str] = Field(None, description="Internal hint for the next AI question to guide the user")

class AnalystService:
    def __init__(self, api_key: str = settings.OPENAI_API_KEY):
        self.llm = ChatOpenAI(
            openai_api_key=api_key,
            openai_api_base=settings.OPENAI_API_BASE,
            model="openai/gpt-3.5-turbo", # Safe Model
            temperature=0,
            default_headers={
                "HTTP-Referer": "http://localhost:3000",
                "X-Title": "StageFlow AI (Analyst)",
            }
        )
        self.parser = PydanticOutputParser(pydantic_object=AnalysisResult)

    async def analyze_conversation(self, phase_id: int, history: List[ChatMessage]) -> AnalysisResult:
        try:
            phase_config = get_phase_config(phase_id)
            
            prompt = ChatPromptTemplate.from_template(
                """You are a Career Analyst for StageFlow AI.
                Your task is to review the conversation and determine if the user has met the requirements for the current phase.
                
                Current Phase: {phase_name}
                Criteria for success: {criteria}
                
                History:
                {history}
                
                {format_instructions}
                """
            )
            
            formatted_history = "\n".join([f"{m.role}: {m.content}" for m in history[-10:]])
            
            _input = prompt.format_prompt(
                phase_name=phase_config.get("name", "Unknown"),
                criteria=phase_config.get("analyst_criteria", ""),
                history=formatted_history,
                format_instructions=self.parser.get_format_instructions()
            )
            
            response = await self.llm.ainvoke(_input.to_messages())
            return self.parser.parse(response.content)
        except Exception as e:
            print(f"Error in analyst service: {e}")
            return AnalysisResult(is_phase_complete=False, extracted_skills=[])

analyst_service = AnalystService()
