# Story 2.4: Implement "Analyst" Agent (Gatekeeper)

**Epic:** [Epic 2: The Socratic Engine](../epics/epic-2-socratic-engine.md)
**Priority:** Critical
**Status:** Ready for Review

## Description
Implement the "Shadow" agent that analyzes user messages to check if they have met the phase requirements (e.g., provided a STAR story).

## Dev Agent Record
- **Agent Model Used:** Gemini 2.0 Flash
- **Debug Log References:**
  - Implemented `AnalystService` in `apps/api/app/services/analyst_service.py` using LangChain structured output.
  - Defined Phase 1 & 2 criteria in `apps/api/app/services/prompts.py`.
  - Integrated analyst background task in `apps/api/app/api/v1/chat.py`.
  - Added `Skill` model usage to extract and persist skills during analysis.
  - Implemented `JourneyState` phase progression logic based on analyst results.
  - Created unit tests in `apps/api/tests/test_analyst_service.py`.
  - Fixed `Optional` import in `apps/api/app/core/config.py`.
- **Completion Notes:**
  - Analyst runs asynchronously via FastAPI `BackgroundTasks`.
  - Skills are extracted and saved to the database.
  - Journey phase increments automatically when criteria are met.
- **File List:**
  - `apps/api/app/services/analyst_service.py`
  - `apps/api/app/services/prompts.py`
  - `apps/api/app/api/v1/chat.py`
  - `apps/api/app/core/config.py`
  - `apps/api/tests/test_analyst_service.py`
  - `apps/api/requirements.txt`
- **Change Log:**
  - Initialized story tasks.
  - Completed all implementation and testing.

## Tasks
- [x] Define Phase criteria and "Definition of Done".
- [x] Implement `AnalystService` with LangChain Structured Output.
- [x] Create unit tests for the Analyst logic.
- [x] Integrate `AnalystService` into the chat flow.
- [x] Implement skill extraction and `JourneyState` updates.
- [x] Verify complete flow and run all tests.

## Acceptance Criteria
- [x] Analyst runs asynchronously (after user message or in parallel).
- [x] "Definition of Done" criteria defined for Phase 1 & 2 (as test cases).
- [x] Extraction Logic:
    - If criteria met: Extract skill data -> Save to `Skill` table -> Update `JourneyState` (unlock if needed).
    - If NOT met: No DB change (optionally generate hidden hint for Interviewer).
- [x] Unit tests verify that valid STAR stories are correctly identified.

## Technical Notes
- Can be a separate LangChain call.
- Should use structured output (JSON mode) for reliable extraction.
