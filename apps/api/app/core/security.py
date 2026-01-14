from slowapi import Limiter
from slowapi.util import get_remote_address
from starlette.requests import Request
from app.core.config import get_settings

settings = get_settings()

def get_real_ip(request: Request) -> str:
    """Extract real IP, checking proxy headers in Cloud mode."""
    if settings.stageflow_mode == "cloud":
        # Vercel/AWS/Cloudflare headers (in priority order)
        forwarded = request.headers.get("X-Forwarded-For")
        if forwarded:
            # X-Forwarded-For: client, proxy1, proxy2
            return forwarded.split(",")[0].strip()
        
        real_ip = request.headers.get("X-Real-IP")
        if real_ip:
            return real_ip
        
        cf_ip = request.headers.get("CF-Connecting-IP")
        if cf_ip:
            return cf_ip
    
    # Fallback to direct connection (Local mode)
    return get_remote_address(request)

limiter = Limiter(key_func=get_real_ip)