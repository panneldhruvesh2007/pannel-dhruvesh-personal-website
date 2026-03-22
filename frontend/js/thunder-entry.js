// ── THUNDER ENTRY — plays after intro dismisses ───────────
export function thunderEntry() {
  return new Promise(resolve => {
    const W = window.innerWidth;
    const H = window.innerHeight;

    // ── canvas ────────────────────────────────────────────
    const tc = document.createElement('canvas');
    tc.id = 'thunderEntryCanvas';
    tc.width = W; tc.height = H;
    document.body.appendChild(tc);
    const ctx = tc.getContext('2d');

    // ── bolt generator ────────────────────────────────────
    function makeBolt(startX) {
      const pts = [{ x: startX, y: -10 }];
      const steps = 20;
      for (let i = 1; i < steps; i++) {
        pts.push({
          x: startX + (Math.random() - 0.5) * 140,
          y: (H + 20) * (i / steps),
        });
      }
      pts.push({ x: startX, y: H + 10 });
      return pts;
    }

    function drawBolt(pts, alpha, width, color, blur) {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = color;
      ctx.lineWidth   = width;
      ctx.shadowColor = color;
      ctx.shadowBlur  = blur;
      ctx.lineJoin    = 'round';
      ctx.lineCap     = 'round';
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      pts.slice(1).forEach(p => ctx.lineTo(p.x, p.y));
      ctx.stroke();
      // branch off midpoint
      const mid = pts[Math.floor(pts.length * 0.45)];
      ctx.beginPath();
      ctx.moveTo(mid.x, mid.y);
      let bx = mid.x, by = mid.y;
      for (let i = 0; i < 7; i++) {
        bx += (Math.random() - 0.35) * 55;
        by += 35 + Math.random() * 35;
        ctx.lineTo(bx, by);
      }
      ctx.stroke();
      ctx.restore();
    }

    const boltXs = [W * 0.2, W * 0.5, W * 0.78];
    let flashCount = 0;
    const maxFlash = 5;

    function flash() {
      ctx.clearRect(0, 0, W, H);

      // ambient purple screen flash
      ctx.save();
      ctx.fillStyle = `rgba(124,58,237,${0.06 + Math.random() * 0.14})`;
      ctx.fillRect(0, 0, W, H);
      ctx.restore();

      boltXs.forEach(bx => {
        if (Math.random() > 0.35) {
          const pts = makeBolt(bx + (Math.random() - 0.5) * 80);
          // glow layer
          drawBolt(pts, 0.35, 8,   'rgba(124,58,237,0.5)', 40);
          // core
          drawBolt(pts, 0.85, 1.5, '#e9d5ff', 18);
          // bright center
          drawBolt(pts, 0.5,  0.5, '#fff',    6);
        }
      });

      flashCount++;
      if (flashCount < maxFlash) {
        setTimeout(flash, 55 + Math.random() * 65);
      } else {
        // ── purple glitch blast ───────────────────────────
        setTimeout(() => {
          tc.remove();

          const glitch = document.createElement('div');
          glitch.id = 'glitchOverlay';
          document.body.appendChild(glitch);

          const frames = [
            { bg: 'rgba(124,58,237,0.45)', skew: 'skewX(-6deg) scaleY(1.02)', delay: 0   },
            { bg: 'rgba(124,58,237,0.88)', skew: 'skewX(5deg)  scaleY(0.98)', delay: 55  },
            { bg: 'rgba(109,40,217,0.96)', skew: 'skewX(-8deg) scaleY(1.03)', delay: 105 },
            { bg: 'rgba(167,139,250,1)',   skew: 'skewX(0deg)  scaleY(1)',    delay: 155 },
            { bg: 'rgba(124,58,237,0.92)', skew: 'skewX(6deg)  scaleY(0.99)', delay: 200 },
            { bg: 'rgba(91,33,182,1)',     skew: 'skewX(0deg)  scaleY(1)',    delay: 245 },
          ];

          frames.forEach(f => {
            setTimeout(() => {
              glitch.style.background = f.bg;
              glitch.style.transform  = f.skew;
              glitch.style.opacity    = '1';
            }, f.delay);
          });

          // fade out → site fully visible
          setTimeout(() => {
            glitch.style.transition = 'opacity .4s ease';
            glitch.style.opacity    = '0';
            glitch.addEventListener('transitionend', () => {
              glitch.remove();
              resolve();
            }, { once: true });
          }, 340);
        }, 60);
      }
    }

    flash();
  });
}
