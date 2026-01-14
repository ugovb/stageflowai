# Story 4.2: Integrate Search API

**Epic:** [Epic 4: Search & Apply](../epics/epic-4-search-apply.md)
**Priority:** Medium
**Status:** Open

## Description
Connect the backend to an external search provider to fetch real company data.

## Acceptance Criteria
- [ ] Backend route `GET /api/search` implemented.
- [ ] Integration with Serper.dev, Perplexity, or Google Custom Search.
- [ ] Response mapping: Transform external API format to our internal `Company` schema.
- [ ] Error handling (rate limits, no results).

## Technical Notes
- Cache results to save API credits.
