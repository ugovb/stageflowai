# Epic 1: Foundation & Core Infrastructure

**Status:** Draft
**Priority:** High
**Parent:** [PRD](../prd.md)

## Goal
Establish a deployable "Hello World" app with secure user authentication, database connections, and a monorepo structure. This sets the technical foundation for the entire Stage Flow AI platform.

## Description
This epic focuses on setting up the initial technical environment. We are transitioning from an n8n prototype to a robust "Modular Monolith" using Next.js (Frontend) and FastAPI (Backend). By the end of this epic, we should have a working web application where a user can sign up, log in, and see a basic dashboard shell.

## Scope
- **Repo Setup:** Turborepo with `apps/web` and `apps/api`.
- **Database:** PostgreSQL with Supabase (or local Docker for dev) and Alembic for migrations.
- **Auth:** Supabase Auth integration for JWT handling.
- **UI Shell:** Basic navigation and layout using Shadcn/UI.

## Stories

### Story 1.1: Init Monorepo with Next.js and FastAPI
**Goal:** Create the git repository structure and ensure both frontend and backend "Hello World" endpoints work.
**Acceptance Criteria:**
- Turborepo initialized.
- `apps/web` running Next.js 14+ on localhost:3000.
- `apps/api` running FastAPI on localhost:8000.
- `packages/types` created for shared interfaces.

### Story 1.2: Configure PostgreSQL and Alembic migrations
**Goal:** Set up the database schema management.
**Acceptance Criteria:**
- PostgreSQL database running (Supabase or Docker).
- Alembic configured in `apps/api`.
- Initial migration created (Users table).
- DB connection successful from FastAPI.

### Story 1.3: Implement User Registration & Login (JWT)
**Goal:** Secure the application.
**Acceptance Criteria:**
- User can sign up via email/password.
- User can log in and receive a JWT.
- Frontend stores JWT (securely) and sends it with API requests.
- Protected API endpoint returns 401 for unauthenticated requests.

### Story 1.4: Set up Basic UI Shell
**Goal:** Create the visual container for the app.
**Acceptance Criteria:**
- Install Tailwind CSS and Shadcn/UI.
- Create a persistent Navbar (Logo, User Menu).
- Create an empty Dashboard page protected by an Auth Guard (redirects to login if not signed in).

## Risks
- **Deployment:** Complexity of deploying monorepo to separate hosts (Vercel vs Render).
- **Type Sharing:** Ensuring Pydantic models sync correctly with TypeScript interfaces.
