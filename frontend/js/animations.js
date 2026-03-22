// ── GSAP SCROLL ANIMATIONS + AOS ──────────────────────────
export function initAnimations() {
  // Scroll progress bar
  const scrollBar = document.getElementById('scrollBar');
  window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
    scrollBar.style.width = pct + '%';
  });

  // Hero parallax
  window.addEventListener('scroll', () => {
    const s  = window.scrollY;
    const hc = document.querySelector('.hero-content');
    if (hc && s < innerHeight) {
      hc.style.transform = `translateY(${s * .28}px)`;
      hc.style.opacity   = String(1 - s / 650);
    }
  });

  // AOS fallback
  document.querySelectorAll('[data-aos]').forEach(el => {
    const delay = parseInt(el.dataset.aosDelay || 0);
    setTimeout(() => el.classList.add('aos-animate'), delay + 100);
  });

  // GSAP
  try {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to('.hero-bg-img', {
      yPercent: 20, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
    });
    gsap.utils.toArray('.about-grid, .proj-grid, .contact-grid').forEach(el => {
      gsap.from(el.children, {
        opacity: 0, y: 60, stagger: .15, duration: .9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 82%' }
      });
    });
    document.querySelectorAll('.proj-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width  - .5;
        const y = (e.clientY - r.top)  / r.height - .5;
        gsap.to(card, { rotationY: x*10, rotationX: -y*10, transformPerspective: 1000, duration: .4, ease: 'power2.out' });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { rotationY: 0, rotationX: 0, duration: .5, ease: 'power2.out' });
      });
    });
  } catch (e) { console.warn('GSAP failed:', e); }
}
