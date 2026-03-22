// ── TECH SCENE — VS CODE STYLE ────────────────────────────
export function initTechScene() {
  const scene = document.getElementById('techScene');
  if (!scene) return;

  const isMobile = () => window.innerWidth <= 900;

  scene.innerHTML = `
  <div class="vsc-wrap">
    <div class="gear gear-lg gear-cw"></div>
    <div class="gear gear-md gear-ccw"></div>
    <div class="gear gear-sm gear-cw"></div>
    <div class="badge-float badge-code"><span class="badge-icon">&lt;/&gt;</span><span class="badge-label">Python</span></div>
    <div class="badge-float badge-db"><span class="badge-icon">&#x2B21;</span><span class="badge-label">MySQL</span></div>
    <div class="badge-float badge-git"><span class="badge-icon">&#x2387;</span><span class="badge-label">Git</span></div>
    <div class="vsc-monitor">
      <div class="vsc-bezel">
        <div class="vsc-titlebar">
          <div class="vsc-dots"><span class="vd red"></span><span class="vd yellow"></span><span class="vd green"></span></div>
          <div class="vsc-tabs">
            <span class="vsc-tab active">gym_analysis.py</span>
            <span class="vsc-tab">data_clean.py</span>
            <span class="vsc-tab">models.py</span>
          </div>
          <div class="vsc-winbtns">&#x2500; &#x25A1; &#x2715;</div>
        </div>
        <div class="vsc-editor">
          <div class="vsc-activity">
            <div class="vsc-act-icon active">&#x2B21;</div>
            <div class="vsc-act-icon">&#x2398;</div>
            <div class="vsc-act-icon">&#x2699;</div>
            <div class="vsc-act-icon">&#x2B21;</div>
          </div>
          <div class="vsc-explorer">
            <div class="vsc-exp-title">EXPLORER</div>
            <div class="vsc-exp-folder open">&#x1F4C1; gym-project</div>
            <div class="vsc-exp-file active">  &#x1F4C4; gym_analysis.py</div>
            <div class="vsc-exp-file">  &#x1F4C4; data_clean.py</div>
            <div class="vsc-exp-file">  &#x1F4C4; models.py</div>
            <div class="vsc-exp-file">  &#x1F4C4; requirements.txt</div>
            <div class="vsc-exp-folder">&#x1F4C1; data</div>
            <div class="vsc-exp-file">  &#x1F4C4; gym.csv</div>
          </div>
          <div class="vsc-code-area">
            <canvas class="vsc-screen-bg" id="vscScreenBg"></canvas>
            <div class="vsc-code-inner" id="vscCodeInner">
              <div class="vsc-line"><span class="ln">1</span><span class="cm"># Gym Management System</span></div>
              <div class="vsc-line"><span class="ln">2</span><span class="kw">import</span> <span class="nm">pandas</span> <span class="kw">as</span> <span class="nm">pd</span></div>
              <div class="vsc-line"><span class="ln">3</span><span class="kw">import</span> <span class="nm">numpy</span> <span class="kw">as</span> <span class="nm">np</span></div>
              <div class="vsc-line"><span class="ln">4</span><span class="kw">import</span> <span class="nm">matplotlib.pyplot</span> <span class="kw">as</span> <span class="nm">plt</span></div>
              <div class="vsc-line"><span class="ln">5</span><span class="kw">from</span> <span class="nm">sklearn.linear_model</span> <span class="kw">import</span> <span class="fn">LinearRegression</span></div>
              <div class="vsc-line"><span class="ln">6</span>&nbsp;</div>
              <div class="vsc-line"><span class="ln">7</span><span class="nm">df</span> <span class="op">=</span> <span class="nm">pd</span>.<span class="fn">read_csv</span>(<span class="st">"data/gym.csv"</span>)</div>
              <div class="vsc-line"><span class="ln">8</span><span class="nm">df</span>.<span class="fn">dropna</span>(<span class="nm">inplace</span><span class="op">=</span><span class="kw">True</span>)</div>
              <div class="vsc-line"><span class="ln">9</span>&nbsp;</div>
              <div class="vsc-line"><span class="ln">10</span><span class="kw">def</span> <span class="fn">analyze_members</span>(<span class="nm">df</span>):</div>
              <div class="vsc-line"><span class="ln">11</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="nm">stats</span> <span class="op">=</span> <span class="nm">df</span>.<span class="fn">describe</span>()</div>
              <div class="vsc-line"><span class="ln">12</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="nm">active</span> <span class="op">=</span> <span class="nm">df</span>[<span class="nm">df</span>[<span class="st">'status'</span>] <span class="op">==</span> <span class="st">'active'</span>]</div>
              <div class="vsc-line"><span class="ln">13</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="kw">return</span> <span class="nm">stats</span>, <span class="nm">active</span></div>
              <div class="vsc-line"><span class="ln">14</span>&nbsp;</div>
              <div class="vsc-line"><span class="ln">15</span><span class="kw">def</span> <span class="fn">predict_revenue</span>(<span class="nm">X</span>, <span class="nm">y</span>):</div>
              <div class="vsc-line"><span class="ln">16</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="nm">model</span> <span class="op">=</span> <span class="fn">LinearRegression</span>()</div>
              <div class="vsc-line"><span class="ln">17</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="nm">model</span>.<span class="fn">fit</span>(<span class="nm">X</span>, <span class="nm">y</span>)</div>
              <div class="vsc-line"><span class="ln">18</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="nm">score</span> <span class="op">=</span> <span class="nm">model</span>.<span class="fn">score</span>(<span class="nm">X</span>, <span class="nm">y</span>)</div>
              <div class="vsc-line"><span class="ln">19</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="kw">return</span> <span class="nm">model</span>, <span class="nm">score</span></div>
              <div class="vsc-line"><span class="ln">20</span>&nbsp;</div>
              <div class="vsc-line"><span class="ln">21</span><span class="nm">stats</span>, <span class="nm">active_df</span> <span class="op">=</span> <span class="fn">analyze_members</span>(<span class="nm">df</span>)</div>
              <div class="vsc-line"><span class="ln">22</span><span class="fn">print</span>(<span class="st">f"Total: </span><span class="op">{</span><span class="fn">len</span>(<span class="nm">df</span>)<span class="op">}</span><span class="st">"</span>)</div>
              <div class="vsc-line vsc-active-line"><span class="ln">23</span><span class="fn">print</span>(<span class="st">f"Active: </span><span class="op">{</span><span class="fn">len</span>(<span class="nm">active_df</span>)<span class="op">}</span><span class="st">"</span>)<span class="vsc-cursor"></span></div>
            </div>
          </div>
        </div>
        <div class="vsc-statusbar">
          <span class="vsb-left">&#x2387; main &nbsp;&#x2713; Python 3.11</span>
          <span class="vsb-right">Ln 23, Col 38 &nbsp;UTF-8</span>
        </div>
      </div>
      <div class="vsc-neck"></div>
      <div class="vsc-stand"></div>
    </div>
    <div class="vsc-desk-top"></div>
    <div class="vsc-desk"></div>
    <div class="vsc-keyboard" id="vscKeyboard">
      <div class="vsc-kb-row">
        <div class="vsc-key wide-15 rgb-p">ESC</div>
        <div class="vsc-key">F1</div><div class="vsc-key">F2</div><div class="vsc-key">F3</div>
        <div class="vsc-key rgb-c">F4</div><div class="vsc-key">F5</div><div class="vsc-key">F6</div>
        <div class="vsc-key rgb-g">F7</div><div class="vsc-key">F8</div><div class="vsc-key">F9</div>
        <div class="vsc-key">F10</div><div class="vsc-key">F11</div><div class="vsc-key">F12</div>
      </div>
      <div class="vsc-kb-row">
        <div class="vsc-key">&grave;</div><div class="vsc-key">1</div><div class="vsc-key">2</div>
        <div class="vsc-key">3</div><div class="vsc-key rgb-p">4</div><div class="vsc-key">5</div>
        <div class="vsc-key">6</div><div class="vsc-key">7</div><div class="vsc-key">8</div>
        <div class="vsc-key">9</div><div class="vsc-key">0</div><div class="vsc-key">-</div>
        <div class="vsc-key">=</div><div class="vsc-key wide-2">&#x232B;</div>
      </div>
      <div class="vsc-kb-row">
        <div class="vsc-key wide-15">TAB</div>
        <div class="vsc-key rgb-c">Q</div><div class="vsc-key rgb-c">W</div><div class="vsc-key rgb-c">E</div>
        <div class="vsc-key">R</div><div class="vsc-key">T</div><div class="vsc-key">Y</div>
        <div class="vsc-key">U</div><div class="vsc-key">I</div><div class="vsc-key">O</div>
        <div class="vsc-key">P</div><div class="vsc-key">[</div><div class="vsc-key">]</div>
        <div class="vsc-key wide-15">&#92;</div>
      </div>
      <div class="vsc-kb-row">
        <div class="vsc-key wide-2">CAPS</div>
        <div class="vsc-key rgb-g">A</div><div class="vsc-key rgb-g">S</div><div class="vsc-key rgb-g">D</div>
        <div class="vsc-key">F</div><div class="vsc-key">G</div><div class="vsc-key">H</div>
        <div class="vsc-key">J</div><div class="vsc-key">K</div><div class="vsc-key">L</div>
        <div class="vsc-key">;</div><div class="vsc-key">'</div>
        <div class="vsc-key wide-25">ENTER</div>
      </div>
      <div class="vsc-kb-row">
        <div class="vsc-key wide-3">SHIFT</div>
        <div class="vsc-key">Z</div><div class="vsc-key">X</div><div class="vsc-key">C</div>
        <div class="vsc-key">V</div><div class="vsc-key">B</div><div class="vsc-key">N</div>
        <div class="vsc-key">M</div><div class="vsc-key">,</div><div class="vsc-key">.</div>
        <div class="vsc-key">/</div><div class="vsc-key wide-3">SHIFT</div>
      </div>
      <div class="vsc-kb-row">
        <div class="vsc-key wide-15">CTRL</div><div class="vsc-key wide-15">ALT</div>
        <div class="vsc-key space"></div>
        <div class="vsc-key wide-15">ALT</div><div class="vsc-key wide-15">CTRL</div>
      </div>
    </div>
    <div class="vsc-mouse">
      <div class="vsc-mouse-split">
        <div class="vsc-mouse-btn left"></div>
        <div class="vsc-mouse-btn right"></div>
      </div>
      <div class="vsc-mouse-wheel"></div>
      <div class="vsc-mouse-led"></div>
    </div>
    <div class="vsc-glow"></div>
    <div class="fdot fdot-1"></div><div class="fdot fdot-2"></div>
    <div class="fdot fdot-3"></div><div class="fdot fdot-4"></div>
    <svg class="vsc-wires" viewBox="0 0 560 660" xmlns="http://www.w3.org/2000/svg" style="height:660px">
      <defs>
        <filter id="wireShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="rgba(0,0,0,0.6)"/>
        </filter>
      </defs>
      <path class="wire-shadow"      d="M276,320 C274,390 248,460 230,520" filter="url(#wireShadow)"/>
      <path class="wire-base"        d="M276,320 C274,390 248,460 230,520"/>
      <path class="wire-highlight"   d="M276,320 C274,390 248,460 230,520"/>
      <path class="wire-flow purple" d="M276,320 C274,390 248,460 230,520"/>
      <circle cx="230" cy="520" r="3.5" fill="#1e1e2e" stroke="rgba(167,139,250,0.9)" stroke-width="1.5"/>
      <path class="wire-shadow"    d="M284,320 C295,410 390,490 441,548" filter="url(#wireShadow)"/>
      <path class="wire-base"      d="M284,320 C295,410 390,490 441,548"/>
      <path class="wire-highlight" d="M284,320 C295,410 390,490 441,548"/>
      <path class="wire-flow cyan" d="M284,320 C295,410 390,490 441,548"/>
      <circle cx="441" cy="548" r="3.5" fill="#1e1e2e" stroke="rgba(34,211,238,0.9)" stroke-width="1.5"/>
    </svg>
  </div>`;

  // ── Code scroll — rAF throttled, replaces setInterval ────
  const codeInner = document.getElementById('vscCodeInner');
  if (codeInner) {
    let scrollPos = 0, lastCode = 0;
    const scrollCode = (ts) => {
      if (ts - lastCode > 30) {
        lastCode = ts;
        const maxScroll = codeInner.scrollHeight - codeInner.parentElement.clientHeight;
        scrollPos += 0.4;
        if (scrollPos > maxScroll + 40) scrollPos = 0;
        codeInner.style.transform = 'translateY(-' + Math.min(scrollPos, maxScroll) + 'px)';
      }
      requestAnimationFrame(scrollCode);
    };
    requestAnimationFrame(scrollCode);
  }

  // ── Matrix rain — rAF throttled to ~16fps ────────────────
  const bgCanvas = document.getElementById('vscScreenBg');
  if (bgCanvas) {
    const ctx = bgCanvas.getContext('2d');
    bgCanvas.width = 278; bgCanvas.height = 240;
    const cols  = Math.floor(bgCanvas.width / 10);
    const drops = Array(cols).fill(1);
    const chars = 'アイウエオカキクケコ01{}[]()=>import def return class'.split('');
    let lastRain = 0;
    const drawRain = (ts) => {
      if (ts - lastRain > 60) {
        lastRain = ts;
        ctx.fillStyle = 'rgba(30,30,46,0.18)';
        ctx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);
        ctx.font = '9px Courier New';
        drops.forEach((y, i) => {
          const ch = chars[Math.floor(Math.random() * chars.length)];
          ctx.fillStyle = Math.random() > 0.92 ? '#cba6f7' : (Math.random() > 0.5 ? '#45475a' : '#313244');
          ctx.fillText(ch, i * 10, y * 10);
          if (y * 10 > bgCanvas.height && Math.random() > 0.975) drops[i] = 0;
          drops[i]++;
        });
      }
      requestAnimationFrame(drawRain);
    };
    requestAnimationFrame(drawRain);
  }

  // ── Keyboard typing — rAF, desktop only ──────────────────
  const keyboard = document.getElementById('vscKeyboard');
  if (keyboard && !isMobile()) {
    const keys = Array.from(keyboard.querySelectorAll('.vsc-key'));
    let lastKey = 0, idx = 0;
    const intervals = [120, 200, 350];
    const pressKey = (ts) => {
      if (ts - lastKey > intervals[idx % 3]) {
        lastKey = ts; idx++;
        const k = keys[Math.floor(Math.random() * keys.length)];
        k.classList.add('typing');
        setTimeout(() => k.classList.remove('typing'), 150);
      }
      requestAnimationFrame(pressKey);
    };
    requestAnimationFrame(pressKey);
  }

  // ── Mouse parallax — desktop only ────────────────────────
  document.addEventListener('mousemove', e => {
    if (isMobile()) return;
    const x = (e.clientX / innerWidth  - 0.5) * 14;
    const y = (e.clientY / innerHeight - 0.5) * 8;
    scene.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
  }, { passive: true });

  // ── Mobile scaling ────────────────────────────────────────
  // vsc-wrap is 560px wide × 580px tall (all children absolutely positioned).
  // Keyboard extends to bottom: -60px → total visual height = 640px.
  // We scale the wrap down to fit screen width, then:
  //   - offset it with margin-left to center it
  //   - set scene height = scaled total height so no dead space
  function scaleMobileScene() {
    const wrap = scene.querySelector('.vsc-wrap');
    if (!wrap) return;
    if (isMobile()) {
      const screenW   = window.innerWidth;
      const available = Math.min(screenW - 32, 520);
      const scale     = +(available / 560).toFixed(3);

      // transform-origin: top left — wrap shrinks from top-left corner
      // Center it by offsetting left by half the remaining space
      const scaledW  = Math.round(560 * scale);
      const marginL  = Math.round((screenW - scaledW) / 2);

      wrap.style.transform       = `scale(${scale})`;
      wrap.style.transformOrigin = 'top left';
      wrap.style.marginLeft      = marginL + 'px';
      wrap.style.marginRight     = '0';

      // Total visual height: 580px wrap + 60px keyboard overhang = 640px
      const scaledH = Math.round(640 * scale) + 8;
      scene.style.height = scaledH + 'px';
    } else {
      wrap.style.transform       = '';
      wrap.style.transformOrigin = '';
      wrap.style.marginLeft      = '';
      wrap.style.marginRight     = '';
      scene.style.height         = '';
    }
  }
  scaleMobileScene();
  window.addEventListener('resize', scaleMobileScene, { passive: true });
}
