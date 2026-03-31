from pydantic import BaseModel, EmailStr, field_validator
from typing import Literal
import re

ALLOWED_PURPOSES = {
    "Internship Offer", "Freelance Project",
    "Research Collaboration", "Job Opportunity", "Just Saying Hi"
}

class ContactSchema(BaseModel):
    name:    str
    email:   EmailStr
    phone:   str
    purpose: str
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

    @field_validator("purpose")
    @classmethod
    def purpose_valid(cls, v: str) -> str:
        v = v.strip()
        if v not in ALLOWED_PURPOSES:
            raise ValueError("Invalid purpose")
        return v

    @field_validator("message")
    @classmethod
    def message_valid(cls, v: str) -> str:
        v = v.strip()
        if len(v) < 10 or len(v) > 2000:
            raise ValueError("Message must be 10–2000 characters")
        return v
