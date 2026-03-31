// ── MAIN ENTRY POINT ──────────────────────────────────────
import { initNavbar }    from '../../js/navbar.js';
import { initParticles } from '../../js/particles.js';
import { initTechScene } from '../../js/tech-scene.js';
import { initCarousel }  from '../../js/carousel.js';
import { initAnimations }from '../../js/animations.js';
import { initBackground }from '../../js/background.js';
import { initForm }      from '../../js/form.js';
import { initIntro }     from '../../js/intro.js';
import { thunderEntry }  from '../../js/thunder-entry.js';

const SECTIONS = [
  { id: 'hero-slot',     file: 'sections/hero.html'      },
  { id: 'about-slot',    file: 'sections/about.html'     },
  { id: 'skills-slot',   file: 'sections/skills.html'    },
  { id: 'projects-slot', file: 'sections/projects.html'  },
  { id: 'pricing-slot',  file: 'sections/pricing.html'   },
  { id: 'extras-slot',   file: 'sections/extras.html'    },
  { id: 'contact-slot',  file: 'sections/contact.html'   },
  { id: 'footer-slot',   file: 'components/footer.html'  },
];

async function loadSection({ id, file }) {
  const slot = document.getElementById(id);
  if (!slot) return;
  try {
    const res = await fetch(file);
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    slot.outerHTML = await res.text();
  } catch (err) {
    console.error(`Failed to load section "${file}":`, err);
    slot.innerHTML = `<p style="color:#f87171;text-align:center;padding:2rem">Failed to load section.</p>`;
  }
}

async function boot() {
  const [_] = await Promise.all([
    initIntro(),
    Promise.all(SECTIONS.map(loadSection)),
  ]);
  await thunderEntry();
  initBackground();
  initNavbar();
  initParticles();
  initTechScene();
  initCarousel();
  initAnimations();
  initForm();
  console.log('Pannel Dhruvesh — Portfolio Loaded');
}

boot();
