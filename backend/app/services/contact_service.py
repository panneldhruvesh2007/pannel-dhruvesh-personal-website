import smtplib
import logging
from email.mime.text import MIMEText

from ..database import get_supabase
from ..schemas.contact_schema import ContactSchema
from ..config import settings
from ..utils.validator import sanitize

logger = logging.getLogger(__name__)


async def save_contact(form: ContactSchema) -> None:
    """Insert sanitized form data into Supabase contacts table."""
    client = get_supabase()
    data = {
        "name":    sanitize(form.name),
        "email":   form.email.lower().strip(),
        "phone":   sanitize(form.phone),
        "purpose": sanitize(form.purpose),
        "message": sanitize(form.message),
    }
    result = client.table("contacts").insert(data).execute()
    if hasattr(result, "error") and result.error:
        raise Exception(f"Database insert failed: {result.error}")
    logger.info(f"Contact saved for {form.email}")


async def notify_owner(form: ContactSchema) -> None:
    """Send email notification to site owner. Skips silently if SMTP not configured."""
    if not all([settings.SMTP_HOST, settings.SMTP_USER, settings.SMTP_PASS, settings.NOTIFY_EMAIL]):
        return

    try:
        body = (
            f"New contact form submission\n\n"
            f"Name:    {form.name}\n"
            f"Email:   {form.email}\n"
            f"Phone:   {form.phone}\n"
            f"Purpose: {form.purpose}\n\n"
            f"Message:\n{form.message}"
        )
        msg = MIMEText(body)
        msg["Subject"] = f"[Portfolio] New message from {form.name}"
        msg["From"]    = settings.SMTP_USER
        msg["To"]      = settings.NOTIFY_EMAIL

        with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT) as server:
            server.starttls()
            server.login(settings.SMTP_USER, settings.SMTP_PASS)
            server.sendmail(settings.SMTP_USER, [settings.NOTIFY_EMAIL], msg.as_string())

        logger.info(f"Notification sent for {form.email}")
    except Exception as e:
        logger.warning(f"Email notification failed (non-critical): {e}")
