import re
import html

def sanitize(value: str) -> str:
    """Strip leading/trailing whitespace and escape HTML special chars."""
    return html.escape(value.strip())

def is_valid_email(email: str) -> bool:
    pattern = r"^[^\s@]+@[^\s@]+\.[^\s@]+$"
    return bool(re.match(pattern, email, re.IGNORECASE))

def is_valid_phone(phone: str) -> bool:
    return len(re.sub(r"\D", "", phone)) >= 10
