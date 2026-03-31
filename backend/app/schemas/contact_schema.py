from pydantic import BaseModel, field_validator
from typing import Optional
import re

class ContactSchema(BaseModel):
    name:    str
    phone:   str
    email:   Optional[str] = ""
    plan:    Optional[str] = "Not specified"
    message: str

    @field_validator("name")
    @classmethod
    def name_valid(cls, v: str) -> str:
        v = v.strip()
        if len(v) < 2 or len(v) > 100:
            raise ValueError("Name must be 2–100 characters")
        return v

    @field_validator("phone")
    @classmethod
    def phone_valid(cls, v: str) -> str:
        if len(re.sub(r"\D", "", v)) < 10:
            raise ValueError("Phone must have at least 10 digits")
        if len(v) > 20:
            raise ValueError("Phone too long")
        return v.strip()

    @field_validator("email")
    @classmethod
    def email_valid(cls, v: str) -> str:
        if not v:
            return ""
        v = v.strip()
        if len(v) > 200:
            raise ValueError("Email too long")
        return v

    @field_validator("plan")
    @classmethod
    def plan_valid(cls, v: str) -> str:
        return v.strip()[:100] if v else "Not specified"

    @field_validator("message")
    @classmethod
    def message_valid(cls, v: str) -> str:
        v = v.strip()
        if len(v) < 10 or len(v) > 2000:
            raise ValueError("Message must be 10–2000 characters")
        return v
