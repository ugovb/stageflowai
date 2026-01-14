# Story 3.5: User Profile Persistence

**Epic:** [Epic 3: Dashboard & Gamification](../epics/epic-3-dashboard-gamification.md)
**Priority:** High
**Status:** Ready for Dev

## Description
The dashboard "Edit Profile" modal is currently frontend-only. We need to persist user details (Name, School, etc.) to the database so they survive a page refresh.

## Tasks
- [ ] Add `full_name` and `school` columns to the `User` model in `apps/api/app/models/user.py`.
- [ ] Generate and run Alembic migration.
- [ ] Create API Endpoint `PATCH /api/users/me` to update these fields.
- [ ] Update Frontend `ProfileCard` to call this API on save.

## Acceptance Criteria
- [ ] User can edit their name and school in the dashboard modal.
- [ ] After refreshing the page, the new name and school are displayed.
- [ ] Database reflects the changes.
