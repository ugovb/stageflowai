# Story 3.2: Connect Map to Backend User State

**Epic:** [Epic 3: Dashboard & Gamification](../epics/epic-3-dashboard-gamification.md)
**Priority:** High
**Status:** Open

## Description
Wire up the Metro Map to the actual data.

## Acceptance Criteria
- [ ] Dashboard page fetches `GET /api/journey` on load.
- [ ] Map renders correctly based on the returned `current_phase`.
- [ ] Clicking a node navigates to `/chat?phase=N`.
- [ ] Preventing navigation to locked nodes (frontend check + backend guard).

## Technical Notes
- Use React Query or SWR for state fetching and caching.
