# API Specification

## REST API (FastAPI)

**OpenAPI 3.0 Structure:**

```yaml
openapi: 3.0.0
info:
  title: Stage Flow AI API
  version: 1.0.0
servers:
  - url: /api/v1
paths:
  /chat/message:
    post:
      summary: Send a message to the Socratic Agent
      description: Returns a streaming response (SSE)
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                message: {type: string}
                phase_id: {type: integer}
  /journey/state:
    get:
      summary: Get current map progress and locked status
  /skills:
    get:
      summary: Fetch the user's skill inventory
    post:
      summary: Manually add a skill (optional override)
  /search/companies:
    get:
      summary: Search for companies by domain/location
  /application/generate:
    post:
      summary: Generate PDF/Markdown for a specific company
```
