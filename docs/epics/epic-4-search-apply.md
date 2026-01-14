# Epic 4: Search & Apply

**Status:** Draft
**Priority:** Medium
**Parent:** [PRD](../prd.md)

## Goal
Turn the introspection profile into tangible results. This epic covers finding relevant internships and generating the actual application assets (Markdown Profile and PDF Cover Letter) tailored to those opportunities.

## Description
This is the "utility" phase of the application. Once the user has built a profile (via Epics 2 & 3), they need to use it. We will integrate a search API to find real companies and use the LLM to generate hyper-personalized cover letters based on the intersection of the User Profile and the Company Data.

## Scope
- **Search:** Integration with external search API (Serp/Perplexity).
- **Generation:** LLM pipeline to write cover letters.
- **Export:** PDF generation and file storage.

## Stories

### Story 4.1: Build Search UI
**Goal:** Allow users to find target companies.
**Acceptance Criteria:**
- Input fields for "Location" (e.g., Paris) and "Domain" (e.g., Digital Marketing).
- List view for search results.
- "Select" button to target a specific company for application.

### Story 4.2: Integrate Search API
**Goal:** Fetch real company data.
**Acceptance Criteria:**
- Backend service wraps an external API (e.g., Serper, Perplexity).
- Returns list of companies with Name, Website, and brief Summary.
- Stores selected company details in `Company` table for RAG context.

### Story 4.3: Build "Markdown Profile" Generator
**Goal:** Compile the database state into a portable resume/profile.
**Acceptance Criteria:**
- "Export Profile" button.
- Generates a structured Markdown file containing all extracted Skills and STAR evidence.
- Downloadable by the user.

### Story 4.4: Build "Cover Letter" Generator
**Goal:** Generate the final PDF asset.
**Acceptance Criteria:**
- "Generate Cover Letter" action for a selected Company.
- LLM reads User Profile + Company Context (RAG).
- Generates a personalized letter text.
- Converts text to PDF.
- User can view and download the PDF.
