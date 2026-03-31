import os
import logging
from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger(__name__)


def _parse_origins(raw: str) -> list[str]:
    """
    Parse a comma-separated origins string.
    Accepts '*' as a wildcard (allow all origins).
    Strips whitespace, drops empty strings, validates http/https prefix.
    """
    raw = raw.strip()

    # Wildcard — allow all origins (useful for early dev/testing)
    if raw == "*":
        return ["*"]

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
    SUPABASE_URL: str  = os.environ.get("SUPABASE_URL", "").strip()
    SUPABASE_KEY: str  = os.environ.get("SUPABASE_KEY", "").strip()
    SMTP_HOST: str     = os.environ.get("SMTP_HOST", "smtp.gmail.com").strip()
    SMTP_PORT: int     = int(os.environ.get("SMTP_PORT", 587))
    SMTP_USER: str     = os.environ.get("SMTP_USER", "").strip()
    SMTP_PASS: str     = os.environ.get("SMTP_PASS", "").strip()
    NOTIFY_EMAIL: str  = os.environ.get("NOTIFY_EMAIL", "").strip()

    ALLOWED_ORIGINS: list[str] = _parse_origins(
        os.environ.get(
            "ALLOWED_ORIGINS",
            "https://pannel-dhruvesh-personal-website.vercel.app,"
            "http://localhost:5500,http://127.0.0.1:5500,"
            "http://localhost:3000,http://127.0.0.1:3000"
        )
    )

    def validate(self) -> None:
        """Log a clear startup report of all critical settings."""
        logger.info("=" * 50)
        logger.info("SETTINGS VALIDATION")
        logger.info(f"  SUPABASE_URL   : {'✓ set' if self.SUPABASE_URL  else '✗ MISSING'}")
        logger.info(f"  SUPABASE_KEY   : {'✓ set' if self.SUPABASE_KEY  else '✗ MISSING'}")
        logger.info(f"  SMTP_USER      : {'✓ set' if self.SMTP_USER     else '✗ not set (email disabled)'}")
        logger.info(f"  SMTP_PASS      : {'✓ set' if self.SMTP_PASS     else '✗ not set (email disabled)'}")
        logger.info(f"  NOTIFY_EMAIL   : {self.NOTIFY_EMAIL or '✗ not set'}")
        logger.info(f"  ALLOWED_ORIGINS: {self.ALLOWED_ORIGINS}")
        logger.info("=" * 50)
        if not self.SUPABASE_URL or not self.SUPABASE_KEY:
            logger.error("FATAL: SUPABASE_URL and SUPABASE_KEY are required — contacts will NOT be saved!")


settings = Settings()
