# Requirements

## Functional Requirements (FR)
*   **FR1 (Auth):** Users must be able to sign up and log in via email/password or Google Auth.
*   **FR2 (Dashboard):** Users see a "Metro Map" visualization of their progress through the 10 introspection phases.
*   **FR3 (Socratic Chat):** Users interact with an AI agent that asks probing questions based on their selected domain (e.g., Arts, Science).
*   **FR4 (Gating Logic):** The system must prevent users from advancing to the next phase until specific criteria (e.g., "3 STAR examples provided") are met.
*   **FR5 (Skill Inventory):** Verified skills must appear in a read-only "Inventory" sidebar in real-time during the chat.
*   **FR6 (Profile Export):** Users can export their completed profile as a structured Markdown file.
*   **FR7 (Search):** Users can search for internships/companies by Geographic Zone and Domain (integrated via Search API).
*   **FR8 (Asset Gen):** The system generates a tailored PDF cover letter for a specific selected company using the user's profile.
*   **FR9 (Domain Menus):** The AI must switch questioning strategies based on at least 3 distinct student archetypes (Humanities, STEM, Business).

## Non-Functional Requirements (NFR)
*   **NFR1 (Response Time):** AI chat responses should take no longer than 3-5 seconds to maintain conversational flow.
*   **NFR2 (Accessibility):** The Web App must be responsive and accessible on mobile devices (WCAG AA).
*   **NFR3 (Privacy):** User data (especially introspection details) must be stored securely in the database.
*   **NFR4 (Scalability):** The backend must handle concurrent chat sessions without crashing (State management via DB).
