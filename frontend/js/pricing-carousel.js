// ── PRICING 3D CAROUSEL — mirrors skills carousel ─────────
export function initPricingCarousel() {
  const outer   = document.querySelector('.pc-carousel-outer');
  const track   = document.getElementById('pcTrack');
  const dotsEl  = document.getElementById('pcDots');
  const btnPrev = document.getElementById('pcPrev');
  const btnNext = document.getElementById('pcNext');
  if (!track) return;

  const cards = Array.from(track.querySelectorAll('.pc-card'));
  const total = cards.length;
  let current = 1; // start on Standard (Most Popular)
  let isDragging = false, startX = 0, startTranslate = 0, currentTranslate = 0;

  // Build dots
  cards.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'pc-dot' + (i === current ? ' active' : '');
    d.addEventListener('click', () => goTo(i));
    dotsEl.appendChild(d);
  });

  const gap = 28;
  const getCardWidth = () => cards[0] ? cards[0].offsetWidth + gap : 348;
  const getOffset = i => {
    const outerW = outer.offsetWidth;
    const cardW  = cards[0] ? cards[0].offsetWidth : 320;
    // Center the active card in the outer container
    return (outerW / 2) - (cardW / 2) - (i * (cardW + gap));
  };

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

  // Wait for layout to settle before first render
  requestAnimationFrame(() => {
    goTo(current);
  });

  window.addEventListener('resize', () => goTo(current));
  btnPrev && btnPrev.addEventListener('click', () => goTo(current - 1));
  btnNext && btnNext.addEventListener('click', () => goTo(current + 1));

  // Drag / swipe
  const dragStart = x => {
    isDragging = true;
    startX = x;
    startTranslate = currentTranslate;
    track.classList.add('dragging');
  };
  const dragMove = x => {
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
    goTo(Math.abs(delta) > 50 ? (delta < 0 ? current + 1 : current - 1) : current);
  };

  track.addEventListener('mousedown',  e => dragStart(e.clientX));
  window.addEventListener('mousemove', e => dragMove(e.clientX));
  window.addEventListener('mouseup',   e => dragEnd(e.clientX));
  track.addEventListener('touchstart', e => dragStart(e.touches[0].clientX), { passive: true });
  track.addEventListener('touchmove',  e => dragMove(e.touches[0].clientX),  { passive: true });
  track.addEventListener('touchend',   e => dragEnd(e.changedTouches[0].clientX));
  cards.forEach((c, i) => c.addEventListener('click', () => { if (i !== current) goTo(i); }));
}
