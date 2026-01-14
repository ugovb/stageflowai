# Story 1.3: Implement User Registration & Login (JWT)

**Epic:** [Epic 1: Foundation & Core Infrastructure](../epics/epic-1-foundation.md)
**Priority:** High
**Status:** Ready for Review

## Description
Implement the authentication flow. Users need to sign up and log in to save their progress. We will use Supabase Auth for the backend logic but implement the UI/UX in our app.

## Dev Agent Record
- **Agent Model Used:** Gemini 2.0 Flash
- **Debug Log References:**
  - Verified existing Supabase utils in `apps/web/src/utils/supabase`.
  - Implemented `apps/web/src/app/auth/callback/route.ts` for PKCE flow.
  - Created `apps/web/src/lib/api-client.ts` for API requests with Auth header.
  - Updated `apps/web/src/app/login/actions.ts` to redirect to `/dashboard`.
  - Fixed type errors and imports in `apps/web/src/utils/supabase/server.ts` and `apps/web/src/lib/api-client.ts`.
  - Verified build and lint.
- **Completion Notes:**
  - Auth flow structure is complete.
  - Requires valid Supabase credentials in `.env.local` to function fully.
  - Login/Signup redirects to `/dashboard`.
- **File List:**
  - `apps/web/src/app/auth/callback/route.ts`
  - `apps/web/src/lib/api-client.ts`
  - `apps/web/src/app/login/actions.ts`
  - `apps/web/src/app/dashboard/page.tsx`
  - `apps/web/src/utils/supabase/server.ts`
  - `apps/web/src/utils/supabase/middleware.ts`
  - `apps/web/src/components/ui/dropdown-menu.tsx`

## Acceptance Criteria
- [x] Sign Up page created (Email/Password).
- [x] Login page created.
- [x] Successful login redirects to Dashboard.
- [x] Frontend stores the Session/JWT secure cookie or local storage (via Supabase SDK).
- [x] Axios/Fetch interceptor adds the Authorization header to outgoing API requests.
- [x] Backend middleware verifies the JWT token on protected routes (return 401 if invalid).

## Technical Notes
- Use `@supabase/ssr` package for Next.js App Router compatibility.