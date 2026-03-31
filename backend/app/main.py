import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
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

limiter = Limiter(key_func=get_remote_address, default_limits=["200/day", "50/hour"])


@asynccontextmanager
async def lifespan(app: FastAPI):
    settings.validate()
    logger.info("Portfolio API started")
    yield
    logger.info("Portfolio API stopped")


app = FastAPI(
    title="Pannel Dhruvesh — Portfolio API",
    version="1.0.0",
    lifespan=lifespan,
    docs_url=None,
    redoc_url=None,
    openapi_url=None,
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# ── Global unhandled exception handler ───────────────────
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled exception: {exc}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={"status": "error", "message": "Internal server error"},
    )

# ── CORS ──────────────────────────────────────────────────
_origins   = settings.ALLOWED_ORIGINS
_allow_all = _origins == ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"] if _allow_all else _origins,
    allow_credentials=False if _allow_all else True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization", "Accept"],
)

# ── Security + request size middleware ───────────────────
MAX_BODY = 64 * 1024  # 64 KB max request body

@app.middleware("http")
async def security_and_size(request: Request, call_next):
    # Block oversized requests (prevents memory exhaustion)
    content_length = request.headers.get("content-length")
    if content_length and int(content_length) > MAX_BODY:
        return JSONResponse(status_code=413, content={"detail": "Request too large"})

    response = await call_next(request)

    # Security headers
    response.headers["X-Content-Type-Options"]  = "nosniff"
    response.headers["X-Frame-Options"]          = "DENY"
    response.headers["Referrer-Policy"]          = "strict-origin-when-cross-origin"
    response.headers["Permissions-Policy"]       = "geolocation=(), microphone=(), camera=()"
    response.headers["X-XSS-Protection"]         = "1; mode=block"
    response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
    response.headers["Cache-Control"]            = "no-store"
    return response

# ── Routes ────────────────────────────────────────────────
app.include_router(contact_router)

@app.get("/")
async def root():
    return {"status": "ok", "message": "Portfolio API is running"}

@app.get("/health")
async def health():
    return {"status": "ok"}
