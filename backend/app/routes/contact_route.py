import logging

from fastapi import APIRouter, HTTPException, Request
from slowapi import Limiter
from slowapi.util import get_remote_address

from ..schemas.contact_schema import ContactSchema
from ..services.contact_service import save_contact, notify_owner

logger  = logging.getLogger(__name__)
router  = APIRouter()
limiter = Limiter(key_func=get_remote_address)


@router.post("/contact")
@limiter.limit("3/minute;10/hour;30/day")
async def submit_contact(request: Request, form: ContactSchema):
    logger.info(f"POST /contact — name={form.name}, plan={form.plan}")

    try:
        await save_contact(form)
    except RuntimeError as e:
        logger.error(f"Config error: {e}")
        raise HTTPException(status_code=503, detail={"status": "error", "message": str(e)})
    except Exception as e:
        logger.error(f"DB save failed: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail={"status": "error", "message": "Something went wrong."})

    # Email is fire-and-forget — never blocks or fails the response
    try:
        await notify_owner(form)
    except Exception as e:
        logger.warning(f"Email failed (non-critical): {e}")

    logger.info(f"✓ /contact done for {form.name}")
    return {"status": "success", "message": "Form submitted successfully"}
