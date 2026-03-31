// ── GLOBAL ANIMATED BACKGROUND ────────────────────────────
export function initBackground() {
  const canvas = document.getElementById('globalBg');
  const ctx    = canvas.getContext('2d');
  let W, H, scrollY = 0;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener('scroll', () => { scrollY = window.scrollY; }, { passive: true });

  const TOTAL_H = window.innerHeight * 8;
  const particles = Array.from({ length: 180 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * TOTAL_H,
    r: Math.random() * 2 + 0.5,
    vx: (Math.random() - 0.5) * 0.2,
    vy: (Math.random() - 0.5) * 0.15,
    o: Math.random() * 0.6 + 0.2,
    color: Math.random() > 0.5 ? '167,139,250' : '34,211,238'
  }));

  const glows = [
    { nx: 0.15, ny: 0.05, r: 0.55, c: '124,58,237',  sp: 0.0004, ph: 0   },
    { nx: 0.80, ny: 0.18, r: 0.45, c: '6,182,212',   sp: 0.0003, ph: 1.5 },
    { nx: 0.40, ny: 0.38, r: 0.60, c: '124,58,237',  sp: 0.0005, ph: 2.8 },
    { nx: 0.10, ny: 0.55, r: 0.50, c: '34,211,238',  sp: 0.0003, ph: 0.9 },
    { nx: 0.75, ny: 0.70, r: 0.55, c: '167,139,250', sp: 0.0004, ph: 3.5 },
    { nx: 0.45, ny: 0.88, r: 0.48, c: '124,58,237',  sp: 0.0003, ph: 1.8 },
  ];

  let t = 0;
  function draw() {
    t++;
    ctx.clearRect(0, 0, W, H);
    const parallax = scrollY * 0.25;
    const VH = H * 8;

    glows.forEach(g => {
      const drift = Math.sin(t * g.sp * 500 + g.ph) * 0.07;
      const cx = (g.nx + drift) * W;
      const cy = g.ny * VH - parallax;
      if (cy < -H || cy > H * 2) return;
      const radius = g.r * Math.max(W, H);
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      grad.addColorStop(0,   `rgba(${g.c}, 0.22)`);
      grad.addColorStop(0.4, `rgba(${g.c}, 0.10)`);
      grad.addColorStop(1,   `rgba(${g.c}, 0)`);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();
    });

    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W;  if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = VH; if (p.y > VH) p.y = 0;
      const screenY = p.y - parallax;
      if (screenY < -10 || screenY > H + 10) return;
      const pulse = 0.65 + 0.35 * Math.sin(t * 0.025 + p.x * 0.01);
      ctx.beginPath();
      ctx.arc(p.x, screenY, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color}, ${p.o * pulse})`;
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }
  draw();
}
