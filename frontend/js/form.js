// ── CONTACT FORM ───────────────────────────────────────────
<<<<<<< HEAD
const EMAILJS_SERVICE_ID  = 'service_ag2vv99';
const EMAILJS_TEMPLATE_ID = 'template_h007dew';
const EMAILJS_PUBLIC_KEY  = 'dVLVlpoZjs5-mOdVj';
const BACKEND_URL = 'https://pannel-backend.onrender.com/contact';
const WA_NUMBER   = '919624395363';

function fetchWithTimeout(url, options, ms = 8000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), ms);
  return fetch(url, { ...options, signal: controller.signal }).finally(() => clearTimeout(id));
}

// Called by pricing card buttons
window.selectPlan = function(btn) {
  const card = btn.closest('.price-card');
  const plan = card?.dataset.plan || '';

  // Highlight selected card
  document.querySelectorAll('.price-card').forEach(c => c.classList.remove('selected'));
  card?.classList.add('selected');

  // Auto-fill plan in form
  const planSelect = document.getElementById('cf-plan');
  if (planSelect) {
    for (let opt of planSelect.options) {
      if (opt.value === plan) { planSelect.value = plan; break; }
    }
  }

  // Smooth scroll to contact
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

=======
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

>>>>>>> 4a3b23a4d9e09bfedc9a84c8ec160adcf544c756
export function initForm() {
  const form  = document.getElementById('contactForm');
  const toast = document.getElementById('toast');
  if (!form) return;

  const rules = {
<<<<<<< HEAD
    name:    v => v.trim().length < 2                   ? 'Name must be at least 2 characters' : '',
    phone:   v => v.replace(/\D/g,'').length < 10       ? 'Enter a valid phone number' : '',
    message: v => v.trim().length < 10                  ? 'Message must be at least 10 characters' : '',
=======
    name:    v => v.trim().length < 2                        ? 'Name must be at least 2 characters' : '',
    email:   v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)      ? '' : 'Enter a valid email',
    phone:   v => v.replace(/\D/g,'').length < 10            ? 'Enter a valid phone number' : '',
    purpose: v => !v                                         ? 'Please select a purpose' : '',
    message: v => v.trim().length < 10                       ? 'Message must be at least 10 characters' : '',
>>>>>>> 4a3b23a4d9e09bfedc9a84c8ec160adcf544c756
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

<<<<<<< HEAD
    let ok = true;
    form.querySelectorAll('input[required],textarea[required]').forEach(f => { if (!validate(f)) ok = false; });
=======
    // Validate all fields
    let ok = true;
    form.querySelectorAll('input,select,textarea').forEach(f => { if (!validate(f)) ok = false; });
>>>>>>> 4a3b23a4d9e09bfedc9a84c8ec160adcf544c756
    if (!ok) return;

    const btn = form.querySelector('button[type="submit"]');
    const originalHTML = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

    const data = Object.fromEntries(new FormData(form));
<<<<<<< HEAD
    const selectedPlan = data.plan || 'Not specified';

    // Fire backend + EmailJS in parallel (non-blocking)
    const emailjsReady = typeof emailjs !== 'undefined';
=======

    // ── Fire backend (Supabase) + EmailJS in parallel ─────
    const emailjsReady = typeof emailjs !== 'undefined'
      && EMAILJS_SERVICE_ID  !== 'YOUR_SERVICE_ID'
      && EMAILJS_TEMPLATE_ID !== 'YOUR_TEMPLATE_ID'
      && EMAILJS_PUBLIC_KEY  !== 'YOUR_PUBLIC_KEY';

    // Always try backend for Supabase save (non-blocking)
>>>>>>> 4a3b23a4d9e09bfedc9a84c8ec160adcf544c756
    const backendPromise = fetchWithTimeout(BACKEND_URL, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(data),
    }, 60000).catch(() => {});

<<<<<<< HEAD
    const emailPromise = emailjsReady
      ? emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
          from_name:  data.name,
          from_email: data.email || 'Not provided',
          phone:      data.phone,
          plan:       selectedPlan,
=======
    // Always try EmailJS for email notification (non-blocking)
    const emailPromise = emailjsReady
      ? emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
          from_name:  data.name,
          from_email: data.email,
          phone:      data.phone,
          purpose:    data.purpose,
>>>>>>> 4a3b23a4d9e09bfedc9a84c8ec160adcf544c756
          message:    data.message,
        }).catch(() => {})
      : Promise.resolve();

<<<<<<< HEAD
    await Promise.all([backendPromise, emailPromise]);

    btn.disabled  = false;
    btn.innerHTML = originalHTML;

    // Show success toast
    if (toast) {
      toast.querySelector('span').textContent = 'We will contact you soon!';
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 3500);
    }

    form.reset();

    // Redirect to WhatsApp after short delay
    setTimeout(() => {
      const msg = encodeURIComponent(`Hi Dhruvesh! I want the ${selectedPlan} for my website.\n\nName: ${data.name}\nPhone: ${data.phone}\n\nDetails: ${data.message}`);
      window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank');
    }, 1500);
=======
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
>>>>>>> 4a3b23a4d9e09bfedc9a84c8ec160adcf544c756
  });
}
