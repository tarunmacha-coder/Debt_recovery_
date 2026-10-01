/* =====================================================================
   Gold scene — the homepage's live backdrop.

   The engine is ported from ThreeUI's Kage (public/landing-pages/kage.html):
   §0 basics, §8 camera rig, §9 scroll ↔ chapters, §13 the render loop and
   its frame-rate governor, §14 boot/fallback. Kage's mountain temple is
   replaced with a cream-and-gold data world built from the site's own
   palette: drifting gold motes, light trails, network constellations,
   floating geometric structures and an abstract bar chart, one composition
   per section, all receding into a cream fog.

   Uses the THREE global from the vendored Kage runtime
   (public/landing-pages/secret-pathways-assets/three.min.js), so the site
   carries exactly one copy of three.js.
   ===================================================================== */

/* ------------------------------------------------------------ 0 · basics */
const clamp  = (v, a, b) => v < a ? a : (v > b ? b : v);
const sat    = v => clamp(v, 0, 1);
const lerp   = (a, b, t) => a + (b - a) * t;
const smooth = (e0, e1, x) => { const t = sat((x - e0) / (e1 - e0)); return t * t * (3 - 2 * t); };
const TAU    = Math.PI * 2;
/* frame-rate independent damping */
const damp   = (cur, to, rate, dt) => lerp(cur, to, 1 - Math.exp(-rate * dt));

function mulberry32(a) {
  return function () {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

/* the site's palette (styles/global.css :root) */
const CREAM = 0xfefdf8;
const GOLD = { base: 0xd4a72c, bright: 0xe8b730, light: 0xf0c75e, deep: 0xa87f1a, rich: 0xc9931e };
const MOTE_COLORS = [GOLD.base, GOLD.bright, GOLD.light, GOLD.deep, GOLD.rich];

const SPACING = 16;           /* world units between chapters along the walk */
const FOG_NEAR = 12, FOG_FAR = 58;

let threePromise = null;
export function loadThree(src) {
  if (window.THREE) return Promise.resolve(window.THREE);
  if (!threePromise) {
    threePromise = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = src; s.async = true;
      s.onload = () => (window.THREE ? resolve(window.THREE) : reject(new Error('three.js did not register')));
      s.onerror = () => reject(new Error('three.js failed to load'));
      document.head.appendChild(s);
    });
  }
  return threePromise;
}

export function createGoldScene({ THREE, canvas, sections, reduce = false, coarse = false }) {
  /* -------------------------------------------------------------- 1 · gl */
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: !coarse, powerPreference: 'high-performance' });
  } catch (err) {
    return null;                                   /* no renderer, no scene */
  }
  renderer.setClearColor(0x000000, 0);
  const DPR_CAP = coarse ? 1.5 : 1.75;
  const PERF = { scale: 1, acc: 0, n: 0, locked: false };

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(CREAM, FOG_NEAR, FOG_FAR);
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 160);

  const rand = mulberry32(0x5eed);
  const N = Math.max(1, sections.length);
  const zOf = i => -i * SPACING;
  const vpW = () => window.innerWidth, vpH = () => window.innerHeight;
  const uT = { value: 0 };
  const uPx = { value: 800 };
  const clusters = [];
  const disposables = [];
  const track = o => { disposables.push(o); return o; };

  /* ---------------------------------------------------------- 2 · materials */
  const edgeMat = (color = GOLD.rich, opacity = 0.55) =>
    track(new THREE.LineBasicMaterial({ color, transparent: true, opacity, depthWrite: false }));
  const faceMat = (color = GOLD.light, opacity = 0.07) =>
    track(new THREE.MeshBasicMaterial({ color, transparent: true, opacity, depthWrite: false, side: THREE.DoubleSide }));

  /* soft round falloff — motes, nodes, pulses (Kage's ember sprite, in gold) */
  const MOTE_VERT = `
    attribute float aSize; attribute float aSeed; attribute vec3 aColor;
    uniform float uT; uniform float uPx; uniform float uDrift;
    varying vec3 vColor; varying float vDepth; varying float vTw;
    void main(){
      vec3 p = position;
      float s = aSeed * 6.2831;
      p += uDrift * vec3(sin(uT * .21 + s) * .45, sin(uT * .17 + s * 1.7) * .55, cos(uT * .13 + s * 2.3) * .35);
      vec4 mv = modelViewMatrix * vec4(p, 1.);
      gl_Position = projectionMatrix * mv;
      vDepth = -mv.z;
      gl_PointSize = aSize * uPx / max(vDepth, .5);
      vColor = aColor;
      vTw = .72 + .28 * sin(uT * (1.1 + aSeed * 1.7) + s * 3.);
    }`;
  const MOTE_FRAG = `
    uniform float uAlpha; uniform float uNear; uniform float uFar;
    varying vec3 vColor; varying float vDepth; varying float vTw;
    void main(){
      float d = length(gl_PointCoord - .5);
      float a = smoothstep(.5, .0, d);
      a *= a;
      float fog = 1. - smoothstep(uNear, uFar, vDepth);
      float nearFade = smoothstep(.6, 2.4, vDepth);
      gl_FragColor = vec4(vColor, a * uAlpha * fog * nearFade * vTw);
      if (gl_FragColor.a < .004) discard;
    }`;
  function moteMaterial(alpha, drift = 1) {
    return track(new THREE.ShaderMaterial({
      uniforms: { uT, uPx, uAlpha: { value: alpha }, uDrift: { value: drift }, uNear: { value: FOG_NEAR * .6 }, uFar: { value: FOG_FAR } },
      vertexShader: MOTE_VERT, fragmentShader: MOTE_FRAG,
      transparent: true, depthWrite: false
    }));
  }
  function pointsGeometry(positions, sizes, colors) {
    const n = positions.length / 3;
    const g = track(new THREE.BufferGeometry());
    const seeds = new Float32Array(n), col = new Float32Array(n * 3), c = new THREE.Color();
    for (let i = 0; i < n; i++) {
      seeds[i] = rand();
      c.setHex(colors ? colors[i] : MOTE_COLORS[(rand() * MOTE_COLORS.length) | 0]);
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
    }
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    g.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    g.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));
    g.setAttribute('aColor', new THREE.BufferAttribute(col, 3));
    return g;
  }

  /* ------------------------------------------------------- 3 · atmosphere */
  const zStart = 14, zEnd = zOf(N - 1) - 30;

  /* gold motes filling the whole walk */
  (function buildMotes() {
    const count = coarse ? 1300 : 3000;
    const pos = new Float32Array(count * 3), size = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (rand() - .5) * 34;
      pos[i * 3 + 1] = -3 + Math.pow(rand(), 1.4) * 14;
      pos[i * 3 + 2] = lerp(zStart, zEnd, rand());
      size[i] = .05 + Math.pow(rand(), 3) * .16;
    }
    scene.add(new THREE.Points(pointsGeometry(pos, size), moteMaterial(.85)));
  })();

  /* light trails: long gold threads running the length of the walk, each
     carrying a few bright packets of light */
  const TRAIL_VERT = `
    attribute float aU; varying float vU; varying float vDepth;
    void main(){ vU = aU; vec4 mv = modelViewMatrix * vec4(position, 1.); vDepth = -mv.z; gl_Position = projectionMatrix * mv; }`;
  const TRAIL_FRAG = `
    uniform float uT; uniform float uSpeed; uniform float uPhase; uniform vec3 uColor; uniform float uNear; uniform float uFar;
    varying float vU; varying float vDepth;
    void main(){
      float f = fract(vU * 5. - uT * uSpeed + uPhase);
      float packet = smoothstep(0., .015, f) * smoothstep(.16, .015, f);
      float a = .16 + packet * .85;
      a *= 1. - smoothstep(uNear, uFar, vDepth);
      gl_FragColor = vec4(uColor, a);
    }`;
  (function buildTrails() {
    const TRAILS = coarse ? 4 : 7;
    for (let k = 0; k < TRAILS; k++) {
      const pts = [];
      const side = k % 2 ? 1 : -1, off = 4 + rand() * 9, y0 = -1.8 + rand() * 7;
      for (let z = zStart + 6; z >= zEnd; z -= 8) {
        pts.push(new THREE.Vector3(side * (off + Math.sin(z * .07 + k) * 2.6), y0 + Math.sin(z * .05 + k * 1.3) * 1.6, z));
      }
      const curve = new THREE.CatmullRomCurve3(pts);
      const P = curve.getPoints(Math.max(200, pts.length * 24));
      const g = track(new THREE.BufferGeometry().setFromPoints(P));
      const u = new Float32Array(P.length);
      for (let i = 0; i < P.length; i++) u[i] = i / (P.length - 1);
      g.setAttribute('aU', new THREE.BufferAttribute(u, 1));
      const m = track(new THREE.ShaderMaterial({
        uniforms: {
          uT, uSpeed: { value: .018 + rand() * .02 }, uPhase: { value: rand() },
          uColor: { value: new THREE.Color(k % 3 ? GOLD.rich : GOLD.bright) },
          uNear: { value: FOG_NEAR * .7 }, uFar: { value: FOG_FAR }
        },
        vertexShader: TRAIL_VERT, fragmentShader: TRAIL_FRAG, transparent: true, depthWrite: false
      }));
      scene.add(new THREE.Line(g, m));
    }
  })();

  /* the floor: a fine ledger grid receding into the fog */
  (function buildFloor() {
    const v = [], X = 30, Y = -3.2;
    for (let x = -X; x <= X; x += 2.5) v.push(x, Y, zStart + 10, x, Y, zEnd);
    for (let z = zStart + 10; z >= zEnd; z -= 2.5) v.push(-X, Y, z, X, Y, z);
    const g = track(new THREE.BufferGeometry());
    g.setAttribute('position', new THREE.Float32BufferAttribute(v, 3));
    scene.add(new THREE.LineSegments(g, edgeMat(GOLD.base, .16)));
  })();

  /* ------------------------------------------------- 4 · the compositions */
  function cluster(i, cx, cy, cz) {
    const group = new THREE.Group();
    group.position.set(cx, cy, cz);
    group.userData = { index: i, mats: [], spin: [], bob: [], bars: [], pulses: [] };
    scene.add(group);
    clusters.push(group);
    return group;
  }
  function addMat(group, m) { group.userData.mats.push({ m, base: m.uniforms ? m.uniforms.uAlpha.value : m.opacity }); return m; }
  function solid(group, geo, opts = {}) {
    track(geo);
    const holder = new THREE.Group();
    const edges = track(new THREE.EdgesGeometry(geo, opts.edgeAngle || 1));
    holder.add(new THREE.LineSegments(edges, addMat(group, edgeMat(opts.edge || GOLD.rich, opts.edgeOpacity ?? .6))));
    if (opts.face !== false) holder.add(new THREE.Mesh(geo, addMat(group, faceMat(opts.faceColor || GOLD.light, opts.faceOpacity ?? .07))));
    group.add(holder);
    return holder;
  }

  /* the core: a faceted gold lattice inside two orbital rings */
  function buildCore(g, scale) {
    const lattice = solid(g, new THREE.IcosahedronGeometry(1.25 * scale, 1), { edgeOpacity: .55, faceOpacity: .05 });
    const heart = solid(g, new THREE.OctahedronGeometry(.55 * scale, 0), { edge: GOLD.deep, edgeOpacity: .75, faceColor: GOLD.bright, faceOpacity: .16 });
    g.userData.spin.push({ o: lattice, v: [.05, .09, 0] }, { o: heart, v: [-.12, .18, .05] });
    [[1.85, .55, .2], [2.3, -.35, .9], [2.75, 1.1, -.4]].forEach(([r, rx, rz], k) => {
      const ring = new THREE.Mesh(track(new THREE.TorusGeometry(r * scale, .006 * scale, 6, 220)), addMat(g, faceMat(k ? GOLD.rich : GOLD.bright, .5)));
      ring.rotation.set(rx, 0, rz);
      g.add(ring);
      g.userData.spin.push({ o: ring, v: [0, .06 + k * .025, .02] });
    });
    const n = 140, pos = new Float32Array(n * 3), size = new Float32Array(n);
    for (let k = 0; k < n; k++) {
      const a = rand() * TAU, r = (2.0 + rand() * 1.4) * scale, y = (rand() - .5) * .5 * scale;
      pos[k * 3] = Math.cos(a) * r; pos[k * 3 + 1] = y; pos[k * 3 + 2] = Math.sin(a) * r;
      size[k] = .05 + rand() * .08;
    }
    const halo = new THREE.Points(pointsGeometry(pos, size), addMat(g, moteMaterial(.9, .3)));
    halo.rotation.x = .35;
    g.add(halo);
    g.userData.spin.push({ o: halo, v: [0, .05, 0] });
  }

  /* a constellation: nodes on a shell, joined to their nearest neighbours,
     with packets travelling the links */
  function buildNetwork(g, scale) {
    const n = coarse ? 30 : 46, R = 3.0 * scale;
    const nodes = [];
    for (let k = 0; k < n; k++) {
      const u = rand() * 2 - 1, a = rand() * TAU, r = R * (.55 + rand() * .45);
      nodes.push(new THREE.Vector3(Math.sqrt(1 - u * u) * Math.cos(a) * r, u * r * .7, Math.sqrt(1 - u * u) * Math.sin(a) * r));
    }
    const links = [], seen = new Set();
    nodes.forEach((p, a) => {
      nodes.map((q, b) => [b, p.distanceToSquared(q)]).filter(([b]) => b !== a)
        .sort((x, y) => x[1] - y[1]).slice(0, 3).forEach(([b]) => {
          const key = a < b ? a + ':' + b : b + ':' + a;
          if (!seen.has(key)) { seen.add(key); links.push([a, b]); }
        });
    });
    const v = [];
    links.forEach(([a, b]) => v.push(nodes[a].x, nodes[a].y, nodes[a].z, nodes[b].x, nodes[b].y, nodes[b].z));
    const lg = track(new THREE.BufferGeometry());
    lg.setAttribute('position', new THREE.Float32BufferAttribute(v, 3));
    const web = new THREE.Group();
    web.add(new THREE.LineSegments(lg, addMat(g, edgeMat(GOLD.rich, .3))));
    const np = new Float32Array(n * 3), ns = new Float32Array(n);
    nodes.forEach((p, k) => { np[k * 3] = p.x; np[k * 3 + 1] = p.y; np[k * 3 + 2] = p.z; ns[k] = .14 + rand() * .14; });
    web.add(new THREE.Points(pointsGeometry(np, ns, nodes.map(() => GOLD.deep)), addMat(g, moteMaterial(1, 0))));
    const P = Math.min(links.length, coarse ? 14 : 26);
    const pp = new Float32Array(P * 3), ps = new Float32Array(P).fill(.2);
    const pg = pointsGeometry(pp, ps, new Array(P).fill(GOLD.bright));
    web.add(new THREE.Points(pg, addMat(g, moteMaterial(1, 0))));
    for (let k = 0; k < P; k++) {
      const [a, b] = links[(k * 7) % links.length];
      g.userData.pulses.push({ a: nodes[a], b: nodes[b], t: rand(), sp: .25 + rand() * .35, idx: k, geo: pg });
    }
    g.add(web);
    g.userData.spin.push({ o: web, v: [0, .035, 0] });
  }

  /* floating structures: a loose cloud of polyhedra, turning slowly */
  function buildPrisms(g, scale) {
    const shapes = [
      () => new THREE.OctahedronGeometry(1, 0), () => new THREE.TetrahedronGeometry(1, 0),
      () => new THREE.DodecahedronGeometry(1, 0), () => new THREE.BoxGeometry(1.2, 1.2, 1.2),
      () => new THREE.IcosahedronGeometry(1, 0)
    ];
    const count = coarse ? 6 : 9;
    for (let k = 0; k < count; k++) {
      const s = (.35 + rand() * .7) * scale;
      const geo = shapes[k % shapes.length]();
      geo.scale(s, s, s);
      const o = solid(g, geo, { edgeOpacity: .5 + rand() * .2, faceOpacity: .05 + rand() * .06 });
      const a = rand() * TAU, r = (1.2 + rand() * 2.4) * scale;
      o.position.set(Math.cos(a) * r, (rand() - .4) * 3.2 * scale, Math.sin(a) * r * .6);
      g.userData.spin.push({ o, v: [(rand() - .5) * .4, (rand() - .5) * .5, (rand() - .5) * .2] });
      g.userData.bob.push({ o, y0: o.position.y, amp: .12 + rand() * .2, sp: .4 + rand() * .5, ph: rand() * TAU });
    }
  }

  /* an abstract bar chart standing on its own plinth grid */
  function buildChart(g, scale) {
    const cols = coarse ? 5 : 7, rows = 4, step = .9 * scale;
    const plinth = [];
    const half = (cols - 1) * step / 2, halfR = (rows - 1) * step / 2;
    for (let c = 0; c <= cols; c++) plinth.push(-half - step / 2 + c * step, -1.6, -halfR - step / 2, -half - step / 2 + c * step, -1.6, halfR + step / 2);
    for (let r = 0; r <= rows; r++) plinth.push(-half - step / 2, -1.6, -halfR - step / 2 + r * step, half + step / 2, -1.6, -halfR - step / 2 + r * step);
    const pg = track(new THREE.BufferGeometry());
    pg.setAttribute('position', new THREE.Float32BufferAttribute(plinth, 3));
    g.add(new THREE.LineSegments(pg, addMat(g, edgeMat(GOLD.base, .35))));
    for (let c = 0; c < cols; c++) for (let r = 0; r < rows; r++) {
      const geo = new THREE.BoxGeometry(step * .55, 1, step * .55);
      geo.translate(0, .5, 0);
      const bar = solid(g, geo, { edgeOpacity: .5, faceColor: GOLD.bright, faceOpacity: .08 });
      bar.position.set(-half + c * step, -1.6, -halfR + r * step);
      const h = (.6 + (c / cols) * 2.4 + rand() * 1.1) * scale;
      bar.scale.y = h;
      g.userData.bars.push({ o: bar, h, ph: rand() * TAU });
    }
    g.rotation.y = -.5;
  }

  /* a gyroscope of nested rings with satellites riding them */
  function buildRings(g, scale) {
    for (let k = 0; k < 4; k++) {
      const ring = new THREE.Mesh(track(new THREE.TorusGeometry((1.0 + k * .62) * scale, .007 * scale, 6, 200)), addMat(g, faceMat(k % 2 ? GOLD.rich : GOLD.bright, .55)));
      ring.rotation.set(rand() * TAU, rand() * TAU, 0);
      g.add(ring);
      g.userData.spin.push({ o: ring, v: [.08 + k * .03, .05 - k * .02, .03] });
      const rider = new THREE.Mesh(track(new THREE.SphereGeometry(.07 * scale, 10, 8)), addMat(g, faceMat(GOLD.deep, .85)));
      rider.position.x = (1.0 + k * .62) * scale;
      ring.add(rider);
    }
    solid(g, new THREE.OctahedronGeometry(.4 * scale, 0), { edge: GOLD.deep, edgeOpacity: .7, faceOpacity: .14 });
  }

  /* one composition per section. Each stands to the side the copy is not
     on, so the reading column stays clear; the hero's stands behind the
     wordmark, as the temple stands behind Kage's. */
  const BUILDERS = [buildCore, buildNetwork, buildPrisms, buildChart, buildRings];
  for (let i = 0; i < N; i++) {
    if (i === 0) { buildCore(cluster(0, 0, 3.2, zOf(0) - 17), 1.8); continue; }
    const side = i % 2 ? 1 : -1;
    const g = cluster(i, side * 9.4, .6 + (rand() - .5) * 1.2, zOf(i) - 9);
    BUILDERS[1 + ((i - 1) % (BUILDERS.length - 1))](g, 1.15);
  }

  /* ================================================= 8 · the camera rig */
  const CAM = [];
  for (let i = 0; i < N; i++) {
    if (i === 0) { CAM.push({ p: [0, 1.4, 9.5], t: [0, 1.6, -14], fov: 42 }); continue; }
    const side = i % 2 ? 1 : -1;
    CAM.push({ p: [-side * 1.6, 1.3 + Math.sin(i * 1.7) * .5, zOf(i) + 4], t: [side * 3.2, .6, zOf(i) - 14], fov: 46 + (i % 3) * 2 });
  }
  if (CAM.length === 1) CAM.push({ p: [0, 1.4, 2], t: [0, 1.4, -20], fov: 46 });
  const RIG = { prog: 0, smooth: 0, mx: 0, my: 0, tmx: 0, tmy: 0, intro: reduce ? 1 : 0 };
  const curveP = new THREE.CatmullRomCurve3(CAM.map(c => new THREE.Vector3(...c.p)), false, 'catmullrom', .42);
  const curveT = new THREE.CatmullRomCurve3(CAM.map(c => new THREE.Vector3(...c.t)), false, 'catmullrom', .42);
  const _p = new THREE.Vector3(), _t = new THREE.Vector3(), _d = new THREE.Vector3();

  /* on a tall frame, step back along the view axis and open up a little */
  function aspectFix() { return clamp((1.62 - vpW() / vpH()) / 1.05, 0, 1); }
  function fitAspect(p, t, fov) {
    const nf = aspectFix();
    if (nf <= 0) return fov;
    _d.subVectors(p, t).normalize();
    p.addScaledVector(_d, nf * 6.5);
    p.y += nf * .8;
    return fov * (1 + nf * .38);
  }
  function applyCamera() {
    const M = CAM.length - 1;
    const u = clamp(RIG.smooth / M, 0, 1);
    curveP.getPoint(u, _p); curveT.getPoint(u, _t);
    const i = clamp(Math.floor(RIG.smooth), 0, M - 1), f = clamp(RIG.smooth - i, 0, 1);
    let fov = lerp(CAM[i].fov, CAM[i + 1].fov, f);
    fov = fitAspect(_p, _t, fov);
    /* the opening dolly: a long lens easing in from further back */
    const io = 1 - RIG.intro;
    _p.z += io * 6.5; _p.y += io * .8; fov += io * 7;
    /* parallax — a hand-held drift, never enough to break the frame */
    _p.x += RIG.mx * .62; _p.y += RIG.my * .34;
    _t.x -= RIG.mx * .2; _t.y -= RIG.my * .12;
    camera.position.copy(_p);
    camera.lookAt(_t);
    if (Math.abs(camera.fov - fov) > 1e-4) { camera.fov = fov; camera.updateProjectionMatrix(); }
  }

  /* ============================================== 9 · scroll ↔ chapters */
  let anchors = [], maxScroll = 1;
  function measure() {
    maxScroll = Math.max(1, document.documentElement.scrollHeight - vpH());
    anchors = sections.map((el, i) => {
      if (i === 0) return 0;
      if (i === sections.length - 1) return maxScroll;
      const top = el.getBoundingClientRect().top + window.scrollY;
      return clamp(top + el.offsetHeight * .5 - vpH() * .5, 0, maxScroll);
    });
    for (let i = 1; i < anchors.length; i++) anchors[i] = Math.max(anchors[i], anchors[i - 1] + 1);
  }
  function progressFor(y) {
    if (!anchors.length || y <= anchors[0]) return 0;
    for (let i = 0; i < anchors.length - 1; i++)
      if (y <= anchors[i + 1]) return i + (y - anchors[i]) / (anchors[i + 1] - anchors[i]);
    return anchors.length - 1;
  }

  /* ==================================================== 13 · the machine */
  let running = false, tPrev = 0, clock = 0, introT0 = 0, raf = 0;

  function resize() {
    const w = vpW(), h = vpH();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, DPR_CAP) * PERF.scale);
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
    uPx.value = h * renderer.getPixelRatio() * .5;
    measure();
  }

  const _a = new THREE.Vector3();
  function updateWorld(dt) {
    uT.value = clock;
    clusters.forEach(g => {
      const ud = g.userData;
      /* the chapter in view comes forward; the others recede into the fog */
      const focus = 1 - smooth(0, 1.35, Math.abs(RIG.smooth - ud.index));
      ud.mats.forEach(({ m, base }) => {
        const v = base * (.32 + .68 * focus);
        if (m.uniforms) m.uniforms.uAlpha.value = v; else m.opacity = v;
      });
      if (reduce) return;
      ud.spin.forEach(({ o, v }) => { o.rotation.x += v[0] * dt; o.rotation.y += v[1] * dt; o.rotation.z += v[2] * dt; });
      ud.bob.forEach(b => { b.o.position.y = b.y0 + Math.sin(clock * b.sp + b.ph) * b.amp; });
      ud.bars.forEach(b => {
        const grow = .25 + .75 * smooth(.15, 1, focus);
        b.o.scale.y = Math.max(.02, b.h * grow * (1 + Math.sin(clock * .8 + b.ph) * .06));
      });
      if (ud.pulses.length) {
        const arr = ud.pulses[0].geo.attributes.position;
        ud.pulses.forEach(p => {
          p.t = (p.t + dt * p.sp) % 1;
          _a.lerpVectors(p.a, p.b, p.t);
          arr.setXYZ(p.idx, _a.x, _a.y, _a.z);
        });
        arr.needsUpdate = true;
      }
    });
  }

  function step(now, dt, raw) {
    clock += dt;
    if (!reduce && !PERF.locked && clock > 2.2) {
      PERF.acc += raw; PERF.n++;      /* … but the governor reads the truth */
      if (PERF.n >= 40 || PERF.acc > .9) {
        const avg = PERF.acc / PERF.n; PERF.acc = 0; PERF.n = 0;
        if (avg > .0230 && PERF.scale > .55) { PERF.scale = Math.max(.55, PERF.scale * (avg > .05 ? .64 : .85)); resize(); }
        else if (avg < .0138 && PERF.scale < 1) { PERF.scale = Math.min(1, PERF.scale + .08); resize(); }
      }
    }
    RIG.prog = progressFor(window.scrollY);
    RIG.smooth = reduce ? RIG.prog : damp(RIG.smooth, RIG.prog, 4.6, dt);
    RIG.mx = damp(RIG.mx, RIG.tmx, 2.6, dt);
    RIG.my = damp(RIG.my, RIG.tmy, 2.6, dt);
    if (introT0) RIG.intro = sat((now - introT0) / 2400);
    applyCamera();
    updateWorld(dt);
    renderer.render(scene, camera);
  }

  function frame(now) {
    if (!running) return;
    const raw = (now - tPrev) / 1000 || 0;
    const dt = Math.min(raw, .05);              /* animation never jumps … */
    tPrev = now;
    step(now, dt, raw);
    raf = requestAnimationFrame(frame);
  }

  /* reduced motion: no loop at all — one still frame per scroll or resize */
  let pending = 0;
  function renderStill() {
    if (pending) return;
    pending = requestAnimationFrame(() => { pending = 0; step(performance.now(), 0, 0); });
  }

  function onVisibility() {
    if (reduce) return;
    if (document.hidden) { running = false; cancelAnimationFrame(raf); }
    else if (!running) { running = true; tPrev = performance.now(); raf = requestAnimationFrame(frame); }
  }
  function onResize() { resize(); if (reduce) renderStill(); }
  function onScroll() { if (reduce) renderStill(); }

  return {
    start() {
      window.addEventListener('resize', onResize, { passive: true });
      window.addEventListener('scroll', onScroll, { passive: true });
      document.addEventListener('visibilitychange', onVisibility);
      resize();
      RIG.smooth = RIG.prog = progressFor(window.scrollY);
      if (reduce) { renderStill(); return; }
      introT0 = performance.now();
      running = true; tPrev = performance.now();
      raf = requestAnimationFrame(frame);
    },
    measure() { measure(); if (reduce) renderStill(); },
    setPointer(nx, ny) { RIG.tmx = nx; RIG.tmy = ny; },
    dispose() {
      running = false; cancelAnimationFrame(raf); cancelAnimationFrame(pending);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisibility);
      disposables.forEach(d => d.dispose && d.dispose());
      renderer.dispose();
    }
  };
}
