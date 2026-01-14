# Stage Flow AI Product Requirements Document (PRD)

## 1. Goals and Background Context

### Goals
*   **Launch a standalone Web Application:** Replace the n8n automation with a robust Python/React app.
*   **Validate Socratic Introspection:** Implement a "Gate-based" profile builder that users actually complete (target >50% completion).
*   **Automate High-Quality Applications:** Generate Markdown profiles and PDF cover letters that are significantly better than generic AI outputs.
*   **Empower Non-Technical Students:** Provide a user experience that requires zero technical configuration (SaaS model).

### Background Context
Stage Flow AI addresses the struggle of university students, particularly in Humanities, to translate academic experience into professional value. Existing tools are either simple resume editors or generic AI chat wrappers that hallucinate skills. The current n8n prototype validated the logic but lacks state management, scalability, and a good UX. This project aims to build a dedicated web platform where an AI "Career Coach" guides students through a strict 10-phase introspection journey (The "Hero's Journey"), extracting evidence-based skills ("STAR" method) to power a network-first internship search and automated application generation.

### Change Log
| Date | Version | Description | Author |
| :--- | :--- | :--- | :--- |
| 2025-01-10 | 1.0 | Initial Draft based on Project Brief | PM Agent |

## 2. Requirements

### Functional Requirements (FR)
*   **FR1 (Auth):** Users must be able to sign up and log in via email/password or Google Auth.
*   **FR2 (Dashboard):** Users see a "Metro Map" visualization of their progress through the 10 introspection phases.
*   **FR3 (Socratic Chat):** Users interact with an AI agent that asks probing questions based on their selected domain (e.g., Arts, Science).
*   **FR4 (Gating Logic):** The system must prevent users from advancing to the next phase until specific criteria (e.g., "3 STAR examples provided") are met.
*   **FR5 (Skill Inventory):** Verified skills must appear in a read-only "Inventory" sidebar in real-time during the chat.
*   **FR6 (Profile Export):** Users can export their completed profile as a structured Markdown file.
*   **FR7 (Search):** Users can search for internships/companies by Geographic Zone and Domain (integrated via Search API).
*   **FR8 (Asset Gen):** The system generates a tailored PDF cover letter for a specific selected company using the user's profile.
*   **FR9 (Domain Menus):** The AI must switch questioning strategies based on at least 3 distinct student archetypes (Humanities, STEM, Business).

### Non-Functional Requirements (NFR)
*   **NFR1 (Response Time):** AI chat responses should take no longer than 3-5 seconds to maintain conversational flow.
*   **NFR2 (Accessibility):** The Web App must be responsive and accessible on mobile devices (WCAG AA).
*   **NFR3 (Privacy):** User data (especially introspection details) must be stored securely in the database.
*   **NFR4 (Scalability):** The backend must handle concurrent chat sessions without crashing (State management via DB).

## 3. User Interface Design Goals

### UX Vision
A "Gamified Career Journey." The experience should feel less like filling out a form and more like playing an RPG. The "Metro Map" provides a clear sense of progress, and the "Inventory" provides immediate dopamine rewards for answering difficult questions.

### Key Interaction Paradigms
*   **The Guide:** A friendly but strict AI persona that drives the conversation.
*   **The Map:** Clickable nodes representing phases. Locked nodes are visually distinct.
*   **The Inventory:** Flying animations when a skill is "captured" by the AI.

### Core Screens
1.  **Landing/Login:** Simple value prop + Auth.
2.  **Metro Map Dashboard:** The central hub showing the 10 stations.
3.  **Introspection Station (Chat):** Split screen: Chat on Left, Inventory/Status on Right (or Drawer on Mobile).
4.  **Search & Match:** Radar-style view of found companies.
5.  **Application Center:** List of generated PDFs/Cover Letters.

### Target Platforms
*   **Web Responsive:** Primary focus. Must work perfectly on a laptop (for writing) and be viewable on a phone.

## 4. Technical Assumptions

### Stack Decisions
*   **Frontend:** React (Next.js) - for dynamic UI and "Map" visualizations.
*   **Backend:** Python (FastAPI) - robust, fast, and excellent ecosystem for AI/LangChain.
*   **Database:** PostgreSQL (User Data/State) + Vector DB (pgvector or Chroma) for RAG.
*   **AI orchestration:** LangChain or Vercel AI SDK.
*   **Deployment:** Dockerized containers (easily deployable to Vercel/Render/Railway).

### Architecture
*   **Repository:** Monorepo (Frontend + Backend in one repo for easier MVP management).
*   **Service Arch:** Modular Monolith. Keep it simple for MVP.

## 5. Epic List

*   **Epic 1: Foundation & Core Infrastructure:** Set up Next.js frontend, FastAPI backend, Database, and Auth.
*   **Epic 2: The Socratic Engine (Phase 1-10):** Build the AI Agent logic, the "Hidden Menus," and the Chat UI with the "Gate" mechanism.
*   **Epic 3: Dashboard & Gamification:** Implement the "Metro Map" visualization and the "Skill Inventory" state management.
*   **Epic 4: Search & Apply:** Implement the Company Search API integration and the PDF/Markdown Generator.

## 6. Epic Details

### Epic 1: Foundation & Core Infrastructure
**Goal:** Establish a deployable "Hello World" app with secure user authentication and database connections.
*   **Story 1.1:** Init Monorepo with Next.js and FastAPI.
*   **Story 1.2:** Configure PostgreSQL and Alembic migrations.
*   **Story 1.3:** Implement User Registration & Login (JWT).
*   **Story 1.4:** Set up Basic UI Shell (NavBar, empty Dashboard).

### Epic 2: The Socratic Engine
**Goal:** The core value. An AI that can interview a student, validate their answers, and store the results.
*   **Story 2.1:** Design "Phase" Data Model (Store current step, messages, extracted data).
*   **Story 2.2:** Build Basic Chat Interface (UI).
*   **Story 2.3:** Implement "Interviewer" Agent (LangChain) that loads specific prompts per Phase.
*   **Story 2.4:** Implement "Analyst" Agent that runs the "Gate" check on user messages.
*   **Story 2.5:** Connect "Hidden Menus" (Domain specific prompts) to the Interviewer.

### Epic 3: Dashboard & Gamification
**Goal:** Visualizing the progress to keep users engaged.
*   **Story 3.1:** Build "Metro Map" Component (Visualizing the 10 phases + Lock/Unlock logic).
*   **Story 3.2:** Connect Map to Backend User State (Unlock next node when Gate passed).
*   **Story 3.3:** Build "Skill Inventory" Component (UI Sidebar).
*   **Story 3.4:** Implement "Skill Extraction" logic (Analyst updates DB -> UI updates real-time).

### Epic 4: Search & Apply
**Goal:** Turning the profile into tangible results (Companies & PDFs).
*   **Story 4.1:** Build Search UI (Input: Location + Domain).
*   **Story 4.2:** Integrate Search API (e.g., Perplexity/Serp) to fetch companies.
*   **Story 4.3:** Build "Markdown Profile" Generator (Compiling DB data into Markdown).
*   **Story 4.4:** Build "Cover Letter" Generator (LLM takes Profile + Company Info -> PDF).

## 7. Next Steps

### UX Expert Prompt
"Please review the 'Metro Map' and 'Split Screen' UI concepts in the PRD. We need a high-fidelity wireframe that handles the dense information of a chat session while keeping the 'Inventory' visible but not distracting on smaller screens. Focus on the 'Unlock' animation for the Map."

### Architect Prompt
"Please design a Python FastAPI + Next.js architecture. Critical focus: State Management for the AI conversation. We need to store the conversation history and the structured 'Extracted Data' separately. Evaluate if we need a Vector DB immediately for the MVP or if simple structured storage is enough."
