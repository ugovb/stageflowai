# Story 2.1: Design "Phase" Data Model

**Epic:** [Epic 2: The Socratic Engine](../epics/epic-2-socratic-engine.md)
**Priority:** High
**Status:** Ready for Review

## Description
Implement the core data structures that will track the user's progress through the Hero's Journey and store their chat history.

## Dev Agent Record
- **Agent Model Used:** Gemini 2.0 Flash
- **Debug Log References:**
  - Created `apps/api/app/models/journey.py` for `JourneyState` and `ChatMessage`.
  - Created `apps/api/app/models/skill.py` for `Skill`.
  - Updated `apps/api/app/models/__init__.py` to export new models.
  - Generated and applied Alembic migration `c3e5cacb41d0`.
  - Created TypeScript interfaces in `packages/types/src/journey.ts` and `packages/types/src/skill.ts`.
  - Added `@stageflow/types` to `apps/web/package.json`.
- **Completion Notes:**
  - Database schema is updated and verified.
  - Shared types are available for frontend and backend (via manual sync for now).
- **File List:**
  - `apps/api/app/models/journey.py`
  - `apps/api/app/models/skill.py`
  - `apps/api/app/models/__init__.py`
  - `apps/api/alembic/versions/c3e5cacb41d0_add_journey_and_skill_models.py`
  - `packages/types/src/journey.ts`
  - `packages/types/src/skill.ts`
  - `packages/types/src/index.ts`
  - `apps/web/package.json`

## Acceptance Criteria
- [x] `JourneyState` model/table created:
    - `user_id` (FK)
    - `current_phase` (Int)
    - `is_locked` (Bool)
- [x] `ChatMessage` model/table created:
    - `session_id` / `user_id`
    - `role` (user/assistant)
    - `content` (Text)
    - `phase_context` (Int)
- [x] `Skill` model/table created:
    - `name`, `category`, `evidence` (JSONB)
- [x] Database migration applied.

## Technical Notes
- Pydantic models in backend should align with the DB schema.