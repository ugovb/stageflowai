# Story 1.2: Configure PostgreSQL and Alembic Migrations

**Epic:** [Epic 1: Foundation & Core Infrastructure](../epics/epic-1-foundation.md)
**Priority:** Critical
**Status:** Ready for Review

## Description
Set up the PostgreSQL database connection and migration system. This is required for user management and storing the journey state.

## Dev Agent Record
- **Agent Model Used:** Gemini 2.0 Flash
- **Debug Log References:**
  - Added `asyncpg`, `alembic`, `greenlet` to `requirements.txt`.
  - Created `docker-compose.yml` for PostgreSQL with pgvector.
  - Configured `apps/api/.env`, `apps/api/app/core/config.py`, and `apps/api/app/core/db.py`.
  - Defined `User` model in `apps/api/app/models/user.py`.
  - Initialized Alembic (async) and configured `env.py` and `script.py.mako` to work with SQLModel.
  - Successfully ran initial migration creating the `users` table.
  - Verified DB connection.
- **Completion Notes:**
  - Database is running via Docker on port 5432.
  - API can connect to the database using `asyncpg`.
  - Alembic migrations are set up and the first migration is applied.
  - `greenlet` was added as a dependency to support SQLAlchemy async operations.
- **File List:**
  - `apps/api/requirements.txt`
  - `docker-compose.yml`
  - `apps/api/.env`
  - `apps/api/app/core/config.py`
  - `apps/api/app/core/db.py`
  - `apps/api/app/models/user.py`
  - `apps/api/app/models/__init__.py`
  - `apps/api/alembic/env.py`
  - `apps/api/alembic/script.py.mako`
  - `apps/api/alembic/versions/*`

## Acceptance Criteria
- [x] PostgreSQL database is running (Docker container or Supabase connection).
- [x] Alembic is initialized in `apps/api`.
- [x] First migration script created (creating a basic `users` table).
- [x] FastAPI can connect to the database.
- [x] Environment variables for DB connection are configured in `.env`.

## Technical Notes
- Use `SQLModel` or `SQLAlchemy` for ORM.
- Ensure `asyncpg` driver is used for FastAPI async support.
