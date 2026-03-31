import smtplib
import logging
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

from ..database import get_supabase
from ..schemas.contact_schema import ContactSchema
from ..config import settings
from ..utils.validator import sanitize

logger = logging.getLogger(__name__)


async def save_contact(form: ContactSchema) -> None:
    """Insert sanitized form data into Supabase contacts table."""

    # ── Guard: check credentials are present ─────────────
    if not settings.SUPABASE_URL or not settings.SUPABASE_KEY:
        raise RuntimeError(
            "Supabase is not configured. "
            "Set SUPABASE_URL and SUPABASE_KEY in your environment variables."
        )

    try:
        client = get_supabase()
        data = {
            "name":    sanitize(form.name),
            "email":   str(form.email).lower().strip(),
            "phone":   sanitize(form.phone),
            "purpose": sanitize(form.purpose),
            "message": sanitize(form.message),
        }

        logger.info(f"Attempting Supabase insert for: {data['email']}")
        result = client.table("contacts").insert(data).execute()
        logger.info(f"Supabase raw result: {result}")

        # supabase-py v2 raises an exception on error automatically,
        # but we also check the legacy .error attribute just in case
        if hasattr(result, "error") and result.error:
            raise Exception(f"Supabase insert error: {result.error}")

        if not result.data:
            raise Exception(
                "Supabase insert returned no data — "
                "check table name ('contacts'), RLS policies, and API key type (use service_role, not anon)"
            )

        logger.info(f"✓ Contact saved — id={result.data[0].get('id')}, email={data['email']}")

    except Exception as e:
        logger.error(f"✗ save_contact failed: {e}", exc_info=True)
        raise


async def notify_owner(form: ContactSchema) -> None:
    """Send email notification to site owner via Gmail SMTP."""

    # ── Guard: skip silently if SMTP not configured ───────
    missing = [k for k, v in {
        "SMTP_USER":    settings.SMTP_USER,
        "SMTP_PASS":    settings.SMTP_PASS,
        "NOTIFY_EMAIL": settings.NOTIFY_EMAIL,
    }.items() if not v]

    if missing:
        logger.warning(f"Email skipped — missing env vars: {missing}")
        return

    try:
        logger.info(f"Sending email notification to {settings.NOTIFY_EMAIL}")

        # Build a proper multipart email
        msg = MIMEMultipart("alternative")
        msg["Subject"] = f"[Portfolio] New message from {form.name}"
        msg["From"]    = settings.SMTP_USER
        msg["To"]      = settings.NOTIFY_EMAIL

        plain_body = (
            f"New contact form submission\n"
            f"{'─' * 40}\n"
            f"Name    : {form.name}\n"
            f"Email   : {form.email}\n"
            f"Phone   : {form.phone}\n"
            f"Purpose : {form.purpose}\n"
            f"{'─' * 40}\n"
            f"Message :\n{form.message}\n"
        )

        html_body = f"""
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
          <h2 style="color:#7c3aed">New Portfolio Contact</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px;font-weight:bold;color:#555">Name</td>
                <td style="padding:8px">{form.name}</td></tr>
            <tr style="background:#f9f9f9">
                <td style="padding:8px;font-weight:bold;color:#555">Email</td>
                <td style="padding:8px">{form.email}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;color:#555">Phone</td>
                <td style="padding:8px">{form.phone}</td></tr>
            <tr style="background:#f9f9f9">
                <td style="padding:8px;font-weight:bold;color:#555">Purpose</td>
                <td style="padding:8px">{form.purpose}</td></tr>
          </table>
          <div style="margin-top:16px;padding:12px;background:#f5f3ff;border-left:4px solid #7c3aed">
            <strong>Message:</strong><br/>{form.message}
          </div>
        </div>
        """

        msg.attach(MIMEText(plain_body, "plain"))
        msg.attach(MIMEText(html_body,  "html"))

        # Try SSL on port 465 first (works on Render free tier)
        # Falls back to STARTTLS on port 587 if 465 fails
        try:
            with smtplib.SMTP_SSL(settings.SMTP_HOST, 465, timeout=15) as server:
                server.ehlo()
                server.login(settings.SMTP_USER, settings.SMTP_PASS)
                server.sendmail(settings.SMTP_USER, [settings.NOTIFY_EMAIL], msg.as_string())
        except Exception:
            with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT, timeout=15) as server:
                server.ehlo()
                server.starttls()
                server.ehlo()
                server.login(settings.SMTP_USER, settings.SMTP_PASS)
                server.sendmail(settings.SMTP_USER, [settings.NOTIFY_EMAIL], msg.as_string())

        logger.info(f"✓ Email sent to {settings.NOTIFY_EMAIL}")

    except smtplib.SMTPAuthenticationError:
        logger.error(
            "✗ SMTP authentication failed — "
            "make sure SMTP_PASS is a Gmail App Password (not your regular password). "
            "Enable 2-Step Verification first: https://myaccount.google.com/security"
        )
    except smtplib.SMTPException as e:
        logger.error(f"✗ SMTP error: {e}", exc_info=True)
    except Exception as e:
        logger.error(f"✗ Email notification failed: {e}", exc_info=True)
