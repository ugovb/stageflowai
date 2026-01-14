# Security and Performance

## Security Requirements
- **LLM Safety:** System prompts must strictly prevent prompt injection. "Analyst" agent acts as a second layer to verify output quality.
- **Data Privacy:** Introspection data is sensitive. RLS (Row Level Security) policies in Postgres (via Supabase) should be enabled as a defense-in-depth measure, even if the API handles access.

## API Rate Limiting
To prevent abuse and manage LLM costs:
- **Global Limit:** 100 requests per minute per IP for standard endpoints.
- **Chat Limit:** 10 messages per minute per User ID for LLM-heavy chat endpoints.
- **Implementation:** Use `slowapi` (FastAPI middleware) or Supabase's built-in rate-limiting capabilities if available.

## Performance Optimization
- **Streaming:** ALL chat interactions must stream. Waiting 3-5 seconds for a full block of text breaks flow.
- **Optimistic UI:** When a user unlocks a node, the UI should update immediately, reverting only if the server fails.
