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
    if not settings.SUPABASE_URL or not settings.SUPABASE_KEY:
        raise RuntimeError("Supabase is not configured.")

    try:
        client = get_supabase()
        data = {
            "name":    sanitize(form.name),
            "email":   sanitize(form.email or ""),
            "phone":   sanitize(form.phone),
            "plan":    sanitize(form.plan or "Not specified"),
            "message": sanitize(form.message),
        }
        logger.info(f"Supabase insert: {data['name']} / {data['phone']}")
        result = client.table("contacts").insert(data).execute()

        if hasattr(result, "error") and result.error:
            raise Exception(f"Supabase error: {result.error}")
        if not result.data:
            raise Exception("Supabase insert returned no data — check RLS policies")

        logger.info(f"✓ Contact saved id={result.data[0].get('id')}")

    except Exception as e:
        logger.error(f"✗ save_contact failed: {e}", exc_info=True)
        raise


async def notify_owner(form: ContactSchema) -> None:
    missing = [k for k, v in {
        "SMTP_USER": settings.SMTP_USER,
        "SMTP_PASS": settings.SMTP_PASS,
        "NOTIFY_EMAIL": settings.NOTIFY_EMAIL,
    }.items() if not v]

    if missing:
        logger.warning(f"Email skipped — missing: {missing}")
        return

    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = f"[Portfolio] New lead from {form.name} — {form.plan}"
        msg["From"]    = settings.SMTP_USER
        msg["To"]      = settings.NOTIFY_EMAIL

        plain = (
            f"New contact form submission\n{'─'*40}\n"
            f"Name   : {form.name}\n"
            f"Phone  : {form.phone}\n"
            f"Email  : {form.email or 'Not provided'}\n"
            f"Plan   : {form.plan}\n"
            f"{'─'*40}\n"
            f"Message:\n{form.message}\n"
        )
        html = f"""
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
          <h2 style="color:#7c3aed">🚀 New Website Lead!</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px;font-weight:bold;color:#555">Name</td><td style="padding:8px">{form.name}</td></tr>
            <tr style="background:#f9f9f9"><td style="padding:8px;font-weight:bold;color:#555">Phone</td><td style="padding:8px">{form.phone}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;color:#555">Email</td><td style="padding:8px">{form.email or 'Not provided'}</td></tr>
            <tr style="background:#f9f9f9"><td style="padding:8px;font-weight:bold;color:#555">Plan</td><td style="padding:8px;color:#7c3aed;font-weight:bold">{form.plan}</td></tr>
          </table>
          <div style="margin-top:16px;padding:12px;background:#f5f3ff;border-left:4px solid #7c3aed">
            <strong>Message:</strong><br/>{form.message}
          </div>
          <p style="margin-top:16px;color:#888;font-size:12px">Reply quickly — leads convert faster within 1 hour!</p>
        </div>
        """
        msg.attach(MIMEText(plain, "plain"))
        msg.attach(MIMEText(html,  "html"))

        try:
            with smtplib.SMTP_SSL(settings.SMTP_HOST, 465, timeout=15) as s:
                s.login(settings.SMTP_USER, settings.SMTP_PASS)
                s.sendmail(settings.SMTP_USER, [settings.NOTIFY_EMAIL], msg.as_string())
        except Exception:
            with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT, timeout=15) as s:
                s.ehlo(); s.starttls(); s.ehlo()
                s.login(settings.SMTP_USER, settings.SMTP_PASS)
                s.sendmail(settings.SMTP_USER, [settings.NOTIFY_EMAIL], msg.as_string())

        logger.info(f"✓ Email sent to {settings.NOTIFY_EMAIL}")

    except smtplib.SMTPAuthenticationError:
        logger.error("✗ SMTP auth failed — use Gmail App Password")
    except Exception as e:
        logger.error(f"✗ Email failed: {e}", exc_info=True)
