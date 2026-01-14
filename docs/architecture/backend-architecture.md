# Backend Architecture

## Project Structure (Detailed)

```text
apps/api/
├── app/
│   ├── api/                 # API Routes (FastAPI APIRouter)
│   │   ├── v1/
│   │   │   ├── chat.py      # Chat & SSE endpoints
│   │   │   ├── journey.py   # State & Gating endpoints
│   │   │   └── skills.py    # Inventory endpoints
│   │   └── deps.py          # Fastapi Dependencies (Auth, DB)
│   ├── core/                # Core config & Singletons
│   │   ├── config.py        # Settings (Pydantic)
│   │   ├── security.py      # Supabase/JWT logic
│   │   └── database.py      # Session management
│   ├── models/              # Pydantic & DB Schemas
│   │   ├── domain/          # Shared domain models
│   │   └── schemas/         # Request/Response schemas
│   ├── services/            # Business Logic
│   │   ├── socratic/        # Socratic engine logic
│   │   ├── analyst/         # Gating & Extraction logic
│   │   └── document/        # PDF/Markdown generation
│   └── main.py              # Application entry point
├── tests/                   # Pytest suite
├── alembic/                 # DB Migrations
└── Dockerfile
```

## Service Organization (FastAPI)
`apps/api/app`
- `/api`: Routes/Controllers (`/v1/chat`, `/v1/journey`)
- `/core`: Config, Security, Database connection
- `/services`:
  - `llm_service.py`: LangChain logic
  - `gatekeeper_service.py`: Logic for checking phase completion
  - `pdf_service.py`: Generation logic
- `/models`: Pydantic models (DTOs) and SQLModel/SQLAlchemy schemas

## Authentication
Implemented via **Supabase Auth**.
1. Frontend authenticates with Supabase, gets JWT.
2. Frontend sends JWT in `Authorization: Bearer` header to FastAPI.
3. FastAPI validates JWT using Supabase secret key.
4. User identity extracted and injected into request context.

## LLM Resilience & Reliability

Given the critical dependency on external LLM providers, the following strategies must be implemented in `llm_service.py`:

### 1. Retry Policies (Transient Failures)
*   **Mechanism:** Exponential Backoff with Jitter.
*   **Config:**
    *   `retries`: 3 attempts.
    *   `min_wait`: 1 second.
    *   `max_wait`: 10 seconds.
*   **Triggers:** HTTP 500/502/503/504, Rate Limit (429) (if within reasonable wait time), and Request Timeouts.

### 2. Timeouts
*   **Streaming Chat:** 5 seconds connect timeout, 15 seconds read timeout (per chunk).
*   **Analyst/Background Tasks:** 30 seconds total execution timeout.
*   **Behavior:** On timeout, abort request and return a user-friendly "The Coach is thinking deeply, please try again" message, or trigger a fallback.

### 3. Model Fallback Strategy
To ensure availability during high traffic or provider outages:
1.  **Primary:** `gpt-4-turbo` (or equivalent high-IQ model) for complex Socratic logic.
2.  **Fallback:** `gpt-3.5-turbo` / `claude-instant` for faster, cheaper responses if Primary times out or errors.
*   **Implementation:** Use LangChain's `Fallbacks` feature to automatically switch models on failure.

### 4. Circuit Breakers
*   **Goal:** Prevent cascading failures and save costs during outages.
*   **Threshold:** Open circuit after 5 consecutive failures or 50% error rate in 1 minute.
*   **Recovery:** "Half-Open" state after 30 seconds to test provider health.
