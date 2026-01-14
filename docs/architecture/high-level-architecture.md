# High Level Architecture

## Technical Summary
Stage Flow AI adopts a modern **Headless Architecture**. The frontend is a **Next.js** application deployed on the Edge, focusing on a rich, interactive "Gamified" user experience. The backend is a robust **FastAPI** service that encapsulates the "Socratic Engine," managing stateful AI conversations and structured data extraction. Data persistence is handled by **PostgreSQL** (enhanced with **pgvector** for RAG), and Authentication is managed via **Supabase**. The system prioritizes low-latency chat interactions via Server-Sent Events (SSE) and strict separation of concerns between presentation (Next.js) and business logic (Python).

## Platform and Infrastructure Choice
**Platform:** **Vercel** (Frontend) + **Render** (Backend) + **Supabase** (Database & Auth).
*   **Key Services:**
    *   **Vercel:** Hosting for Next.js, Edge Functions.
    *   **Render:** Hosting for Python FastAPI (Dockerized), simple scaling, health checks.
    *   **Supabase:** Managed PostgreSQL, Vector Storage, Authentication, and Storage (for PDF artifacts).
*   **Deployment Host and Regions:** `fra1` (Frankfurt) or closest available to target users (France/Europe implied by context).

**Rationale:** This combination offers the best "Zero DevOps" experience. Vercel is the native home for Next.js. Render provides a much simpler PaaS experience for Python/Docker than AWS, ideal for an MVP. Supabase unifies DB and Auth, drastically reducing setup time.

## Repository Structure
**Structure:** Monorepo (Turborepo)
**Package Organization:**
- `apps/web`: Next.js 14+ (App Router)
- `apps/api`: Python FastAPI
- `packages/types`: Shared interfaces (TypeScript)
- `packages/config`: ESLint, Prettier, TSConfig

## Architectural Patterns
- **BFF (Backend for Frontend):** The FastAPI backend serves specifically the needs of the Stage Flow web client, aggregating data and formatting it for UI consumption. _Rationale:_ Simplifies the frontend logic, keeping the "heavy lifting" (AI, DB) in Python.
- **Event-Driven UI Updates:** The "Skill Inventory" updates reactively based on chat events. _Rationale:_ Provides the "dopamine reward" feedback loop described in the PRD.
- **RAG (Retrieval-Augmented Generation):** Used for the "Search & Match" and "Company Context" features. _Rationale:_ Allows the AI to ground its cover letter generation in real company data (as seen in the n8n prototype).
- **State Machine (The "Hero's Journey"):** The user's progress is strictly modeled as a state machine (Phase 1 -> Phase 2). _Rationale:_ Enforces the "Gating" logic required by the PRD.

## Architecture Diagram
```mermaid
graph TD
    User[User (Web/Mobile)] -->|HTTPS| CDN[Vercel Edge Network]
    CDN -->|Next.js App| Web[Web App (Next.js)]
    
    subgraph Frontend
        Web --> Auth[Supabase Auth SDK]
        Web -->|REST / SSE| API_GW[FastAPI Backend]
    end
    
    subgraph Backend Services (Render)
        API_GW --> AuthMiddleware[Auth Guard]
        API_GW --> Socratic[Socratic Agent (LangChain)]
        API_GW --> Analyst[Analyst Agent (Gatekeeper)]
        API_GW --> Generator[PDF Generator]
    end
    
    subgraph Data & AI
        Socratic -->|LLM Calls| LLM[OpenAI / Anthropic / Gemini]
        Socratic -->|Context| VectorDB[(Supabase pgvector)]
        Analyst -->|Store Skills| DB[(Supabase PostgreSQL)]
        Generator -->|Store Files| Storage[Supabase Storage]
    end
```
