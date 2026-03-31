// ── PRICING CAROUSEL — same as skills ─────────────────────
export function initPricingCarousel() {
  const outer   = document.querySelector('.pc-carousel-outer');
  const track   = document.getElementById('pcTrack');
  const dotsEl  = document.getElementById('pcDots');
  const btnPrev = document.getElementById('pcPrev');
  const btnNext = document.getElementById('pcNext');
  if (!track) return;

  const cards = Array.from(track.querySelectorAll('.pc-card'));
  const total = cards.length;
  let current = 1, isDragging = false, startX = 0, startTranslate = 0, currentTranslate = 0;

  cards.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'pc-dot' + (i === 1 ? ' active' : '');
    d.addEventListener('click', () => goTo(i));
    dotsEl.appendChild(d);
  });

  const getCardWidth  = () => cards[0] ? cards[0].offsetWidth + 28 : 328;
  const getOffset     = i => (outer.offsetWidth / 2) - (getCardWidth() * i) - (cards[0].offsetWidth / 2);

  function apply3D() {
    cards.forEach((c, i) => {
      const dist  = i - current;
      const absD  = Math.abs(dist);
      const rotY  = Math.max(-15, Math.min(15, dist * 15));
      const tz    = absD === 0 ? 60 : absD === 1 ? 0 : -40 * (absD - 1);
      const scale = absD === 0 ? 1 : Math.max(0.78, 1 - absD * 0.1);
      c.style.transform = `rotateY(${rotY}deg) translateZ(${tz}px) scale(${scale})`;
    });
  }

  function updateClasses() {
    cards.forEach((c, i) => {
      c.classList.remove('active', 'adjacent');
      if (i === current)                    c.classList.add('active');
      else if (Math.abs(i - current) === 1) c.classList.add('adjacent');
    });
    dotsEl.querySelectorAll('.pc-dot').forEach((d, i) => d.classList.toggle('active', i === current));
    apply3D();
  }

  function goTo(index) {
    current = Math.max(0, Math.min(total - 1, index));
    currentTranslate = getOffset(current);
    track.style.transform = `translateX(${currentTranslate}px)`;
    track.classList.remove('dragging');
    updateClasses();
  }

  goTo(current);
  window.addEventListener('load',   () => goTo(current));
  window.addEventListener('resize', () => goTo(current));
  btnPrev && btnPrev.addEventListener('click', () => goTo(current - 1));
  btnNext && btnNext.addEventListener('click', () => goTo(current + 1));

  document.addEventListener('keydown', e => {
    const section = document.getElementById('pricing');
    if (!section) return;
    const rect = section.getBoundingClientRect();
    if (rect.top > window.innerHeight || rect.bottom < 0) return;
    if (e.key === 'ArrowLeft')  goTo(current - 1);
    if (e.key === 'ArrowRight') goTo(current + 1);
  });

  const dragStart = x => { isDragging = true; startX = x; startTranslate = currentTranslate; track.classList.add('dragging'); };
  const dragMove  = x => {
    if (!isDragging) return;
    const delta = x - startX;
    track.style.transform = `translateX(${startTranslate + delta}px)`;
    const progress = delta / (outer.offsetWidth / 2);
    cards.forEach((c, i) => {
      const dist = i - current;
      const rotY = Math.max(-15, Math.min(15, (dist - progress * 0.5) * 15));
      const tz   = Math.abs(dist) === 0 ? 60 : 0;
      c.style.transform = `rotateY(${rotY}deg) translateZ(${tz}px)`;
    });
  };
  const dragEnd = x => {
    if (!isDragging) return;
    isDragging = false;
    const delta = x - startX;
    goTo(Math.abs(delta) > 60 ? (delta < 0 ? current + 1 : current - 1) : current);
  };

  track.addEventListener('mousedown',  e => dragStart(e.clientX));
  window.addEventListener('mousemove', e => dragMove(e.clientX));
  window.addEventListener('mouseup',   e => dragEnd(e.clientX));
  track.addEventListener('touchstart', e => dragStart(e.touches[0].clientX), { passive: true });
  track.addEventListener('touchmove',  e => dragMove(e.touches[0].clientX),  { passive: true });
  track.addEventListener('touchend',   e => dragEnd(e.changedTouches[0].clientX));
  cards.forEach((c, i) => c.addEventListener('click', () => { if (i !== current) goTo(i); }));
}
