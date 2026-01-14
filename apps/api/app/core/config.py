from pydantic_settings import BaseSettings
from typing import Literal, List, Optional
from pydantic import Field
from functools import lru_cache

class Settings(BaseSettings):
    # Mode
    stageflow_mode: Literal["local", "cloud"] = "local"
    
    # Database
    database_url: str
    
    # Auth
    jwt_secret: str = Field(..., env="SUPABASE_JWT_SECRET")
    jwt_algorithm: str = "HS256"
    
    # Supabase
    supabase_url: str = Field(..., env="SUPABASE_URL")
    supabase_anon_key: str = Field(..., env="SUPABASE_ANON_KEY")
    
    # AI
    openrouter_api_key: str
    
    # Lemon Squeezy (cloud only)
    lemonsqueezy_api_key: Optional[str] = None
    lemonsqueezy_store_id: Optional[str] = None
    lemonsqueezy_webhook_secret: Optional[str] = None
    lemonsqueezy_product_id: Optional[str] = None
    lemonsqueezy_variant_id_monthly: Optional[str] = None
    lemonsqueezy_variant_id_yearly: Optional[str] = None
    lemon_profil_pro_product_id: Optional[str] = None # For one-shot purchase
    
    # Security
    allowed_origins: List[str] = ["http://localhost:3000"]
    rate_limit_per_minute: int = 20
    daily_token_budget: int = 100000
    
    @property
    def is_cloud_mode(self) -> bool:
        return self.stageflow_mode == "cloud"
    
    @property
    def is_payment_enabled(self) -> bool:
        return self.is_cloud_mode and self.lemonsqueezy_api_key is not None
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

@lru_cache
def get_settings() -> Settings:
    return Settings()