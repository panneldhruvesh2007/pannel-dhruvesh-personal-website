# API Documentation

Base URL: `http://localhost:8000`

---

## GET /
Health check.

**Response**
```json
{ "status": "ok", "message": "Portfolio API is running" }
```

---

## POST /contact
Submit a contact form.

**Rate limit:** 5 requests/minute per IP

**Request body**
```json
{
  "name":    "Rahul Sharma",
  "email":   "rahul@company.com",
  "phone":   "+91 98765 43210",
  "purpose": "Internship Offer",
  "message": "Hi Pannel, I'd like to discuss an opportunity."
}
```

**Success response** `200`
```json
{ "status": "success", "message": "Form submitted successfully" }
```

**Validation error** `422`
```json
{ "status": "error", "message": "Phone must have at least 10 digits" }
```

**Server error** `500`
```json
{ "status": "error", "message": "Something went wrong. Please try again." }
```

---

## Interactive Docs
Swagger UI: `http://localhost:8000/docs`
ReDoc:       `http://localhost:8000/redoc`
