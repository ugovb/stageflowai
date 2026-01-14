# Epic 2: The Socratic Engine

**Status:** Draft
**Priority:** High
**Parent:** [PRD](../prd.md)

## Goal
Build the core value proposition of Stage Flow AI: an intelligent, "Gate-based" conversational agent that guides students through the 10-phase introspection journey. This system must interview the user, validate their answers against specific criteria (the "Gate"), and store the extracted skills.

## Description
This epic focuses on the "Socratic" aspect of the platform. We need to implement the backend logic that drives the conversation (LangChain), the data models that store the state of the journey, and the frontend chat interface. The key innovation here is the "Analyst Agent" that acts as a gatekeeper, ensuring users provide high-quality "STAR" answers before moving forward.

## Scope
- **Data Modeling:** Schema for `JourneyState`, `ChatMessage`, and `Skill`.
- **Backend:** "Interviewer" Agent (generates questions) and "Analyst" Agent (validates answers).
- **Frontend:** Responsive Chat UI with history support.
- **Logic:** "Hidden Menu" loading (domain-specific prompts).

## Stories

### Story 2.1: Design "Phase" Data Model
**Goal:** Define and implement the database schema to track user progress.
**Acceptance Criteria:**
- `JourneyState` table created (tracks current phase 1-10).
- `ChatMessage` table created (stores user/AI history).
- `Skill` table created (stores extracted evidence).
- TypeScript interfaces generated and synced with backend Pydantic models.

### Story 2.2: Build Basic Chat Interface (UI)
**Goal:** Create the user interface for the conversation.
**Acceptance Criteria:**
- Chat window with message history (User on right, AI on left).
- Input field with "Send" button.
- Loading state (typing indicator) while AI is thinking.
- Auto-scroll to bottom on new message.

### Story 2.3: Implement "Interviewer" Agent (LangChain)
**Goal:** Build the AI agent that drives the conversation.
**Acceptance Criteria:**
- Endpoint `POST /chat/message` accepts user input.
- System loads the correct prompt based on `current_phase_id`.
- Agent maintains conversation memory (last N turns).
- Response is streamed via SSE to the frontend.

### Story 2.4: Implement "Analyst" Agent (Gatekeeper)
**Goal:** Validate user answers and extract data.
**Acceptance Criteria:**
- Background task analyzes user message after it is sent.
- Checks against "Definition of Done" for the current phase (e.g., "Contains Situation, Task, Action, Result").
- If criteria met: Updates `JourneyState.criteria_met` and extracts `Skill` to DB.
- If not met: Hints are passed to the Interviewer to ask follow-up questions.

### Story 2.5: Connect "Hidden Menus" (Domain Specific Prompts)
**Goal:** Tailor the experience to the student's field.
**Acceptance Criteria:**
- User's selected domain (e.g., "Humanities") loads a specific set of prompts.
- "Interviewer" agent swaps context based on the `archetype` field in the User profile.
