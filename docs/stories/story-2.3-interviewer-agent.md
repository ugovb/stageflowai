# Story 2.3: Implement "Interviewer" Agent (LangChain)

**Epic:** [Epic 2: The Socratic Engine](../epics/epic-2-socratic-engine.md)
**Priority:** Critical
**Status:** Ready for Review

## Description
Implement the backend logic for the conversational agent using LangChain. This agent needs to load the correct "Persona" and questions based on the user's current phase.

## Dev Agent Record
- **Agent Model Used:** Gemini 2.0 Flash
- **Debug Log References:**
  - Added `langchain-openai` and `langchain-core` to `requirements.txt`.
  - Updated `security.py` to sync Supabase users with local DB.
  - Implemented `app/services/prompts.py` to manage phase-specific system prompts.
  - Implemented `app/services/chat_service.py` using LangChain `ChatOpenAI` with streaming support.
  - Implemented `POST /api/chat/message` for streaming SSE responses.
  - Implemented `GET /api/chat/state` to retrieve current journey phase and history.
  - Mounted chat router in `main.py`.
- **Completion Notes:**
  - Streaming works via SSE.
  - AI messages are persisted to the database after streaming completes.
  - History is passed to the LLM for context (limited to last 10 messages).
- **File List:**
  - `apps/api/requirements.txt`
  - `apps/api/app/core/config.py`
  - `apps/api/app/core/security.py`
  - `apps/api/app/services/prompts.py`
  - `apps/api/app/services/chat_service.py`
  - `apps/api/app/api/v1/chat.py`
  - `apps/api/app/main.py`

## Acceptance Criteria
- [x] API Endpoint `POST /api/chat` implemented (actually `/api/chat/message`).
- [x] LangChain `ConversationChain` (or similar) set up with memory.
- [x] System Prompt logic implemented:
    - Dynamically loads prompt based on `JourneyState.current_phase`.
- [x] Streaming Response: Endpoint returns `text/event-stream` (SSE).

## Technical Notes
- Ensure context window is managed (don't send infinite history).