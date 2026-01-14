from fastapi import APIRouter, Depends, HTTPException, Body, BackgroundTasks
from fastapi.responses import StreamingResponse
from app.core.security import get_current_user
from app.core.db import get_session
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select
from app.models.journey import JourneyState, ChatMessage
from app.models.skill import Skill
from app.models.user import User
from app.services.chat_service import chat_service
from app.services.analyst_service import analyst_service
from app.services.prompts import get_phase_config
import json
import asyncio

router = APIRouter()

async def run_analyst_background(user_id: int, phase_id: int):
    """
    Background task to analyze conversation, extract skills, and progress phase.
    """
    async for db in get_session():
        # 1. Get history
        statement = select(ChatMessage).where(ChatMessage.user_id == user_id).order_by(ChatMessage.created_at)
        result = await db.execute(statement)
        history = result.scalars().all()
        
        # 2. Run Analyst
        try:
            analysis = await analyst_service.analyze_conversation(phase_id, history)
            
            # 3. Handle skills
            for skill_data in analysis.extracted_skills:
                # Check if skill with same name already exists for this user in this evidence context?
                # For now, just add it.
                skill = Skill(
                    user_id=user_id,
                    name=skill_data.skill_name,
                    category=skill_data.category,
                    evidence={"text": skill_data.evidence}
                )
                db.add(skill)
            
            # 4. Handle phase completion
            if analysis.is_phase_complete:
                statement = select(JourneyState).where(JourneyState.user_id == user_id)
                result = await db.execute(statement)
                journey_state = result.scalar_one_or_none()
                
                # Only increment if we are still on the same phase
                if journey_state and journey_state.current_phase == phase_id:
                    journey_state.current_phase += 1
                    db.add(journey_state)
            
            await db.commit()
        except Exception as e:
            print(f"Error in analyst background task: {e}")
        break

@router.post("/message")
async def chat_message(
    background_tasks: BackgroundTasks,
    content: str = Body(..., embed=True),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_session)
):
    # 1. Get Journey State
    statement = select(JourneyState).where(JourneyState.user_id == current_user.id)
    result = await db.execute(statement)
    journey_state = result.scalar_one_or_none()

    if not journey_state:
        journey_state = JourneyState(user_id=current_user.id, current_phase=1)
        db.add(journey_state)
        await db.commit()
        await db.refresh(journey_state)

    current_phase = journey_state.current_phase

    # 2. Get history
    statement = select(ChatMessage).where(ChatMessage.user_id == current_user.id).order_by(ChatMessage.created_at)
    result = await db.execute(statement)
    history = result.scalars().all()

    # 3. Save User Message
    user_msg = ChatMessage(
        user_id=current_user.id,
        role="user",
        content=content,
        phase_context=current_phase
    )
    db.add(user_msg)
    await db.commit()

    async def generate():
        full_response = ""
        try:
            async for chunk in chat_service.get_response_stream(
                user_id=current_user.id,
                user_message=content,
                phase_id=current_phase,
                history=history,
                archetype=current_user.archetype
            ):
                full_response += chunk
                yield f"data: {json.dumps({'chunk': chunk})}\n\n"
            
            # 4. Save AI Message
            async for session in get_session():
                ai_msg = ChatMessage(
                    user_id=current_user.id,
                    role="assistant",
                    content=full_response,
                    phase_context=current_phase
                )
                session.add(ai_msg)
                await session.commit()
                break
            
            # 5. Trigger Analyst in background
            background_tasks.add_task(run_analyst_background, current_user.id, current_phase)
                
            yield "data: [DONE]\n\n"
        except Exception as e:
            yield f"data: {json.dumps({'error': str(e)})}\n\n"

    return StreamingResponse(generate(), media_type="text/event-stream")

@router.get("/state")
async def get_chat_state(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_session)
):
    # 1. Get Journey State
    statement = select(JourneyState).where(JourneyState.user_id == current_user.id)
    result = await db.execute(statement)
    journey_state = result.scalar_one_or_none()

    if not journey_state:
        journey_state = JourneyState(user_id=current_user.id, current_phase=1)
        db.add(journey_state)
        await db.commit()
        await db.refresh(journey_state)

    # 2. Get history
    statement = select(ChatMessage).where(ChatMessage.user_id == current_user.id).order_by(ChatMessage.created_at)
    result = await db.execute(statement)
    history = result.scalars().all()

    phase_config = get_phase_config(journey_state.current_phase, current_user.archetype)

    return {
        "phase": journey_state.current_phase,
        "phase_name": phase_config.get("name", "Unknown"),
        "history": history,
        "initial_message": phase_config.get("initial_message") if not history else None
    }