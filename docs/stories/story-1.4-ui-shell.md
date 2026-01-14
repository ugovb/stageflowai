# Story 1.4: Set up Basic UI Shell

**Epic:** [Epic 1: Foundation & Core Infrastructure](../epics/epic-1-foundation.md)
**Priority:** Medium
**Status:** Ready for Review

## Description
Create the visual container for the application using our chosen UI library (Shadcn/UI). This includes the navigation bar and the main layout structure.

## Dev Agent Record
- **Agent Model Used:** Gemini 2.0 Flash
- **Debug Log References:**
  - Configured Tailwind CSS v4 with Shadcn/UI CSS variables in `globals.css`.
  - Manually implemented Shadcn/UI components: `Button`, `Avatar`, `DropdownMenu`.
  - Created `Navbar` component with responsive design and Supabase auth integration.
  - Implemented `Dashboard` page with protected access.
  - Set up `auth/signout` route handler.
  - Updated root `layout.tsx` to include `Navbar`.
- **Completion Notes:**
  - UI Shell is fully functional with authentication awareness.
  - Tailwind v4 `@theme` block used for theme variables.
  - Dark mode support initialized via CSS variables.
- **File List:**
  - `apps/web/src/app/globals.css`
  - `apps/web/src/lib/utils.ts`
  - `apps/web/src/components/ui/button.tsx`
  - `apps/web/src/components/ui/avatar.tsx`
  - `apps/web/src/components/ui/dropdown-menu.tsx`
  - `apps/web/src/components/Navbar.tsx`
  - `apps/web/src/app/layout.tsx`
  - `apps/web/src/app/dashboard/page.tsx`
  - `apps/web/src/app/auth/signout/route.ts`

## Acceptance Criteria
- [x] Tailwind CSS configured.
- [x] Shadcn/UI initialized.
- [x] Responsive Navigation Bar implemented:
    - Logo on left.
    - User Menu (Avatar + Logout) on right (visible only when logged in).
- [x] Layout component creates a consistent structure for all pages.
- [x] Empty "Dashboard" page created as the landing after login.

## Technical Notes
- Ensure Dark Mode support is planned for (even if not active yet).
