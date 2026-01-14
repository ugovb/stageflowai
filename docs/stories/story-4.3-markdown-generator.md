# Story 4.3: Build "Markdown Profile" Generator

**Epic:** [Epic 4: Search & Apply](../epics/epic-4-search-apply.md)
**Priority:** Medium
**Status:** Open

## Description
Allow users to download their extracted data in a raw, useful format.

## Acceptance Criteria
- [ ] Backend service that queries all `Skills` and `User` info.
- [ ] Template engine (Jinja2) to format this into a clean Markdown string.
- [ ] Frontend "Download Profile" button triggers the file download.

## Technical Notes
- The Markdown structure should be readable and ready to paste into ChatGPT or other tools.
