# Tech Stack

## Technology Stack Table

| Category | Technology | Version | Purpose | Rationale |
| :--- | :--- | :--- | :--- | :--- |
| **Frontend Language** | TypeScript | 5.x | Type Safety | Standard for robust React development. |
| **Frontend Framework** | Next.js | 14+ (App) | UI & Routing | Leading React framework, great performance, server components. |
| **UI Library** | Shadcn/UI + Tailwind | Latest | Styling | Rapid development, accessible, highly customizable, "beautiful by default". |
| **State Management** | Zustand | Latest | Client State | Simple, lightweight, perfect for "Inventory" management without Redux bloat. |
| **Backend Language** | Python | 3.11+ | Business Logic | Native language of AI/ML (LangChain), robust typing in modern versions. |
| **Backend Framework** | FastAPI | 0.100+ | API | High performance, async native, auto-OpenAPI docs. |
| **API Style** | REST + SSE | - | Communication | REST for CRUD, Server-Sent Events for streaming chat responses. |
| **Database** | PostgreSQL | 15+ | Relational Data | Robust, reliable, relational data integrity. |
| **Vector DB** | pgvector | - | RAG | Integrated directly into Postgres (Supabase), no separate service needed. |
| **Authentication** | Supabase Auth | - | Identity | Handles social login (Google), JWT management securely. |
| **File Storage** | Supabase Storage | - | Artifacts | Store generated PDFs and user uploads. |
| **LLM Orchestration** | LangChain (Python) | Latest | AI Logic | Industry standard for chaining prompts and managing context. |
| **Build Tool** | Turbo | Latest | Monorepo Build | Caching and orchestration for the monorepo. |
| **CI/CD** | GitHub Actions | - | Automation | Standard, free for public/small private repos. |
| **Monitoring** | Sentry | - | Error Tracking | Fullstack error tracking (JS + Python). |
