# Epic Details

## Epic 1: Foundation & Core Infrastructure
**Goal:** Establish a deployable "Hello World" app with secure user authentication and database connections.
*   **Story 1.1:** Init Monorepo with Next.js and FastAPI.
*   **Story 1.2:** Configure PostgreSQL and Alembic migrations.
*   **Story 1.3:** Implement User Registration & Login (JWT).
*   **Story 1.4:** Set up Basic UI Shell (NavBar, empty Dashboard).

## Epic 2: The Socratic Engine
**Goal:** The core value. An AI that can interview a student, validate their answers, and store the results.
*   **Story 2.1:** Design "Phase" Data Model (Store current step, messages, extracted data).
*   **Story 2.2:** Build Basic Chat Interface (UI).
*   **Story 2.3:** Implement "Interviewer" Agent (LangChain) that loads specific prompts per Phase.
*   **Story 2.4:** Implement "Analyst" Agent that runs the "Gate" check on user messages.
*   **Story 2.5:** Connect "Hidden Menus" (Domain specific prompts) to the Interviewer.

## Epic 3: Dashboard & Gamification
**Goal:** Visualizing the progress to keep users engaged.
*   **Story 3.1:** Build "Metro Map" Component (Visualizing the 10 phases + Lock/Unlock logic).
*   **Story 3.2:** Connect Map to Backend User State (Unlock next node when Gate passed).
*   **Story 3.3:** Build "Skill Inventory" Component (UI Sidebar).
*   **Story 3.4:** Implement "Skill Extraction" logic (Analyst updates DB -> UI updates real-time).

## Epic 4: Search & Apply
**Goal:** Turning the profile into tangible results (Companies & PDFs).
*   **Story 4.1:** Build Search UI (Input: Location + Domain).
*   **Story 4.2:** Integrate Search API (e.g., Perplexity/Serp) to fetch companies.
*   **Story 4.3:** Build "Markdown Profile" Generator (Compiling DB data into Markdown).
*   **Story 4.4:** Build "Cover Letter" Generator (LLM takes Profile + Company Info -> PDF).
