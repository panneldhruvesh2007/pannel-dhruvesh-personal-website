from pydantic import BaseModel, EmailStr, field_validator
import re

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
        if len(v) < 2:
            raise ValueError("Name must be at least 2 characters")
        return v

    @field_validator("phone")
    @classmethod
    def phone_valid(cls, v: str) -> str:
        if len(re.sub(r"\D", "", v)) < 10:
            raise ValueError("Phone must have at least 10 digits")
        return v.strip()

    @field_validator("purpose")
    @classmethod
    def purpose_valid(cls, v: str) -> str:
        if not v.strip():
            raise ValueError("Purpose is required")
        return v.strip()

    @field_validator("message")
    @classmethod
    def message_valid(cls, v: str) -> str:
        v = v.strip()
        if len(v) < 10:
            raise ValueError("Message must be at least 10 characters")
        return v
