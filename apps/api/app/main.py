from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi.errors import RateLimitExceeded
from contextlib import asynccontextmanager

from app.core.config import get_settings
from app.core.security import limiter
from app.api.routes import auth, chat, profile, search, health, quota

settings = get_settings()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    print(f"🚀 StageFlow starting in {settings.stageflow_mode.upper()} mode")
    yield
    # Shutdown
    print("👋 StageFlow shutting down")

app = FastAPI(
    title="StageFlow AI API",
    version="1.0.0",
    docs_url="/docs" if not settings.is_cloud_mode else None,
    redoc_url=None,
    lifespan=lifespan
)

# Rate limiter
app.state.limiter = limiter

@app.exception_handler(RateLimitExceeded)
async def rate_limit_handler(request: Request, exc: RateLimitExceeded):
    return JSONResponse(
        status_code=429,
        content={"detail": "Trop de requêtes. Réessayez dans une minute."}
    )

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(health.router)
app.include_router(quota.router)
app.include_router(auth.router, prefix="/api/auth", tags=["Auth"])
app.include_router(chat.router, prefix="/api/chat", tags=["Chat"])
app.include_router(profile.router, prefix="/api/profile", tags=["Profile"])
app.include_router(search.router, prefix="/api/search", tags=["Search"])

# Payment routes only in cloud mode
if settings.is_payment_enabled:
    from app.api.routes import payment
    app.include_router(payment.router)
