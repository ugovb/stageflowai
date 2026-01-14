# Story 4.2: Real Company Search Integration

**Epic:** [Epic 4: Search & Apply](../epics/epic-4-search-apply.md)
**Priority:** Medium
**Status:** Ready for Dev

## Description
Replace the mocked company search with real data. We will use `duckduckgo-search` (Python library) to find real companies based on keywords.

## Tasks
- [ ] Install `duckduckgo-search` in `apps/api`.
- [ ] Update `apps/api/app/api/v1/search.py` to use DDG Search instead of the mock list.
- [ ] Map DDG results to our `CompanyResult` schema (extract Title, Snippet, URL).
- [ ] Improve prompt/query logic (e.g., search for "internship [role] [location] company").

## Acceptance Criteria
- [ ] Searching for "Marketing Paris" returns real companies/results.
- [ ] Results include a Title, Description, and Link.
- [ ] Frontend displays these real results.
