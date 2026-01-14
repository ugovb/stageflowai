# Story 2.5: Connect "Hidden Menus" (Domain Specific Prompts)

**Epic:** [Epic 2: The Socratic Engine](../epics/epic-2-socratic-engine.md)
**Priority:** Medium
**Status:** In Progress

## Description
Enhance the Interviewer agent to adapt its questions based on the user's background (Humanities vs STEM vs Business).

## Dev Agent Record
- **Agent Model Used:** Gemini 2.0 Flash
- **Debug Log References:**
- **Completion Notes:**
- **File List:**
- **Change Log:**

## Tasks
- [ ] Add `archetype` field to `User` model in `apps/api/app/models/user.py`.
- [ ] Generate and apply Alembic migration.
- [ ] Create structured prompt templates (e.g., in `apps/api/app/prompts/archetypes.yaml` or similar).
- [ ] Update `apps/api/app/services/prompts.py` to load specific archetype prompts.
- [ ] Update `apps/api/app/api/v1/auth.py` or similar to allow setting archetype (or default it).
- [ ] Verify Interviewer picks up the correct prompt.

## Acceptance Criteria
- [ ] `User` model updated with `archetype` field.
- [ ] Prompt templates created for at least 3 archetypes for Phase 1.
- [ ] Interviewer Agent selects the correct template variation based on user profile.
- [ ] User onboarding flow (or defaults) sets the `archetype`.

## Technical Notes
- Store prompts in a structured way (YAML/JSON files or DB) to avoid hardcoding strings in Python.
