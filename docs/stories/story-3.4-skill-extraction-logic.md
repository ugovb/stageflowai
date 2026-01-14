# Story 3.4: Implement "Skill Extraction" Logic (Real-time)

**Epic:** [Epic 3: Dashboard & Gamification](../epics/epic-3-dashboard-gamification.md)
**Priority:** Medium
**Status:** Open

## Description
Implement the mechanism to update the UI immediately when the "Analyst" backend extracts a skill.

## Acceptance Criteria
- [ ] Backend emits an event (via SSE or separate pollable status) when a Skill is created.
- [ ] Frontend triggers an animation (e.g., item flying into the bag/sidebar).
- [ ] Toast notification appears.
- [ ] Inventory list updates without page refresh.

## Technical Notes
- If SSE is used for chat, can wemultiplex events? Or just trigger a re-fetch of skills after every AI response turn. Re-fetch is safer for MVP.
