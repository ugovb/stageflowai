# Coding Standards (Critical Rules)

- **Type Sharing:** Pydantic models in Python should be synced with TypeScript interfaces (using tools like `datamodel-code-generator` or manual sync in strict `packages/types`).
- **No Direct SQL:** Use an ORM (SQLAlchemy or SQLModel) to prevent injection and maintain maintainability.
- **Environment Variables:** Strictly typed config. Fail startup if keys are missing.
- **Error Handling:** Unified error response structure `{ "error": { "code": "...", "message": "..." } }`.
