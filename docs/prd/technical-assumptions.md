# Technical Assumptions

## Stack Decisions
*   **Frontend:** React (Next.js) - for dynamic UI and "Map" visualizations.
*   **Backend:** Python (FastAPI) - robust, fast, and excellent ecosystem for AI/LangChain.
*   **Database:** PostgreSQL (User Data/State) + Vector DB (pgvector or Chroma) for RAG.
*   **AI orchestration:** LangChain or Vercel AI SDK.
*   **Deployment:** Dockerized containers (easily deployable to Vercel/Render/Railway).

## Architecture
*   **Repository:** Monorepo (Frontend + Backend in one repo for easier MVP management).
*   **Service Arch:** Modular Monolith. Keep it simple for MVP.
