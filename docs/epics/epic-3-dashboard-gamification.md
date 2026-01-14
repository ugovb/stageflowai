# Epic 3: Dashboard & Gamification

**Status:** Draft
**Priority:** Medium
**Parent:** [PRD](../prd.md)

## Goal
Visualize the user's progress through the "Hero's Journey" to maintain engagement and provide immediate feedback. The interface should feel less like a form and more like a game ("RPG style"), with a visual map and tangible rewards (skills appearing in the inventory).

## Description
This epic implements the "Metro Map" dashboard and the real-time "Skill Inventory". These components are the primary visual indicators of progress. The "Map" shows where the user is going, and the "Inventory" shows what they have achieved.

## Scope
- **Components:** Interactive "Metro Map" (SVG/Canvas) and "Skill Sidebar".
- **State:** Frontend state management (Zustand) synchronized with backend events.
- **Visuals:** Locked/Unlocked states, animations for new skills.

## Stories

### Story 3.1: Build "Metro Map" Component
**Goal:** Visualize the 10-phase journey.
**Acceptance Criteria:**
- Interactive component displaying 10 nodes (stations).
- Visual distinction between "Locked", "Active", and "Completed" nodes.
- Clicking an "Active" or "Completed" node navigates to the chat context for that phase.
- "Locked" nodes are non-clickable and visually dimmed.

### Story 3.2: Connect Map to Backend User State
**Goal:** Drive the map visualization with real data.
**Acceptance Criteria:**
- Fetch `JourneyState` on dashboard load.
- Map updates immediately when a phase is completed (Gate passed).
- Persist state across sessions (refreshing page retains progress).

### Story 3.3: Build "Skill Inventory" Component (UI Sidebar)
**Goal:** Display verified skills in real-time.
**Acceptance Criteria:**
- Sidebar (collapsible on mobile) showing list of extracted skills.
- Skills categorized (e.g., Hard, Soft).
- Clicking a skill shows the "STAR" evidence detail.

### Story 3.4: Implement "Skill Extraction" Logic (Real-time Updates)
**Goal:** Create the "dopamine loop" of seeing a skill appear.
**Acceptance Criteria:**
- Frontend listens for "Skill Created" events (via SSE or polling).
- When a new skill is added to DB by the Analyst, it flies/animates into the Sidebar.
- Toast notification: "New Skill Unlocked: [Skill Name]".
