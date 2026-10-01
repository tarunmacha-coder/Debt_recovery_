import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Logo } from '../components/Icons.jsx';
import './immersive.css';

/* The vendored Kage runtime — the only copy of three.js on the site. */
const THREE_SRC = '/landing-pages/secret-pathways-assets/three.min.js';
const LOADER_CAP_MS = 2600;

function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
  } catch (e) { return false; }
}

/* ------------------------------------------------------------------------
   Foreground near-plane (after Kage's .fg stages). Kage stands cut-out
   temple PNGs in front of its scene; here each chapter gets gold line-art
   drawn from the site's own visual language — ledger bars, flow arcs, a
   dotted terrain, a trend ridge. It sits behind the copy, never over it.
   ------------------------------------------------------------------------ */
function rng(seed) {
  return () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
}

function Ledger() {
  const r = rng(11);
  const bars = Array.from({ length: 34 }, (_, i) => {
    const h = 40 + Math.pow(r(), 1.6) * 210 + Math.sin(i * .45) * 30;
    return { x: 10 + i * 47, h: Math.max(30, h) };
  });
  return (
    <>
      <g className="im-fg-el" data-in="left" style={{ '--d': '0ms' }}>
        {bars.slice(0, 17).map(b => <rect key={b.x} x={b.x} y={400 - b.h} width="30" height={b.h} rx="2" className="im-ink-bar" />)}
      </g>
      <g className="im-fg-el" data-in="right" style={{ '--d': '140ms' }}>
        {bars.slice(17).map(b => <rect key={b.x} x={b.x} y={400 - b.h} width="30" height={b.h} rx="2" className="im-ink-bar" />)}
      </g>
      <g className="im-fg-el" data-in="up" style={{ '--d': '280ms' }}>
        <path d="M0 330 C 300 300, 520 250, 800 230 S 1300 150, 1600 120" className="im-ink-line" />
      </g>
    </>
  );
}

function Arcs() {
  return (
    <>
      <g className="im-fg-el" data-in="left" style={{ '--d': '0ms' }}>
        {[0, 1, 2, 3, 4].map(k => <path key={k} d={`M${-40 + k * 30} 400 Q ${260 + k * 60} ${80 + k * 34}, ${720 + k * 40} 400`} className="im-ink-line" />)}
      </g>
      <g className="im-fg-el" data-in="right" style={{ '--d': '160ms' }}>
        {[0, 1, 2, 3].map(k => <path key={k} d={`M${1640 - k * 30} 400 Q ${1330 - k * 50} ${120 + k * 40}, ${900 - k * 40} 400`} className="im-ink-line" />)}
      </g>
      <g className="im-fg-el" data-in="up" style={{ '--d': '300ms' }}>
        {[[330, 196], [520, 262], [1250, 230], [1420, 300], [800, 340]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="5" className="im-ink-node" />)}
      </g>
    </>
  );
}

function Terrain() {
  const rows = [];
  for (let j = 0; j < 7; j++) {
    const y0 = 250 + j * 24, amp = 26 + j * 6, gap = 16 + j * 3;
    for (let x = 0; x <= 1600; x += gap) {
      rows.push({ k: `${j}-${x}`, j, cx: x, cy: y0 + Math.sin(x * .006 + j * .7) * amp * .5, r: .9 + j * .28 });
    }
  }
  return (
    <>
      <g className="im-fg-el" data-in="up" style={{ '--d': '0ms' }}>
        {rows.filter(d => d.j < 4).map(d => <circle key={d.k} cx={d.cx} cy={d.cy} r={d.r} className="im-ink-dot" />)}
      </g>
      <g className="im-fg-el" data-in="up" style={{ '--d': '180ms' }}>
        {rows.filter(d => d.j >= 4).map(d => <circle key={d.k} cx={d.cx} cy={d.cy} r={d.r} className="im-ink-dot" />)}
      </g>
    </>
  );
}

function Ridge() {
  const r = rng(29);
  const pts = Array.from({ length: 41 }, (_, i) => [i * 40, 330 - i * 4 - r() * 70 - Math.sin(i * .5) * 22]);
  const line = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0]} ${p[1].toFixed(1)}`).join(' ');
  return (
    <>
      <g className="im-fg-el" data-in="up" style={{ '--d': '0ms' }}>
        <path d={`${line} L1600 400 L0 400 Z`} className="im-ink-area" />
      </g>
      <g className="im-fg-el" data-in="left" style={{ '--d': '160ms' }}>
        <path d={line} className="im-ink-line im-ink-line--strong" />
      </g>
      <g className="im-fg-el" data-in="right" style={{ '--d': '300ms' }}>
        {pts.filter((_, i) => i % 5 === 2).map(([x, y]) => <circle key={x} cx={x} cy={y} r="5" className="im-ink-node" />)}
      </g>
    </>
  );
}

const STAGES = [Ledger, Arcs, Terrain, Ridge];

function grainUrl() {
  /* Kage's makeGrain: a small tile of noise, repeated */
  try {
    const c = document.createElement('canvas');
    c.width = c.height = 180;
    const x = c.getContext('2d');
    const img = x.createImageData(180, 180);
    for (let i = 0; i < img.data.length; i += 4) {
      const v = (Math.random() * 255) | 0;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = v; img.data[i + 3] = 255;
    }
    x.putImageData(img, 0, 0);
    return `url(${c.toDataURL('image/png')})`;
  } catch (e) { return 'none'; }
}

export default function ImmersiveLayer() {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const [mode, setMode] = useState('loading');      /* loading | live | still */
  const [loaderDone, setLoaderDone] = useState(false);
  const [pct, setPct] = useState(0);
  const [chapters, setChapters] = useState([]);
  const [active, setActive] = useState(0);
  const [stage, setStage] = useState({ cur: 0, prev: -1 });
  const [wordmark, setWordmark] = useState('');
  const grain = useMemo(grainUrl, []);

  const reduce = useMemo(() => typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches, []);
  const coarse = useMemo(() => typeof matchMedia !== 'undefined' && matchMedia('(hover: none)').matches, []);

  /* boot: find the chapters, then raise the scene behind them */
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('im-on');
    if (reduce) root.classList.add('im-reduce');

    const sections = Array.from(document.querySelectorAll('#root main > section, #root > footer, #root footer.footer'))
      .filter((el, i, arr) => arr.indexOf(el) === i);
    setChapters(sections.map((el, i) => {
      const navText = el.id && document.querySelector(`.nav-links a[href="#${el.id}"]`)?.textContent;
      const badge = el.querySelector('.badge')?.textContent;
      const label = (navText || badge || (el.tagName === 'FOOTER' ? 'Footer' : `Section ${i + 1}`)).trim();
      return { el, label };
    }));
    setWordmark(document.querySelector('.nav .logo-text')?.textContent?.trim() || '');

    const nav = document.querySelector('.nav');
    const setNavH = () => root.style.setProperty('--im-nav', `${nav ? nav.offsetHeight : 0}px`);
    setNavH();

    let alive = true;
    const finishLoader = () => { if (alive) setLoaderDone(true); };
    const cap = setTimeout(finishLoader, reduce ? 0 : LOADER_CAP_MS);
    const creep = setInterval(() => { setPct(p => Math.min(90, p + Math.max(1, (90 - p) * .12))); }, 90);

    const fallBack = () => {
      if (!alive) return;
      root.classList.add('im-no-webgl');
      setMode('still');
      setPct(100);
      clearInterval(creep);
      setTimeout(finishLoader, reduce ? 0 : 240);
    };

    if (!hasWebGL()) fallBack();
    else {
      import('./goldScene.js').then(({ createGoldScene, loadThree }) =>
        loadThree(THREE_SRC).then(THREE => ({ THREE, createGoldScene }))
      ).then(({ THREE, createGoldScene }) => {
        if (!alive) return;
        const s = createGoldScene({ THREE, canvas: canvasRef.current, sections, reduce, coarse });
        if (!s) return fallBack();
        sceneRef.current = s;
        s.start();
        clearInterval(creep);
        setPct(100);
        setMode('live');
        setTimeout(finishLoader, reduce ? 0 : 260);
      }).catch(err => {
        console.warn('[immersive] scene unavailable, using still backdrop:', err && err.message);
        fallBack();
      });
    }

    /* content reflows (images, the blog reader, job cards) move the anchors */
    const ro = new ResizeObserver(() => { setNavH(); sceneRef.current?.measure(); });
    ro.observe(document.body);

    return () => {
      alive = false;
      clearTimeout(cap); clearInterval(creep); ro.disconnect();
      sceneRef.current?.dispose(); sceneRef.current = null;
      root.classList.remove('im-on', 'im-reduce', 'im-no-webgl', 'im-ready');
    };
  }, [reduce, coarse]);

  /* the page waits behind the loader only while it is up (Kage's is-locked) */
  useEffect(() => {
    document.documentElement.classList.toggle('im-ready', loaderDone);
    document.body.classList.toggle('im-locked', !loaderDone);
    return () => document.body.classList.remove('im-locked');
  }, [loaderDone]);

  /* scroll: which chapter holds the middle of the screen, and how far the
     hero has stood down (Kage's wireHeroExit, as one CSS variable) */
  useEffect(() => {
    if (!chapters.length) return undefined;
    const root = document.documentElement;
    let raf = 0;
    const update = () => {
      raf = 0;
      const mid = window.innerHeight * .5;
      let idx = 0;
      chapters.forEach(({ el }, i) => { if (el.getBoundingClientRect().top <= mid) idx = i; });
      setActive(idx);
      const hero = chapters[0].el;
      const exit = Math.min(1, Math.max(0, window.scrollY / Math.max(1, hero.offsetHeight * .85)));
      root.style.setProperty('--im-hero', exit.toFixed(4));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [chapters]);

  /* the active chapter's foreground rises; its predecessor dissolves */
  useEffect(() => {
    const next = active % STAGES.length;
    setStage(s => (s.cur === next ? s : { cur: next, prev: s.cur }));
    if (reduce) return undefined;
    const t = setTimeout(() => setStage(s => ({ ...s, prev: -1 })), 820);
    return () => clearTimeout(t);
  }, [active, reduce]);

  /* section heads: the mask on each heading opens when its block arrives */
  useEffect(() => {
    const heads = document.querySelectorAll('#root .section-head, #root .rec-head');
    if (!('IntersectionObserver' in window)) { heads.forEach(h => h.classList.add('im-in')); return undefined; }
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('im-in'); io.unobserve(e.target); }
    }), { rootMargin: '0px 0px -12% 0px', threshold: 0 });
    heads.forEach(h => io.observe(h));
    return () => io.disconnect();
  }, []);

  /* hand-held parallax from the pointer */
  useEffect(() => {
    if (coarse || reduce) return undefined;
    const move = e => sceneRef.current?.setPointer((e.clientX / window.innerWidth) * 2 - 1, -((e.clientY / window.innerHeight) * 2 - 1));
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, [coarse, reduce]);

  const goTo = el => el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });

  return (
    <>
      <div className="im-stage" aria-hidden="true">
        <canvas ref={canvasRef} className={`im-gl${mode === 'live' ? ' is-live' : ''}`} />
        <div className="im-still" />
        {wordmark && (
          <div className="im-word">
            {wordmark.split(' ').map((w, wi) => (
              <span className="im-word-w" key={wi}>
                {w.split('').map((ch, ci) => (
                  <span className="im-word-ch" key={ci} style={{ '--i': wi * 5 + ci }}>{ch}</span>
                ))}
              </span>
            ))}
          </div>
        )}
        <div className="im-fg-sky">
          {STAGES.map((Stage, i) => (
            <svg
              key={i}
              className={`im-fg${i === stage.cur ? ' on' : ''}${i === stage.prev ? ' retiring' : ''}`}
              viewBox="0 0 1600 400" preserveAspectRatio="xMidYMax slice"
            >
              <Stage />
            </svg>
          ))}
        </div>
        <div className="im-vignette" />
        <div className="im-grain" style={{ backgroundImage: grain }} />
      </div>

      <div className="im-cue" aria-hidden="true"><i /></div>

      {chapters.length > 1 && (
        <nav className="im-rail" aria-label="Page sections">
          {chapters.map(({ el, label }, i) => (
            <button
              key={i} type="button" className={i === active ? 'on' : ''}
              aria-label={label} aria-current={i === active ? 'true' : undefined} title={label}
              onClick={() => goTo(el)}
            ><i /></button>
          ))}
        </nav>
      )}

      <div className={`im-pre${loaderDone ? ' done' : ''}`} aria-hidden={loaderDone ? 'true' : undefined} role="status" aria-label="Loading">
        <div className="im-pre-in">
          <span className="logo-mark im-pre-mark" aria-hidden="true">
            <Logo style={{ width: 20, height: 20, stroke: '#fff' }} />
          </span>
          {wordmark && <div className="im-pre-name">{wordmark}</div>}
          <div className="im-pre-bar"><i style={{ right: `${100 - pct}%` }} /></div>
          <div className="im-pre-pct">{Math.round(pct)}%</div>
        </div>
      </div>
    </>
  );
}
