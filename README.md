<div align="center">

# 🚀 Pannel Dhruvesh — Personal Portfolio

### Full-Stack Personal Website · Dark Theme · Cinematic Animations · FastAPI Backend

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_Site-7c3aed?style=for-the-badge)](https://your-site.vercel.app)
[![API Docs](https://img.shields.io/badge/📡_API_Docs-Swagger_UI-009688?style=for-the-badge)](https://your-api.onrender.com/docs)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Python](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat&logo=fastapi&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat&logo=supabase&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat)

</div>

---

## 🌐 Live Demo

| | URL |
|---|---|
| 🖥️ **Frontend** | https://your-site.vercel.app |
| ⚙️ **Backend API** | https://your-api.onrender.com |
| 📖 **Swagger Docs** | https://your-api.onrender.com/docs |

> Replace these with your actual URLs after deployment.

---

## 📸 Preview

> Add a screenshot here after deployment.  
> `![Portfolio Preview](docs/preview.png)`

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎬 Cinematic Intro | Full-screen splash with thunder + glitch entry animation |
| 🖥️ 3D Tech Scene | Animated VS Code editor with keyboard, mouse & wires |
| 🎠 Skills Carousel | 3D perspective card carousel with drag & touch support |
| 📱 Fully Responsive | Mobile, tablet, and desktop — all breakpoints covered |
| 🌌 Animated Background | Canvas-based particles and radial glow system |
| 📬 Contact Form | Client-side validation + FastAPI backend + mailto fallback |
| 💾 Supabase Database | All form submissions saved to PostgreSQL via Supabase |
| 📧 Email Notifications | SMTP Gmail alerts on every new contact submission |
| 🔒 Rate Limiting | 5 requests/minute per IP — prevents spam |
| ⚡ Performance | LCP preloads, deferred scripts, lazy images, capped DPR |

---

## 🧱 Tech Stack

**Frontend**
- HTML5, CSS3, JavaScript (ES Modules)
- [Three.js](https://threejs.org/) — 3D hero particles
- [GSAP](https://greensock.com/gsap/) — scroll animations
- [Font Awesome](https://fontawesome.com/) — icons
- [Devicons CDN](https://devicon.dev/) — tech logos

**Backend**
- [FastAPI](https://fastapi.tiangolo.com/) — Python web framework
- [Pydantic v2](https://docs.pydantic.dev/) — data validation
- [SlowAPI](https://github.com/laurentS/slowapi) — rate limiting
- [python-dotenv](https://pypi.org/project/python-dotenv/) — env management

**Database & Email**
- [Supabase](https://supabase.com/) — PostgreSQL cloud database
- SMTP via Gmail — email notifications

---

## 📁 Project Structure

```
portfolio/
│
├── 📂 frontend/
│   ├── index.html                  # Main entry — loads all sections
│   ├── assets/
│   │   ├── css/style.css           # All styles (tokens, layout, responsive)
│   │   ├── js/main.js              # ES module entry point
│   │   └── images/profile.jpg      # Profile photo
│   ├── sections/                   # HTML partials (loaded dynamically)
│   │   ├── hero.html
│   │   ├── about.html
│   │   ├── skills.html
│   │   ├── projects.html
│   │   └── contact.html
│   ├── components/
│   │   └── footer.html
│   └── js/                         # Feature modules
│       ├── navbar.js               # Scroll + burger menu
│       ├── particles.js            # Three.js hero particles
│       ├── tech-scene.js           # 3D VS Code scene
│       ├── carousel.js             # Skills 3D carousel
│       ├── animations.js           # GSAP scroll animations
│       ├── background.js           # Global canvas background
│       ├── form.js                 # Contact form logic
│       ├── intro.js                # Intro splash screen
│       └── thunder-entry.js        # Thunder + glitch animation
│
├── 📂 backend/
│   ├── app/
│   │   ├── main.py                 # FastAPI app + CORS middleware
│   │   ├── config.py               # Settings loaded from .env
│   │   ├── database.py             # Supabase client
│   │   ├── routes/
│   │   │   └── contact_route.py    # POST /contact endpoint
│   │   ├── schemas/
│   │   │   └── contact_schema.py   # Pydantic v2 input validation
│   │   ├── services/
│   │   │   └── contact_service.py  # DB insert + email notification
│   │   └── utils/
│   │       └── validator.py        # Input sanitization helpers
│   ├── run.py                      # Starts uvicorn server
│   ├── requirements.txt            # Python dependencies
│   └── .env.example                # ← Copy to .env and fill in secrets
│   
├── 📂 database/
│   └── schema.sql                  # Run once in Supabase SQL Editor
│
├── 📂 docs/
│   └── api.md                      # Full API reference
│
├── .gitignore
├── LICENSE
└── README.md
```

---

## ⚙️ Installation & Setup

### Prerequisites

- **Python 3.11+** — [download](https://www.python.org/downloads/)
- **Node.js** (optional, for `npx serve`) — [download](https://nodejs.org/)
- **Supabase account** — [free tier](https://supabase.com)
- **Gmail account** with [App Password](https://myaccount.google.com/apppasswords) enabled

---

### Step 1 — Clone the Repository

```bash
git clone https://github.com/panneldhruvesh2007/your-repo-name.git
cd your-repo-name
```

---

### Step 2 — Database Setup (Supabase)

1. Go to [supabase.com](https://supabase.com) → create a new project
2. Open **SQL Editor** → **New Query**
3. Paste the full contents of `database/schema.sql`
4. Click **Run** — your `contacts` table is ready

---

### Step 3 — Backend Setup

```bash
cd backend

# Create a virtual environment (keeps your system Python clean)
python -m venv venv

# Activate it
venv\Scripts\activate        # Windows
source venv/bin/activate     # Mac / Linux

# Install all dependencies
pip install -r requirements.txt

# Create your environment file
cp .env.example .env
```

Open `.env` and fill in your credentials (see [Environment Variables](#-environment-variables)).

```bash
# Start the backend
python run.py
```

✅ Backend running at: `http://localhost:8000`  
✅ Interactive API docs: `http://localhost:8000/docs`

---

### Step 4 — Frontend Setup

The frontend uses **ES Modules** — it must be served via a local server, not opened as a plain file.

**Option A — VS Code Live Server** *(recommended for beginners)*
1. Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension
2. Right-click `frontend/index.html` → **Open with Live Server**

**Option B — npx serve**
```bash
npx serve frontend
```

> 💡 Make sure the backend is running before testing the contact form.

---

## 🔐 Environment Variables

Create `backend/.env` by copying the example:

```bash
cp backend/.env.example backend/.env
```

Then fill in your values:

```env
# Supabase — Project Settings → API
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_KEY=your-service-role-secret-key

# Gmail SMTP — for contact form email notifications
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your@gmail.com
SMTP_PASS=your-16-char-app-password
NOTIFY_EMAIL=your@gmail.com

# CORS — add your deployed frontend URL for production
ALLOWED_ORIGINS=http://localhost:5500,http://localhost:3000,https://your-site.vercel.app
```

| Variable | Where to get it |
|---|---|
| `SUPABASE_URL` | Supabase → Project Settings → API |
| `SUPABASE_KEY` | Supabase → Project Settings → API → service_role key |
| `SMTP_PASS` | Google Account → Security → App Passwords |
| `ALLOWED_ORIGINS` | Your deployed frontend URL(s), comma-separated |

> ⚠️ **Never commit `.env`** — it's already in `.gitignore`.

> 💡 **Gmail App Password:** Enable 2-Step Verification first, then generate an App Password under Google Account → Security.

---

## 📡 API Reference

Full docs: [`docs/api.md`](docs/api.md) · Interactive: `/docs` (Swagger UI)

### `GET /`
Health check.
```json
{ "status": "ok", "message": "Portfolio API is running" }
```

### `POST /contact`
Submit the contact form. Rate limited to **5 requests/minute per IP**.

**Request body:**
```json
{
  "name":    "Rahul Sharma",
  "email":   "rahul@company.com",
  "phone":   "+91 98765 43210",
  "purpose": "Internship Offer",
  "message": "Hi Dhruvesh, I would like to discuss an opportunity."
}
```

**Responses:**

| Status | Body |
|---|---|
| `200` | `{ "status": "success", "message": "Form submitted successfully" }` |
| `422` | `{ "status": "error", "message": "Validation error details" }` |
| `429` | Rate limit exceeded |
| `500` | `{ "status": "error", "message": "Something went wrong. Please try again." }` |

---

## 🚀 Deployment Guide

### Frontend → Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project** → import your repo
3. Set **Root Directory** to `frontend`
4. Click **Deploy**

### Backend → Render

1. Go to [render.com](https://render.com) → **New Web Service**
2. Connect your GitHub repo
3. Configure:

| Setting | Value |
|---|---|
| Root Directory | `backend` |
| Runtime | `Python 3` |
| Start Command | `python run.py` |

4. Add all your `.env` variables under **Environment**
5. Click **Deploy**

### After Deploying — 2 things to update

**1. Backend URL in `frontend/js/form.js`:**
```js
// Line ~14 — replace with your actual Render URL
return 'https://your-api.onrender.com';
```

**2. CORS in Render environment variables:**
```
ALLOWED_ORIGINS=https://your-site.vercel.app
```

---

## ⚠️ Common Issues & Fixes

**CORS error in browser console**
- Add your frontend URL to `ALLOWED_ORIGINS` in `.env`
- Restart the backend after any `.env` change
- Make sure there are no trailing slashes in the URL

**Contact form shows "Could not send"**
- Confirm backend is running: open `http://localhost:8000` — should return `{"status":"ok"}`
- Check browser DevTools → Network tab for the failed request
- The form automatically falls back to `mailto:` if the backend is unreachable

**Email notifications not arriving**
- `SMTP_PASS` must be a Gmail **App Password** (16 chars), not your regular password
- 2-Step Verification must be enabled on your Google account
- Check your spam folder

**`ModuleNotFoundError` on backend start**
- Run `pip install -r requirements.txt` inside the `backend/` folder
- Make sure your virtual environment is activated

**Frontend sections not loading / blank page**
- You must use a local server — `file://` protocol blocks ES Modules and `fetch()`
- Use VS Code Live Server or `npx serve frontend`

**Supabase insert failing**
- Make sure you ran `database/schema.sql` in Supabase SQL Editor
- Verify `SUPABASE_URL` and `SUPABASE_KEY` are correct (no extra spaces)
- Use the `service_role` key, not the `anon` key

---

## 👨‍💻 Author

<div align="center">

**Pannel Dhruvesh**  
B.Sc. Data Science Student · Gujarat, India

[![GitHub](https://img.shields.io/badge/GitHub-panneldhruvesh2007-181717?style=flat&logo=github)](https://github.com/panneldhruvesh2007)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Dhruvesh_Pannel-0A66C2?style=flat&logo=linkedin)](https://www.linkedin.com/in/dhruvesh-pannel-58940b366)
[![Instagram](https://img.shields.io/badge/Instagram-dhruv__pannel-E4405F?style=flat&logo=instagram)](https://www.instagram.com/dhruv_pannel)

📧 panneldhruvesh2007@gmail.com

</div>

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) — free to use, modify, and distribute with attribution.

---

<div align="center">
Built from scratch · No templates · No frameworks · Just code.
</div>
