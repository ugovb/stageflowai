# Story 2.2: Build Basic Chat Interface (UI)

**Epic:** [Epic 2: The Socratic Engine](../epics/epic-2-socratic-engine.md)
**Priority:** High
**Status:** Ready for Review

## Description
Build the frontend component for the chat interface. It needs to handle the display of message history and the input of new messages.

## Dev Agent Record
- **Agent Model Used:** Gemini 2.0 Flash
- **Debug Log References:**
  - Installed `react-markdown` and `@tailwindcss/typography`.
  - Configured Tailwind v4 with `@plugin "@tailwindcss/typography"`.
  - Created `ChatMessage` component with Markdown support and role-based styling.
  - Created `ChatInput` component with auto-resizing textarea.
  - Created `ChatContainer` to manage message state (mocked for now) and auto-scroll.
  - Created `/chat` page accessible to authenticated users.
  - Updated `Navbar` to include a link to `/chat`.
  - Linked `@stageflow/types` correctly in `apps/web`.
- **Completion Notes:**
  - Chat UI is fully functional with mock data.
  - Responsive design works.
  - Markdown rendering is enabled and styled with `prose`.
- **File List:**
  - `apps/web/src/components/chat/ChatMessage.tsx`
  - `apps/web/src/components/chat/ChatInput.tsx`
  - `apps/web/src/components/chat/ChatContainer.tsx`
  - `apps/web/src/app/chat/page.tsx`
  - `apps/web/src/app/globals.css`
  - `apps/web/src/components/Navbar.tsx`
  - `packages/types/package.json`

## Acceptance Criteria
- [x] Chat container layout (occupies main view or split screen).
- [x] Message bubbles distinguished by role (User right/Blue, AI left/Gray).
- [x] Markdown rendering support for AI messages.
- [x] Auto-scroll to bottom behavior when new messages arrive.
- [x] Input area with text area and send button.
- [x] "Typing..." indicator animation.

## Technical Notes
- Use `react-markdown` or similar for rendering.