# Story 1.1: Init Monorepo with Next.js and FastAPI

**Epic:** [Epic 1: Foundation & Core Infrastructure](../epics/epic-1-foundation.md)
**Priority:** Critical
**Status:** Ready for Review

## Description
Initialize the git repository using a Turborepo structure to manage both the Next.js frontend and FastAPI backend. This sets up the development environment for the entire team.

## Dev Agent Record
- **Agent Model Used:** Gemini 2.0 Flash
- **Debug Log References:**
  - Initialized Turborepo with `pnpm`.
  - Configured `turbo.json` for tasks (dev, build, lint).
  - Scaffolded Next.js 14+ in `apps/web`.
  - Scaffolded FastAPI in `apps/api` with Python venv.
  - Created root `.gitignore`.
- **Completion Notes:**
  - `pnpm run dev` successfully starts both services.
  - Ports: 3000 (web), 8000 (api).
- **File List:**
  - `package.json`
  - `pnpm-workspace.yaml`
  - `turbo.json`
  - `.gitignore`
  - `apps/web/*`
  - `apps/api/*`
  - `packages/types/package.json`

## Acceptance Criteria
- [x] Turborepo is initialized at the root.
- [x] `apps/web` contains a running Next.js 14+ application (App Router).
- [x] `apps/api` contains a running FastAPI application.
- [x] `packages/types` directory exists for shared TypeScript interfaces.
- [x] Running `npm run dev` (or equivalent turbo command) starts both services.
- [x] Frontend is accessible at `http://localhost:3000`.
- [x] Backend is accessible at `http://localhost:8000`.
- [x] `.gitignore` is properly configured for Python and Node.

## Technical Notes
- Use `pnpm` as the package manager.
- Ensure Python venv is handled correctly in the backend build process.
