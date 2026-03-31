import logging

from fastapi import APIRouter, HTTPException, Request
from slowapi import Limiter
from slowapi.util import get_remote_address
from pydantic import ValidationError

from ..schemas.contact_schema import ContactSchema
from ..services.contact_service import save_contact, notify_owner

logger  = logging.getLogger(__name__)
router  = APIRouter()
limiter = Limiter(key_func=get_remote_address)


@router.post("/contact")
@limiter.limit("5/minute")
async def submit_contact(request: Request, form: ContactSchema):
    logger.info(f"POST /contact — from={form.email}, purpose={form.purpose}")

    # ── Step 1: Save to Supabase ──────────────────────────
    try:
        await save_contact(form)
    except RuntimeError as e:
        # Config error (missing env vars) — 503 so it's clear it's a server config issue
        logger.error(f"Config error in save_contact: {e}")
        raise HTTPException(
            status_code=503,
            detail={"status": "error", "message": str(e)},
        )
    except Exception as e:
        logger.error(f"Database save failed: {e}", exc_info=True)
        raise HTTPException(
            status_code=500,
            detail={"status": "error", "message": "Something went wrong. Please try again."},
        )

    # ── Step 2: Send email (non-blocking — never fails the request) ──
    try:
        await notify_owner(form)
    except Exception as e:
        # Email failure is logged but does NOT fail the response
        logger.warning(f"Email notification failed (non-critical): {e}")

    logger.info(f"✓ /contact completed for {form.email}")
    return {"status": "success", "message": "Form submitted successfully"}
