# Deployment Architecture

## Strategy
- **Frontend (Vercel):** Git-push deployment. Environment variables configured for API URL and Supabase keys.
- **Backend (Render):** Dockerfile deployment.
    ```dockerfile
    FROM python:3.11-slim
    WORKDIR /app
    COPY requirements.txt .
    RUN pip install -r requirements.txt
    COPY . .
    CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
    ```
- **Database:** Managed Supabase instance.

## Environments
| Environment | Frontend URL | Backend URL | Purpose |
| :--- | :--- | :--- | :--- |
| **Development** | `localhost:3000` | `localhost:8000` | Local dev |
| **Production** | `stageflow.ai` | `api.stageflow.ai` | Live |
