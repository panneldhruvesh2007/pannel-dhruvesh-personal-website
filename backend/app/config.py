import os
import logging
from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger(__name__)

def _parse_origins(raw: str) -> list[str]:
    """
    Parse a comma-separated origins string.
    - Strips whitespace from each entry
    - Drops empty strings
    - Drops entries that don't start with http:// or https://
    - Logs a warning for any invalid entry
    """
    origins = []
    for entry in raw.split(","):
        o = entry.strip()
        if not o:
            continue
        if not (o.startswith("http://") or o.startswith("https://")):
            logger.warning(f"CORS: ignoring invalid origin '{o}' — must start with http:// or https://")
            continue
        origins.append(o)
    return origins


class Settings:
    SUPABASE_URL: str  = os.environ.get("SUPABASE_URL", "")
    SUPABASE_KEY: str  = os.environ.get("SUPABASE_KEY", "")
    SMTP_HOST: str     = os.environ.get("SMTP_HOST", "")
    SMTP_PORT: int     = int(os.environ.get("SMTP_PORT", 587))
    SMTP_USER: str     = os.environ.get("SMTP_USER", "")
    SMTP_PASS: str     = os.environ.get("SMTP_PASS", "")
    NOTIFY_EMAIL: str  = os.environ.get("NOTIFY_EMAIL", "")

    # Default includes common local dev ports — override in production .env
    ALLOWED_ORIGINS: list[str] = _parse_origins(
        os.environ.get(
            "ALLOWED_ORIGINS",
            "http://localhost:3000,http://127.0.0.1:3000,"
            "http://localhost:5500,http://127.0.0.1:5500,"
            "http://localhost:8080,http://127.0.0.1:8080"
        )
    )


settings = Settings()
