// ── INTRO SPLASH SCREEN ───────────────────────────────────
export function initIntro() {
  return new Promise(resolve => {
    const el = document.getElementById('introScreen');
    if (!el) { resolve(); return; }

    document.body.style.overflow = 'hidden';

    // ── Parallax on bg photo ──────────────────────────────
    const photo = document.getElementById('isPhoto');
    document.addEventListener('mousemove', e => {
      if (!photo) return;
      const x = (e.clientX / window.innerWidth  - 0.5) * 18;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      photo.style.transform = `scale(1.08) translate(${x}px, ${y}px)`;
    }, { passive: true });

    // ── Particle canvas ───────────────────────────────────
    const canvas = document.getElementById('isCanvas');
    const ctx    = canvas.getContext('2d');
    let W, H;
    const particles = [];

    function resize() {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    // seed particles
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * 1440,
        y: Math.random() * 900,
        r: 0.6 + Math.random() * 1.8,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -0.2 - Math.random() * 0.5,
        alpha: 0.2 + Math.random() * 0.5,
        color: Math.random() > 0.5 ? '#a78bfa' : '#22d3ee',
      });
    }

    let rafId;
    function drawParticles() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.y < -4) { p.y = H + 4; p.x = Math.random() * W; }
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle   = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur  = 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      rafId = requestAnimationFrame(drawParticles);
    }
    drawParticles();

    // ── Staggered text animations ─────────────────────────
    const welcome  = document.getElementById('isWelcome');
    const nameWrap = document.getElementById('isNameWrap');
    const sub      = document.getElementById('isSub');
    const btn      = document.getElementById('isEnterBtn');
    const hint     = document.getElementById('isHint');

    // classes added via CSS keyframes — just toggle them in sequence
    setTimeout(() => welcome  && welcome.classList.add('is-anim'),  100);
    setTimeout(() => nameWrap && nameWrap.classList.add('is-anim'), 400);
    setTimeout(() => sub      && sub.classList.add('is-anim'),      700);
    setTimeout(() => btn      && btn.classList.add('is-anim'),      950);
    setTimeout(() => hint     && hint.classList.add('is-anim'),    1150);

    // ── Dismiss with thunder + glitch blast ──────────────
    let dismissed = false;
    function dismiss() {
      if (dismissed) return;
      dismissed = true;
      cancelAnimationFrame(rafId);

      // ── 1. Draw thunder bolt on a canvas ─────────────
      const tCanvas = document.createElement('canvas');
      tCanvas.id = 'thunderCanvas';
      tCanvas.width  = window.innerWidth;
      tCanvas.height = window.innerHeight;
      document.body.appendChild(tCanvas);
      const tc = tCanvas.getContext('2d');

      // generate jagged lightning path top→bottom
      function makeBolt(x, y0, y1) {
        const pts = [{ x, y: y0 }];
        const steps = 18;
        for (let i = 1; i < steps; i++) {
          const t = i / steps;
          pts.push({
            x: x + (Math.random() - 0.5) * 120,
            y: y0 + (y1 - y0) * t,
          });
        }
        pts.push({ x, y: y1 });
        return pts;
      }

      function drawBolt(pts, alpha, width, color) {
        tc.save();
        tc.globalAlpha   = alpha;
        tc.strokeStyle   = color;
        tc.lineWidth     = width;
        tc.shadowColor   = color;
        tc.shadowBlur    = 28;
        tc.lineJoin      = 'round';
        tc.lineCap       = 'round';
        tc.beginPath();
        tc.moveTo(pts[0].x, pts[0].y);
        pts.slice(1).forEach(p => tc.lineTo(p.x, p.y));
        tc.stroke();
        // branch
        const mid = pts[Math.floor(pts.length / 2)];
        tc.beginPath();
        tc.moveTo(mid.x, mid.y);
        let bx = mid.x, by = mid.y;
        for (let i = 0; i < 6; i++) {
          bx += (Math.random() - 0.3) * 50;
          by += 40 + Math.random() * 30;
          tc.lineTo(bx, by);
        }
        tc.stroke();
        tc.restore();
      }

      // multiple bolts across screen
      const boltXs = [
        window.innerWidth * 0.25,
        window.innerWidth * 0.5,
        window.innerWidth * 0.75,
      ];

      let flashCount = 0;
      const maxFlash = 4;

      function thunderFlash() {
        tc.clearRect(0, 0, tCanvas.width, tCanvas.height);

        // screen flash bg
        tc.save();
        tc.fillStyle = `rgba(167,139,250,${0.08 + Math.random() * 0.12})`;
        tc.fillRect(0, 0, tCanvas.width, tCanvas.height);
        tc.restore();

        boltXs.forEach((bx, i) => {
          if (Math.random() > 0.4) {
            const pts = makeBolt(bx + (Math.random()-0.5)*60, -10, tCanvas.height + 10);
            drawBolt(pts, 0.7 + Math.random()*0.3, 2 + Math.random()*2, '#c4b5fd');
            drawBolt(pts, 0.4, 6, 'rgba(124,58,237,0.5)');
          }
        });

        flashCount++;
        if (flashCount < maxFlash) {
          setTimeout(thunderFlash, 60 + Math.random() * 60);
        } else {
          // ── 2. After thunder: purple glitch blast ──────
          setTimeout(() => {
            tCanvas.remove();
            const glitch = document.createElement('div');
            glitch.id = 'glitchOverlay';
            document.body.appendChild(glitch);

            const frames = [
              { bg: 'rgba(124,58,237,0.4)',  skew: 'skewX(-5deg) scaleY(1.02)', delay: 0   },
              { bg: 'rgba(124,58,237,0.85)', skew: 'skewX(4deg)  scaleY(0.98)', delay: 55  },
              { bg: 'rgba(109,40,217,0.95)', skew: 'skewX(-7deg) scaleY(1.03)', delay: 100 },
              { bg: 'rgba(167,139,250,1)',   skew: 'skewX(0deg)  scaleY(1)',    delay: 150 },
              { bg: 'rgba(124,58,237,0.9)',  skew: 'skewX(5deg)  scaleY(0.99)', delay: 195 },
              { bg: 'rgba(91,33,182,1)',     skew: 'skewX(0deg)  scaleY(1)',    delay: 240 },
            ];
            frames.forEach(f => {
              setTimeout(() => {
                glitch.style.background = f.bg;
                glitch.style.transform  = f.skew;
                glitch.style.opacity    = '1';
              }, f.delay);
            });

            setTimeout(() => {
              el.remove();
              document.body.style.overflow = '';
              glitch.style.transition = 'opacity .35s ease';
              glitch.style.opacity    = '0';
              glitch.addEventListener('transitionend', () => glitch.remove(), { once: true });
              resolve();
            }, 340);
          }, 80);
        }
      }

      thunderFlash();
    }

    btn && btn.addEventListener('click', e => { e.stopPropagation(); dismiss(); });
    document.addEventListener('keydown', e => { if (e.key === 'Enter') dismiss(); }, { once: true });
  });
}
