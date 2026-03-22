import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

from .config import settings
from .routes.contact_route import router as contact_router

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

limiter = Limiter(key_func=get_remote_address)


@asynccontextmanager
async def lifespan(app: FastAPI):
    if not settings.SUPABASE_URL:
        logger.warning("SUPABASE_URL not set — check your .env file")
    if not settings.ALLOWED_ORIGINS:
        logger.warning("ALLOWED_ORIGINS is empty — all CORS requests will be blocked!")
    else:
        logger.info(f"CORS allowed origins: {settings.ALLOWED_ORIGINS}")
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

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization", "Accept"],
)

# ── Routes ────────────────────────────────────────────────
app.include_router(contact_router)

@app.get("/")
async def root():
    return {"status": "ok", "message": "Portfolio API is running"}
