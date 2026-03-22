from fastapi import APIRouter, HTTPException, Request
from slowapi import Limiter
from slowapi.util import get_remote_address
from pydantic import ValidationError

from ..schemas.contact_schema import ContactSchema
from ..services.contact_service import save_contact, notify_owner

router  = APIRouter()
limiter = Limiter(key_func=get_remote_address)


@router.post("/contact")
@limiter.limit("5/minute")
async def submit_contact(request: Request, form: ContactSchema):
    try:
        await save_contact(form)
        await notify_owner(form)
        return {"status": "success", "message": "Form submitted successfully"}
    except ValidationError as e:
        raise HTTPException(status_code=422, detail={"status": "error", "message": str(e)})
    except Exception as e:
        raise HTTPException(status_code=500, detail={"status": "error", "message": "Something went wrong. Please try again."})
