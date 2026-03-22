// ── CONTACT FORM ───────────────────────────────────────────
// EmailJS (optional) — fill in your IDs from emailjs.com
const EMAILJS_SERVICE_ID  = 'service_ag2vv99';
const EMAILJS_TEMPLATE_ID = 'template_h007dew';
const EMAILJS_PUBLIC_KEY  = 'dVLVlpoZjs5-mOdVj';

// Backend URL — always points to Render (works both locally and in production)
const BACKEND_URL = 'https://pannel-backend.onrender.com/contact';

// Fetch with timeout helper
function fetchWithTimeout(url, options, ms = 8000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), ms);
  return fetch(url, { ...options, signal: controller.signal })
    .finally(() => clearTimeout(id));
}

export function initForm() {
  const form  = document.getElementById('contactForm');
  const toast = document.getElementById('toast');
  if (!form) return;

  const rules = {
    name:    v => v.trim().length < 2                        ? 'Name must be at least 2 characters' : '',
    email:   v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)      ? '' : 'Enter a valid email',
    phone:   v => v.replace(/\D/g,'').length < 10            ? 'Enter a valid phone number' : '',
    purpose: v => !v                                         ? 'Please select a purpose' : '',
    message: v => v.trim().length < 10                       ? 'Message must be at least 10 characters' : '',
  };

  function validate(field) {
    const fg  = field.closest('.fg');
    const err = fg?.querySelector('.ferr');
    if (!fg || !err) return true;
    const msg = rules[field.name] ? rules[field.name](field.value) : '';
    if (msg) {
      fg.classList.add('err');
      err.textContent = msg;
      try { gsap.fromTo(fg, { x: -8 }, { x: 0, duration: .4, ease: 'elastic.out(1,.3)' }); } catch(e){}
      return false;
    }
    fg.classList.remove('err');
    err.textContent = '';
    return true;
  }

  form.querySelectorAll('input,select,textarea').forEach(f => {
    f.addEventListener('blur',  () => validate(f));
    f.addEventListener('input', () => { if (f.closest('.fg')?.classList.contains('err')) validate(f); });
  });

  form.addEventListener('submit', async e => {
    e.preventDefault();

    // Validate all fields
    let ok = true;
    form.querySelectorAll('input,select,textarea').forEach(f => { if (!validate(f)) ok = false; });
    if (!ok) return;

    const btn = form.querySelector('button[type="submit"]');
    const originalHTML = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

    const data = Object.fromEntries(new FormData(form));

    // ── Fire backend (Supabase) + EmailJS in parallel ─────
    const emailjsReady = typeof emailjs !== 'undefined'
      && EMAILJS_SERVICE_ID  !== 'YOUR_SERVICE_ID'
      && EMAILJS_TEMPLATE_ID !== 'YOUR_TEMPLATE_ID'
      && EMAILJS_PUBLIC_KEY  !== 'YOUR_PUBLIC_KEY';

    // Always try backend for Supabase save (non-blocking)
    const backendPromise = fetchWithTimeout(BACKEND_URL, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(data),
    }, 60000).catch(err => console.warn('Backend error:', err));

    // Always try EmailJS for email notification (non-blocking)
    const emailPromise = emailjsReady
      ? emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
          from_name:  data.name,
          from_email: data.email,
          phone:      data.phone,
          purpose:    data.purpose,
          message:    data.message,
        }).catch(err => console.warn('EmailJS error:', err))
      : Promise.resolve();

    // Wait for both
    await Promise.all([backendPromise, emailPromise]);
    showSuccess();

    function showSuccess() {
      btn.disabled  = false;
      btn.innerHTML = originalHTML;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 4000);
      form.reset();
    }

    function showError(msg) {
      const errEl = form.querySelector('.form-global-err') || (() => {
        const d = document.createElement('p');
        d.className = 'form-global-err';
        d.style.cssText = 'color:#f87171;font-size:.85rem;margin-top:.5rem;text-align:center';
        form.appendChild(d);
        return d;
      })();
      errEl.textContent = msg;
      setTimeout(() => { errEl.textContent = ''; }, 6000);
    }
  });
}
