<div align="center">

# 🌐 Pannel Dhruvesh — Personal Website

### Full-Stack Portfolio | Developer & Data Science Student

[![Live Site](https://img.shields.io/badge/Live%20Site-Vercel-black?style=for-the-badge&logo=vercel)](https://pannel-dhruvesh-personal-website.vercel.app)
[![Backend API](https://img.shields.io/badge/Backend%20API-Render-46E3B7?style=for-the-badge&logo=render)](https://pannel-backend.onrender.com)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

> A modern, fully deployed full-stack personal portfolio with 3D animations, a secure contact system, email notifications, and Supabase database integration.

**[🚀 View Live Site](https://pannel-dhruvesh-personal-website.vercel.app)** · **[📡 API Status](https://pannel-backend.onrender.com)**

</div>

---

## 📸 Preview

> Visit the live site: [pannel-dhruvesh-personal-website.vercel.app](https://pannel-dhruvesh-personal-website.vercel.app)

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎨 Modern UI/UX | Glassmorphism, gradients, smooth transitions |
| 📱 Fully Responsive | Works on all screen sizes |
| 🌌 3D Animations | Three.js powered background + GSAP scroll animations |
| ⚡ Intro Screen | Cinematic entry animation with particle effects |
| 📬 Contact Form | Full backend integration with validation |
| 📧 Email Notifications | Instant email via EmailJS on every submission |
| 🗄️ Supabase Database | All contact submissions saved to cloud database |
| 🔒 Secure API | Rate limiting, CORS, input sanitization, security headers |
| 🚀 Production Deployed | Vercel (frontend) + Render (backend) |

---

## 📁 Project Structure

```
pannel-dhruvesh-personal-website/
├── frontend/
│   ├── index.html              # Main HTML entry point
│   ├── assets/
│   │   ├── css/style.css       # Global styles
│   │   ├── js/main.js          # JS entry point
│   │   └── images/             # Profile photo, assets
│   ├── sections/               # HTML section partials
│   │   ├── hero.html
│   │   ├── about.html
│   │   ├── skills.html
│   │   ├── projects.html
│   │   └── contact.html
│   ├── js/                     # Feature JS modules
│   │   ├── form.js             # Contact form + EmailJS
│   │   ├── animations.js
│   │   ├── navbar.js
│   │   ├── particles.js
│   │   └── ...
│   └── components/
│       └── footer.html
├── backend/
│   ├── app/
│   │   ├── main.py             # FastAPI app + middleware
│   │   ├── config.py           # Settings + env vars
│   │   ├── database.py         # Supabase client
│   │   ├── routes/
│   │   │   └── contact_route.py
│   │   ├── schemas/
│   │   │   └── contact_schema.py
│   │   ├── services/
│   │   │   └── contact_service.py
│   │   └── utils/
│   │       └── validator.py
│   ├── run.py                  # Uvicorn entry point
│   ├── requirements.txt
│   └── .env.example
├── database/
│   └── schema.sql              # Supabase table schema
├── docs/
│   └── api.md                  # Full API documentation
├── README.md
└── LICENSE
```

---

## ⚙️ Local Setup

### Prerequisites
- Python 3.10+
- A Supabase account
- A Gmail account with App Password enabled

### 1. Clone the repo

```bash
git clone https://github.com/panneldhruvesh2007/pannel-dhruvesh-personal-website.git
cd pannel-dhruvesh-personal-website
```

### 2. Backend setup

```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
# Fill in your .env values (see below)
python run.py
```

Backend runs at `http://localhost:8000`

### 3. Frontend setup

No build step needed. Open `frontend/index.html` with VS Code Live Server or any static server.

> 💡 Tip: Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) VS Code extension and right-click `index.html` → "Open with Live Server"

---

## 🔐 Environment Variables

Create a `.env` file inside the `backend/` folder. Use `.env.example` as a template.

```env
# ── Supabase ──────────────────────────────────────────────
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-service-role-key

# ── SMTP (Gmail) ──────────────────────────────────────────
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your@gmail.com
SMTP_PASS=your-gmail-app-password   # NOT your regular password

# ── CORS ──────────────────────────────────────────────────
ALLOWED_ORIGINS=https://your-frontend.vercel.app
```

| Variable | Required | Description |
|---|---|---|
| `SUPABASE_URL` | ✅ | Your Supabase project URL |
| `SUPABASE_KEY` | ✅ | Service role key (not anon key) |
| `SMTP_HOST` | ✅ | `smtp.gmail.com` |
| `SMTP_PORT` | ✅ | `587` (STARTTLS) or `465` (SSL) |
| `SMTP_USER` | ✅ | Your Gmail address |
| `SMTP_PASS` | ✅ | Gmail App Password |
| `NOTIFY_EMAIL` | ✅ | Email to receive notifications |
| `ALLOWED_ORIGINS` | ✅ | Comma-separated allowed frontend URLs |

> ⚠️ Never commit your `.env` file. It's in `.gitignore` by default.

---

## 📡 API Documentation

See full API reference: **[docs/api.md](docs/api.md)**

### Quick Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | API status check |
| `GET` | `/health` | Health check |
| `POST` | `/contact` | Submit contact form |

**POST /contact — Request body:**
```json
{
  "name": "Rahul Sharma",
  "email": "rahul@example.com",
  "phone": "9876543210",
  "purpose": "Internship Offer",
  "message": "Hello, I'd like to connect."
}
```

**Response:**
```json
{ "status": "success", "message": "Form submitted successfully" }
```

---

## 🚀 Deployment Guide

### Frontend → Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → Import your repo
3. Set **Root Directory** to `frontend`
4. Leave build command empty (static site)
5. Click **Deploy**

### Backend → Render

1. Go to [render.com](https://render.com) → New Web Service
2. Connect your GitHub repo
3. Set **Root Directory** to `backend`
4. Set **Start Command** to `python run.py`
5. Add all environment variables from your `.env`
6. Click **Deploy**

> 💡 Render free tier spins down after inactivity — first request may take 30–50 seconds to wake up.

---

## 🔐 Security Features

- **Rate Limiting** — `/contact` limited to 5 requests/minute per IP
- **Input Validation** — Pydantic schema with max lengths and whitelist for `purpose`
- **Input Sanitization** — HTML escaping on all user input before DB insert
- **CORS Protection** — Restricted to your Vercel domain only
- **Security Headers** — `X-Frame-Options`, `X-Content-Type-Options`, `X-XSS-Protection`, `Referrer-Policy`
- **No Docs Exposure** — `/docs` and `/redoc` disabled in production
- **Generic Error Messages** — Internal errors never leaked to client
- **Env Secrets** — All credentials stored server-side only, never in frontend code

---

## ⚠️ Common Issues

**CORS error in browser console**
- Make sure `ALLOWED_ORIGINS` in Render env vars matches your exact Vercel URL (no trailing slash)

**Email not sending**
- EmailJS handles email from the browser — check your EmailJS dashboard for send logs
- Backend SMTP is blocked on Render free tier (expected — EmailJS is the primary email method)

**API not connecting / form timeout**
- Render free tier sleeps after inactivity — open `https://pannel-backend.onrender.com/health` first to wake it up
- The form has a 60-second timeout to handle cold starts

**Supabase not saving**
- Verify `SUPABASE_KEY` is the **service_role** key, not the anon key
- Check RLS policies on your `contacts` table in Supabase dashboard

---

## 👨‍💻 Author

**Pannel Dhruvesh**
- 🎓 B.Sc. Data Science Student
- 📍 Gujarat, India
- 🌐 [pannel-dhruvesh-personal-website.vercel.app](https://pannel-dhruvesh-personal-website.vercel.app)
- 💼 [LinkedIn](https://www.linkedin.com/in/dhruvesh-pannel-58940b366)
- 🐙 [GitHub](https://github.com/panneldhruvesh2007)
- 📸 [Instagram](https://www.instagram.com/dhruv_pannel)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">

Made with ❤️ by Pannel Dhruvesh

⭐ Star this repo if you found it helpful!

</div>
