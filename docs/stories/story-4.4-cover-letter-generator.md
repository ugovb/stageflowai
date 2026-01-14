# Story 4.4: Build "Cover Letter" Generator

**Epic:** [Epic 4: Search & Apply](../epics/epic-4-search-apply.md)
**Priority:** High
**Status:** Open

## Description
The "Magic Button". Generate a PDF cover letter tailored to a specific company using the user's profile.

## Acceptance Criteria
- [ ] User selects a company from Search (or enters one manually).
- [ ] Backend Prompt: "Write a cover letter for [Company] using [User Skills]...".
- [ ] LLM generates the text.
- [ ] Python library (`fpdf2` or `reportlab`) converts text to PDF.
- [ ] PDF is uploaded to Supabase Storage (or returned as stream).
- [ ] Frontend displays/downloads the PDF.

## Technical Notes
- Ensure the LLM prompt enforces a professional tone and specific formatting for the PDF generator to handle.
