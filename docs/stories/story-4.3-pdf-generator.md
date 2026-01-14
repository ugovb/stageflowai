# Story 4.3: PDF Generator Service

**Epic:** [Epic 4: Search & Apply](../epics/epic-4-search-apply.md)
**Priority:** High
**Status:** Ready for Dev

## Description
Implement a service to generate a PDF CV based on the user's profile and validated skills.

## Tasks
- [ ] Install `fpdf2` or `weasyprint` in `apps/api`.
- [ ] Create `apps/api/app/services/pdf_service.py`.
- [ ] Design a simple, clean CV layout in the PDF generator.
- [ ] Create API Endpoint `GET /api/documents/cv` that returns a PDF file stream.
- [ ] Add a "Download CV" button in the Frontend Dashboard (Inventory section).

## Acceptance Criteria
- [ ] Clicking "Download CV" downloads a `.pdf` file.
- [ ] The PDF contains the User's Name, Email, School.
- [ ] The PDF lists the Skills from the database with their evidence/description.
