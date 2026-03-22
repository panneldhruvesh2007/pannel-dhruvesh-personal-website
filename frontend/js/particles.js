// ── THREE.JS HERO PARTICLES ────────────────────────────────
export function initParticles() {
  // Guard: Three.js may not have loaded yet (deferred)
  if (typeof THREE === 'undefined') {
    console.warn('Three.js not loaded — skipping particles');
    return;
  }
  try {
    const canvas   = document.getElementById('heroCanvas');
    if (!canvas) return;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(innerWidth, innerHeight);
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 100);
    camera.position.z = 20;

    // Fewer particles on mobile for performance
    const count = window.innerWidth < 768 ? 120 : 300;
    const pos   = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i*3]   = (Math.random() - .5) * 50;
      pos[i*3+1] = (Math.random() - .5) * 35;
      pos[i*3+2] = (Math.random() - .5) * 20 - 5;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const pts = new THREE.Points(geo, new THREE.PointsMaterial({
      color: 0xa78bfa, size: .09, transparent: true, opacity: .5
    }));
    scene.add(pts);

    let tmx = 0, tmy = 0;
    document.addEventListener('mousemove', e => {
      tmx = (e.clientX / innerWidth  - .5);
      tmy = -(e.clientY / innerHeight - .5);
    }, { passive: true });

    let t = 0;
    (function loop() {
      requestAnimationFrame(loop);
      t += 0.005;
      pts.rotation.y = t * 0.05 + tmx * 0.1;
      pts.rotation.x = tmy * 0.06;
      renderer.render(scene, camera);
    })();

    window.addEventListener('resize', () => {
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(innerWidth, innerHeight);
    }, { passive: true });
  } catch (e) { console.warn('Three.js particles failed:', e); }
}
