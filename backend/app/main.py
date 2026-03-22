import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

from .config import settings
from .routes.contact_route import router as contact_router

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger(__name__)

limiter = Limiter(key_func=get_remote_address)


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Print full settings validation on every startup — visible in Render logs
    settings.validate()
    logger.info("Portfolio API started")
    yield
    logger.info("Portfolio API stopped")


app = FastAPI(
    title="Pannel Dhruvesh — Portfolio API",
    version="1.0.0",
    lifespan=lifespan,
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Handle wildcard CORS correctly
_origins     = settings.ALLOWED_ORIGINS
_allow_all   = _origins == ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"] if _allow_all else _origins,
    allow_credentials=False if _allow_all else True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization", "Accept"],
)

# ── Routes ────────────────────────────────────────────────
app.include_router(contact_router)


@app.get("/")
async def root():
    return {"status": "ok", "message": "Portfolio API is running"}


@app.get("/health")
async def health():
    """Detailed health check — useful for debugging on Render."""
    return {
        "status": "ok",
        "supabase_configured": bool(settings.SUPABASE_URL and settings.SUPABASE_KEY),
        "email_configured":    bool(settings.SMTP_USER and settings.SMTP_PASS and settings.NOTIFY_EMAIL),
        "allowed_origins":     settings.ALLOWED_ORIGINS,
    }
