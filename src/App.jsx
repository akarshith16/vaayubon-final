import { useRef, useEffect, useState } from 'react';
import {
  motion, useScroll, useTransform, useSpring, useInView,
  useVelocity, useMotionValue, animate,
} from 'framer-motion';
import './index.css';
import { WORLD, INDIA, INDIA_STATES, AP, AP_DISTRICTS, ANANTAPUR, FOCUS } from './mapdata';

import homeProblem from './assets/img/home_problem.png';
import homeSolution from './assets/img/home_solution.png';
import homeField from './assets/img/home_field.png';
import techPyrolysis from './assets/img/tech_pyrolysis.png';
import techMachinery from './assets/img/tech_machinery.png';
import commFarmer from './assets/img/comm_farmer.png';
import commSoil from './assets/img/comm_soil.png';
import storySetting from './assets/img/story_setting.png';

/* ---------------- reliable scroll progress ----------------
   useScroll's offset-based section progress proved unreliable in
   some browsers, so progress is computed directly from layout. */
function useScrollProgress(ref, calc) {
  const mv = useMotionValue(0);
  useEffect(() => {
    const on = () => {
      const el = ref.current; if (!el) return;
      const r = el.getBoundingClientRect();
      const p = calc(r, window.innerHeight);
      mv.set(Math.min(1, Math.max(0, p)));
    };
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    on();
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); };
  }, []);
  return mv;
}
/* pinned section: 0 when its top hits the viewport top, 1 when its end stops scrolling */
const pinProgress = (r, vh) => -r.top / (r.height - vh);
/* free element: 0 entering from below, 1 fully scrolled past */
const viewProgress = (r, vh) => (vh - r.top) / (vh + r.height);

/* ---------------- motion presets ---------------- */
const EASE = [0.16, 1, 0.3, 1];
const reveal = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: EASE } },
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

function Reveal({ children, ...rest }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-90px' }}
      variants={reveal}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/* ---------------- cursor ember glow ---------------- */
function CursorGlow() {
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const sx = useSpring(x, { stiffness: 60, damping: 18 });
  const sy = useSpring(y, { stiffness: 60, damping: 18 });
  useEffect(() => {
    const move = (e) => { x.set(e.clientX - 200); y.set(e.clientY - 200); };
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, [x, y]);
  return (
    <motion.div
      aria-hidden
      style={{
        position: 'fixed', top: 0, left: 0, width: 400, height: 400,
        x: sx, y: sy, pointerEvents: 'none', zIndex: 1, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,122,61,0.07), transparent 65%)',
      }}
    />
  );
}

/* ---------------- count-up stat ---------------- */
function CountUp({ to, prefix = '', suffix = '', decimals = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const controls = animate(0, to, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = prefix + v.toFixed(decimals) + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, to, prefix, suffix, decimals]);
  return <span ref={ref}>{prefix}0{suffix}</span>;
}

/* ---------------- parallax image ---------------- */
function ParallaxImage({ src, alt, tag, ratio = '16/8', range = 14, children }) {
  const ref = useRef(null);
  const scrollYProgress = useScrollProgress(ref, viewProgress);
  const y = useTransform(scrollYProgress, [0, 1], [`-${range}%`, `${range}%`]);
  return (
    <div className="img-frame" ref={ref} style={{ aspectRatio: ratio }}>
      <motion.img src={src} alt={alt} style={{ y, scale: 1.3, willChange: 'transform' }} />
      {tag && <div className="img-tag">{tag}</div>}
      {children}
    </div>
  );
}

/* ================================================================
   SCROLLYTELLING CHAPTER
   Pinned full-screen scene. The background slowly zooms while the
   chapter title, then each caption card, fades in and out in
   sequence as the visitor scrubs through the chapter.
   ================================================================ */
function Chapter({ id, images, kicker, title, captions, align = 'left' }) {
  const ref = useRef(null);
  const scrollYProgress = useScrollProgress(ref, pinProgress);

  const imgs = Array.isArray(images) ? images : [images];
  const scale = useTransform(scrollYProgress, [0, 1], [1.06, 1.3]);
  const dim = useTransform(scrollYProgress, [0, 0.25, 1], [0.45, 0.62, 0.7]);

  const titleOp = useTransform(scrollYProgress, [0.02, 0.09, 0.2, 0.28], [0, 1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0.02, 0.09], [40, 0]);

  const start = 0.3, end = 0.96;
  const span = (end - start) / captions.length;

  /* each caption gets its own slice of the scroll */
  const capRanges = captions.map((_, i) => {
    const a = start + i * span;
    return [a, a + span * 0.22, a + span * 0.78, a + span];
  });

  /* background crossfade synced to each caption's entrance */
  const imgRanges = imgs.map((_, i) => {
    if (imgs.length === 1 || i === 0) return null;
    const a = capRanges[Math.min(i, capRanges.length - 1)][0];
    return [Math.max(0, a - 0.04), Math.min(1, a + 0.06)];
  });

  return (
    <section id={id} ref={ref} className="chapter" style={{ height: `${(captions.length + 2) * 100}vh` }}>
      <div className="chapter-pin">
        {imgs.map((src, i) => (
          <ChapterBg key={i} src={src} scale={scale} progress={scrollYProgress} range={imgRanges[i]} />
        ))}
        <motion.div className="chapter-dim" style={{ opacity: dim }} />
        <div className="chapter-vignette" />

        <motion.div className="chapter-title" style={{ opacity: titleOp, y: titleY }}>
          <span className="label">{kicker}</span>
          <h2>{title}</h2>
        </motion.div>

        {captions.map((cap, i) => (
          <ChapterCaption key={i} progress={scrollYProgress} range={capRanges[i]} align={align}
            index={i + 1} total={captions.length} {...cap} />
        ))}
      </div>
    </section>
  );
}

function ChapterBg({ src, scale, progress, range }) {
  const opacity = range ? useTransform(progress, range, [0, 1]) : 1;
  return (
    <motion.div className="chapter-bg" style={{ opacity }}>
      <motion.img src={src} alt="" style={{ scale, willChange: 'transform' }} />
    </motion.div>
  );
}

function ChapterCaption({ progress, range, head, body, align, index, total }) {
  const opacity = useTransform(progress, range, [0, 1, 1, 0]);
  const y = useTransform(progress, range, [44, 0, 0, -30]);
  return (
    <motion.div className={`chapter-caption ${align}`} style={{ opacity, y }}>
      <span className="cap-index">{String(index).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
      {head && <h3>{head}</h3>}
      <p>{body}</p>
    </motion.div>
  );
}

/* ================================================================
   MAP JOURNEY
   One continuous camera move through a single Mercator space:
   the world, then India, then Andhra Pradesh, then Anantapur.
   Scroll scrubs the flight; captions narrate each stage.
   ================================================================ */
const VB = FOCUS.world;
const VCX = VB[0] + VB[2] / 2;
const VCY = VB[1] + VB[3] / 2;

function cam(f, pad) {
  const s = Math.min(VB[2] / f[2], VB[3] / f[3]) * pad;
  return { s, cx: f[0] + f[2] / 2, cy: f[1] + f[3] / 2 };
}
const CAM = [
  { s: 1, cx: VCX, cy: VCY },          /* world  */
  cam(FOCUS.india, 0.6),               /* india  */
  cam(FOCUS.ap, 0.58),                 /* AP     */
  cam(FOCUS.anantapur, 0.5),           /* dist.  */
];
const CAM_P = [0.05, 0.24, 0.36, 0.52, 0.62, 0.8];
const CAM_I = [0, 1, 1, 2, 2, 3];

const MAP_CAPTIONS = [
  {
    p: [0.05, 0.085, 0.16, 0.22],
    head: 'It starts with the ground',
    body: 'Every credit we issue begins on a real farm, in real soil. Scroll to fly to where the work happens.',
  },
  {
    p: [0.26, 0.3, 0.38, 0.44],
    head: 'India',
    body: '100 million tonnes of crop residue are burned here every year. The largest unpriced carbon stream on Earth.',
  },
  {
    p: [0.54, 0.58, 0.64, 0.7],
    head: 'Andhra Pradesh',
    body: 'The Rayalaseema belt. Groundnut and rice country: drought prone, residue rich, and ready for a market.',
  },
  {
    p: [0.82, 0.88, 0.96, 1],
    head: 'Anantapur',
    body: 'Ground zero for Vaayubon. Here, farm waste becomes permanent carbon removal, and fires become income.',
  },
];

const STAGE_TAGS = [
  { p: [0.04, 0.07, 0.2, 0.26], t: 'THE EARTH' },
  { p: [0.27, 0.31, 0.4, 0.47], t: 'INDIA' },
  { p: [0.54, 0.58, 0.66, 0.72], t: 'ANDHRA PRADESH' },
  { p: [0.8, 0.85, 1, 1], t: 'ANANTAPUR DISTRICT · 14.68° N, 77.60° E' },
];

function MapCaption({ progress, cap }) {
  const opacity = useTransform(progress, cap.p, [0, 1, 1, 0]);
  const y = useTransform(progress, cap.p, [44, 0, 0, -30]);
  return (
    <motion.div className="chapter-caption left map-cap" style={{ opacity, y }}>
      <h3>{cap.head}</h3>
      <p>{cap.body}</p>
    </motion.div>
  );
}

function StageTag({ progress, tag }) {
  const opacity = useTransform(progress, tag.p, [0, 1, 1, 0]);
  return <motion.div className="map-stage" style={{ opacity }}>{tag.t}</motion.div>;
}

function MapJourney() {
  const ref = useRef(null);
  const gRef = useRef(null);
  const scrollYProgress = useScrollProgress(ref, pinProgress);
  const p = useSpring(scrollYProgress, { stiffness: 70, damping: 22, restDelta: 0.0001 });

  /* camera: interpolate zoom in log space for an even flight */
  const logS = useTransform(p, CAM_P, CAM_I.map((i) => Math.log(CAM[i].s)));
  const s = useTransform(logS, Math.exp);
  const cx = useTransform(p, CAM_P, CAM_I.map((i) => CAM[i].cx));
  const cy = useTransform(p, CAM_P, CAM_I.map((i) => CAM[i].cy));

  /* drive the SVG transform attribute directly: CSS transforms on SVG
     groups have inconsistent origin handling across browsers */
  useEffect(() => {
    const apply = () => {
      const el = gRef.current; if (!el) return;
      const sv = s.get(), a = cx.get(), b = cy.get();
      el.setAttribute('transform', `translate(${VCX - sv * a} ${VCY - sv * b}) scale(${sv})`);
    };
    const subs = [s, cx, cy].map((v) => v.on('change', apply));
    apply();
    return () => subs.forEach((u) => u());
  }, [s, cx, cy]);

  /* layers */
  const worldOp = useTransform(p, [0, 0.2, 0.34, 0.5], [0.9, 0.9, 0.16, 0]);
  const indiaOp = useTransform(p, [0.1, 0.24, 0.5, 0.66], [0, 1, 1, 0]);
  const statesOp = useTransform(p, [0.22, 0.32, 0.5, 0.6], [0, 0.55, 0.55, 0]);
  const apOp = useTransform(p, [0.4, 0.54], [0, 1]);
  const distOp = useTransform(p, [0.55, 0.66], [0, 0.65]);
  const anantaOp = useTransform(p, [0.64, 0.78], [0, 1]);
  const markerOp = useTransform(scrollYProgress, [0.8, 0.87], [0, 1]);
  const gridOp = useTransform(p, [0, 0.18, 0.3], [0.5, 0.5, 0]);
  const introOp = useTransform(scrollYProgress, [0, 0.018, 0.045], [1, 1, 0]);
  const introY = useTransform(scrollYProgress, [0, 0.045], [0, -40]);

  return (
    <section id="origin" ref={ref} className="chapter map-journey" style={{ height: '680vh' }}>
      <div className="chapter-pin">
        <div className="map-frame">
          <svg viewBox={`${VB[0]} ${VB[1]} ${VB[2]} ${VB[3]}`} preserveAspectRatio="xMidYMid slice">
            <g ref={gRef}>
              {/* graticule */}
              <motion.g style={{ opacity: gridOp }}>
                {Array.from({ length: 11 }, (_, i) => (
                  <line key={'v' + i} x1={i * 100} y1={VB[1]} x2={i * 100} y2={VB[1] + VB[3]}
                    stroke="rgba(242,237,228,0.05)" vectorEffect="non-scaling-stroke" />
                ))}
                {Array.from({ length: 7 }, (_, i) => (
                  <line key={'h' + i} x1="0" y1={VB[1] + i * 100} x2="1000" y2={VB[1] + i * 100}
                    stroke="rgba(242,237,228,0.05)" vectorEffect="non-scaling-stroke" />
                ))}
              </motion.g>

              {/* the world */}
              <motion.g style={{ opacity: worldOp }}>
                {WORLD.map((d, i) => (
                  <path key={i} d={d} fill="rgba(242,237,228,0.05)"
                    stroke="rgba(242,237,228,0.28)" strokeWidth="0.7" vectorEffect="non-scaling-stroke" />
                ))}
              </motion.g>

              {/* india */}
              <motion.g style={{ opacity: indiaOp }}>
                <path d={INDIA} fill="rgba(255,122,61,0.13)" stroke="#ff7a3d"
                  strokeWidth="1.1" vectorEffect="non-scaling-stroke" />
              </motion.g>
              <motion.g style={{ opacity: statesOp }}>
                {INDIA_STATES.map((st) => (
                  <path key={st.n} d={st.d} fill="none"
                    stroke="rgba(242,237,228,0.3)" strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
                ))}
              </motion.g>

              {/* andhra pradesh */}
              <motion.g style={{ opacity: apOp }}>
                <path d={AP} fill="rgba(255,122,61,0.1)" stroke="#ff7a3d"
                  strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
              </motion.g>
              <motion.g style={{ opacity: distOp }}>
                {AP_DISTRICTS.map((d) => (
                  <path key={d.n} d={d.d} fill="none"
                    stroke="rgba(242,237,228,0.3)" strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
                ))}
              </motion.g>

              {/* anantapur */}
              <motion.g style={{ opacity: anantaOp }}>
                <path d={ANANTAPUR} fill="rgba(255,122,61,0.32)" stroke="#ff9a63"
                  strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
              </motion.g>
            </g>
          </svg>

          {/* pulsing marker, screen centered on the final stage */}
          <motion.div className="map-marker" style={{ opacity: markerOp }}>
            <span className="ring" /><span className="dot" />
          </motion.div>
        </div>

        <motion.div className="map-intro" style={{ opacity: introOp, y: introY }}>
          <svg viewBox="0 0 320 56" className="intro-logo" role="img" aria-label="Vaayubon">
            <defs>
              <linearGradient id="vb-grad-i" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#8fbf63" />
                <stop offset="1" stopColor="#3c6a2e" />
              </linearGradient>
            </defs>
            <g transform="translate(163 4)">
              <path d="M0 14 C 0.4 9, 0.2 6, -0.6 2" stroke="#4f8a36" strokeWidth="1.6" fill="none" strokeLinecap="round" />
              <path d="M-1 4 C -7 2, -10 -1, -11 -5 C -6 -5, -2 -2, -1 4 Z" fill="#5d9a40" />
              <path d="M0 3 C 2 -2, 6 -5, 11 -5 C 10 0, 6 3, 0 3 Z" fill="#74b14e" />
            </g>
            <text x="160" y="40" textAnchor="middle" fontFamily="Fraunces, Georgia, serif"
              fontWeight="600" fontSize="31" letterSpacing="1.5" fill="url(#vb-grad-i)">VAAYUBON</text>
            <path d="M24 49 C 110 54.5, 215 53.5, 285 45 C 291 44, 294 41.5, 295.5 38"
              stroke="url(#vb-grad-i)" strokeWidth="2" fill="none" strokeLinecap="round" />
          </svg>
          <p className="intro-tag">Biochar carbon removal &middot; Andhra Pradesh, India</p>
          <p className="intro-line">We turn farm waste into permanent, verifiable carbon removal.</p>
          <div className="scroll-cue">Scroll to begin</div>
        </motion.div>

        <div className="map-overlay-top">
          <span className="label">The journey to the field</span>
          {STAGE_TAGS.map((t, i) => <StageTag key={i} progress={p} tag={t} />)}
        </div>

        {MAP_CAPTIONS.map((c, i) => <MapCaption key={i} progress={scrollYProgress} cap={c} />)}
      </div>
    </section>
  );
}

/* ---------------- nav with active section ---------------- */
const NAV = [
  ['Origin', 'origin'],
  ['Problem', 'problem'],
  ['Solution', 'solution'],
  ['Process', 'process'],
  ['Market', 'market'],
  ['Story', 'story'],
];

function Nav() {
  const [active, setActive] = useState('');
  useEffect(() => {
    const onScroll = () => {
      let current = '';
      for (const [, id] of NAV) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.45) current = id;
      }
      setActive(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: EASE, delay: 0.4 }}
    >
      <a href="#top" className="wordmark" aria-label="Vaayubon home">
        <svg viewBox="0 0 320 56" className="logo-svg" role="img" aria-label="Vaayubon">
          <defs>
            <linearGradient id="vb-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#8fbf63" />
              <stop offset="1" stopColor="#3c6a2e" />
            </linearGradient>
          </defs>
          {/* sprout above the U */}
          <g transform="translate(163 4)">
            <path d="M0 14 C 0.4 9, 0.2 6, -0.6 2" stroke="#4f8a36" strokeWidth="1.6" fill="none" strokeLinecap="round" />
            <path d="M-1 4 C -7 2, -10 -1, -11 -5 C -6 -5, -2 -2, -1 4 Z" fill="#5d9a40" />
            <path d="M0 3 C 2 -2, 6 -5, 11 -5 C 10 0, 6 3, 0 3 Z" fill="#74b14e" />
          </g>
          <text x="160" y="40" textAnchor="middle" fontFamily="Fraunces, Georgia, serif"
            fontWeight="600" fontSize="31" letterSpacing="1.5" fill="url(#vb-grad)">VAAYUBON</text>
          {/* underline swoosh */}
          <path d="M24 49 C 110 54.5, 215 53.5, 285 45 C 291 44, 294 41.5, 295.5 38"
            stroke="url(#vb-grad)" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
      </a>
      <div className="nav-links">
        {NAV.map(([t, id]) => (
          <a key={id} href={'#' + id} className={active === id ? 'active' : ''}>{t}</a>
        ))}
        <a className="cta-pill" href="mailto:invest@vaayubon.com">Invest</a>
      </div>
    </motion.nav>
  );
}

/* ---------------- velocity-reactive marquee ---------------- */
function Marquee() {
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const skew = useSpring(useTransform(velocity, [-1500, 1500], [-5, 5]), { stiffness: 200, damping: 40 });
  const items = (
    <>
      <span><b>100M</b> tonnes of residue burned annually</span>
      <span><b>$13.6B</b> in carbon value destroyed</span>
      <span><b>1,000+</b> year carbon permanence</span>
      <span><b>TRL 7-8</b> proven pyrolysis</span>
      <span><b>120+</b> pilot farmers</span>
    </>
  );
  return (
    <div className="marquee">
      <motion.div className="marquee-track" style={{ skewX: skew }}>{items}{items}</motion.div>
    </div>
  );
}

/* ---------------- scroll-scrubbed manifesto ---------------- */
const MANIFESTO = 'We turn the fires of crop waste into permanent, verifiable carbon removal. One field, one farmer, one tonne at a time.';

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.13, 1]);
  const color = useTransform(progress, range, ['#5c574f', '#f2ede4']);
  return (
    <motion.span style={{ opacity, color, display: 'inline-block', marginRight: '0.32ch' }}>
      {children}
    </motion.span>
  );
}

function Manifesto() {
  const ref = useRef(null);
  const scrollYProgress = useScrollProgress(ref, (r, vh) => (0.85 * vh - r.top) / (r.height + 0.45 * vh));
  const words = MANIFESTO.split(' ');
  return (
    <section style={{ padding: '13rem 0' }}>
      <div className="container" ref={ref}>
        <span className="label" style={{ marginBottom: '2.5rem', display: 'block' }}>The thesis</span>
        <h2 style={{ fontSize: 'clamp(1.9rem, 3.6vw, 3.4rem)', maxWidth: '26ch', fontWeight: 600, lineHeight: 1.25, letterSpacing: '-0.02em' }}>
          {words.map((w, i) => (
            <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
              {w}
            </Word>
          ))}
        </h2>
      </div>
    </section>
  );
}

/* ---------------- stats band ---------------- */
function StatsBand() {
  return (
    <section style={{ padding: '7rem 0' }}>
      <div className="glow" style={{ width: '36vw', height: '36vw', top: '-20%', right: '-12%', background: 'rgba(255,122,61,0.06)' }} />
      <div className="container">
        <motion.div
          className="stat-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
        >
          {[
            [<CountUp key="a" to={100} suffix="M" />, 'Tonnes burned', 'Crop residue burned in India every year'],
            [<CountUp key="b" to={13.6} prefix="$" suffix="B" decimals={1} />, 'Value destroyed', 'Potential carbon credit value lost to the fires'],
            [<CountUp key="c" to={1000} suffix="+" />, 'Year permanence', 'Carbon locked in stable form, far beyond forests'],
            [<CountUp key="d" to={120} suffix="+" />, 'Pilot farmers', 'Already active on the ground with Vaayubon'],
          ].map(([num, head, cap]) => (
            <motion.div className="panel" key={head} variants={reveal}>
              <div className="stat-num">{num}</div>
              <div className="stat-cap"><strong>{head}</strong>{cap}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- technology: pinned horizontal rail ---------------- */
const RAIL_CARDS = [
  ['01', 'Strategic feedstock', 'Five primary feedstock streams analyzed across the Rayalaseema belt. Rice straw and groundnut shells lead the MVP: high volume, zero cost, high biochar yield.'],
  ['02', 'Scale-up feedstock', 'Cotton stalks, widespread and high in lignin, are earmarked for the Year 2 scale-up.'],
  ['03', 'Wood vinegar', 'A natural pesticide and growth stimulant for India’s organic farming segment, and a high-value co-product.'],
  ['04', 'Syngas loop', 'Non-condensable gases are recirculated to fuel the process itself, cutting operational energy costs by 20-30%.'],
];

function ProcessRail() {
  const ref = useRef(null);
  const scrollYProgress = useScrollProgress(ref, pinProgress);
  const x = useTransform(scrollYProgress, [0.05, 0.95], ['4vw', '-58%']);
  return (
    <div ref={ref} style={{ height: '320vh', position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, height: '100svh', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden' }}>
        <div className="container" style={{ marginBottom: '3rem' }}>
          <span className="label">The chain, end to end</span>
        </div>
        <motion.div style={{ x, display: 'flex', gap: '1.4rem', width: 'max-content', paddingRight: '8vw' }}>
          {RAIL_CARDS.map(([n, h, b]) => (
            <div className="panel rail-card" key={n}>
              <span className="step-num">/ {n}</span>
              <h3 style={{ fontSize: '1.7rem', margin: '1.2rem 0 1rem' }}>{h}</h3>
              <p style={{ fontSize: '1rem' }}>{b}</p>
            </div>
          ))}
          <div className="panel rail-card rail-card-cta">
            <span className="step-num">/ 05</span>
            <h3 style={{ fontSize: '1.7rem', margin: '1.2rem 0 1rem' }}>Verified removal</h3>
            <p style={{ fontSize: '1rem' }}>Digital MRV closes the loop: every tonne measured, reported, and certified for institutional buyers.</p>
          </div>
        </motion.div>
        <div className="container" style={{ marginTop: '3rem' }}>
          <span className="scroll-cue" style={{ flexDirection: 'row' }}>Keep scrolling</span>
        </div>
      </div>
    </div>
  );
}

function Technology() {
  return (
    <section style={{ paddingBottom: 0, paddingTop: '7rem' }}>
      <div className="container">
        <div className="grid-2">
          <Reveal>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1.2rem' }}>The Pyrolysis Engine</h3>
            <p>
              Commercially mature technology operating at TRL 7-8: thermal
              decomposition of organic biomass at 400-700&deg;C in a
              low-oxygen environment.
            </p>
            <p style={{ marginTop: '1rem', color: 'var(--ink)' }}>
              Our innovation is the end-to-end supply chain, from farmer
              logistics to fully digital Monitoring, Reporting, and Verification.
            </p>
          </Reveal>
          <Reveal>
            <ParallaxImage src={techMachinery} alt="Continuous pyrolysis machinery" tag="The machinery" ratio="16/10" />
          </Reveal>
        </div>
      </div>
      <ProcessRail />
    </section>
  );
}

/* ---------------- market details (follows the Market chapter) ---------------- */
function MarketDetails() {
  return (
    <section style={{ background: 'var(--bg-2)' }}>
      <div className="glow" style={{ width: '38vw', height: '38vw', top: '0%', right: '-10%', background: 'rgba(255,122,61,0.05)' }} />
      <div className="container">
        <div className="grid-2">
          <Reveal>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>Three revenue streams</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div className="panel">
                <h4 style={{ color: 'var(--ember)', marginBottom: '0.5rem' }}>Verified carbon credits</h4>
                <p style={{ fontSize: '0.95rem' }}>Forward offtake contracts with corporate buyers at a conservative blended rate of $136 per tonne, in a CDR market projected to reach $25B by 2029.</p>
              </div>
              <div className="panel">
                <h4 style={{ marginBottom: '0.5rem' }}>Physical biochar sales</h4>
                <p style={{ fontSize: '0.95rem' }}>Subsidized biochar applied back to partner farms, improving crop yields by 15-30% and adding $150 per year to household income.</p>
              </div>
              <div className="panel">
                <h4 style={{ marginBottom: '0.5rem' }}>Pyrolysis co-products</h4>
                <p style={{ fontSize: '0.95rem' }}>Wood vinegar and syngas generate high-margin incremental revenue at scale, supporting 32% net margins.</p>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>Rigorous certification</h3>
            <p>Dual certification through the world&rsquo;s leading registries, for institutional-grade credibility.</p>
            <div className="grid-2-tight" style={{ marginTop: '1.5rem' }}>
              <div className="panel">
                <h4 style={{ marginBottom: '0.4rem' }}>Puro.earth</h4>
                <p style={{ fontSize: '0.85rem' }}>Track initiated with an engaged India-based auditor.</p>
              </div>
              <div className="panel">
                <h4 style={{ marginBottom: '0.4rem' }}>Verra VCS</h4>
                <p style={{ fontSize: '0.85rem' }}>Project Description preparation actively underway.</p>
              </div>
            </div>
          </Reveal>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          style={{ marginTop: '7rem' }}
        >
          <Reveal className="section-head" style={{ marginBottom: '3rem' }}>
            <span className="label">Four competitive moats</span>
          </Reveal>
          <div className="grid-2-tight" style={{ gap: '1.2rem' }}>
            {[
              ['Zero-cost feedstock', 'Competitors purchase biomass. Our farmer-as-partner model receives residue freely, in exchange for subsidized biochar.'],
              ['Government integration', 'AP Government rural channel partnerships grant verified extension services and a massive smallholder network.'],
              ['End-to-end MRV', 'Owning the full digital verification chain bypasses the third-party MRV fees that erode competitors\u2019 margins.'],
              ['First-mover advantage', 'A 12 to 18 month head-start in the under-served Rayalaseema belt before credible geographic competition emerges.'],
            ].map(([h, b], i) => (
              <motion.div className="panel" key={h} variants={reveal}>
                <span className="step-num">/ 0{i + 1}</span>
                <h3 style={{ fontSize: '1.4rem', margin: '0.8rem 0 0.6rem' }}>{h}</h3>
                <p style={{ fontSize: '0.95rem' }}>{b}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- footer ---------------- */
function Footer() {
  return (
    <footer>
      <div className="glow" style={{ width: '50vw', height: '30vw', bottom: '-25%', left: '25%', background: 'rgba(255,122,61,0.08)' }} />
      <div className="container">
        <Reveal>
          <span className="label" style={{ marginBottom: '2rem', display: 'block' }}>06 &middot; Join us</span>
          <a href="mailto:invest@vaayubon.com" className="footer-mega" style={{ display: 'block' }}>
            Build India&rsquo;s<br /><span style={{ color: 'var(--ember)' }}>carbon future</span> with us &rarr;
          </a>
        </Reveal>
        <div className="footer-meta">
          <small>&copy; 2026 Vaayubon &middot; Nandyal, Andhra Pradesh, India</small>
          <small><a href="mailto:invest@vaayubon.com" style={{ color: 'var(--muted)' }}>invest@vaayubon.com</a></small>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- app ---------------- */
export default function App() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <>
      <div className="grain" />
      <CursorGlow />
      <motion.div className="progress-bar" style={{ scaleX: progress }} />
      <Nav />
      <main id="top">
        <MapJourney />
        <Marquee />
        <Manifesto />

        <Chapter
          id="problem"
          images={homeProblem}
          kicker="Chapter 01 &middot; The Problem"
          title={<>Every year, India burns <span className="outline">$13.6 billion</span> worth of carbon.</>}
          captions={[
            { head: 'Zero value, zero choice', body: 'For a smallholder farmer, crop residue has no disposal cost and no revenue. Burning it is free.' },
            { head: 'The fires', body: 'So millions of tonnes burn across the Rayalaseema belt every season. Each fire destroys a feedstock asset, degrades soil, and pollutes the air.' },
            { head: 'A market failure', body: 'This is not negligence. It is rational behavior in the absence of a market. Vaayubon exists to build that market.' },
          ]}
        />
        <StatsBand />

        <Chapter
          id="solution"
          images={homeSolution}
          kicker="Chapter 02 &middot; The Solution"
          title={<>We turn that fire into <span className="accent">certified carbon credits.</span></>}
          captions={[
            { head: 'Biochar', body: 'Charred biomass that locks carbon in a stable form for over a millennium. Permanence that forests cannot promise.' },
            { head: 'Back to the soil', body: 'The same char returns fertility and water retention to the fields the residue came from.' },
            { head: 'Two winners', body: 'Institutional buyers get verified, high durability removal. Farmers get a new income stream. The fires stop.' },
          ]}
        />

        <Chapter
          id="process"
          images={[homeField, techPyrolysis, commSoil, commFarmer]}
          kicker="Chapter 03 &middot; The Process"
          title={<>From field, to flame, to <span className="accent">permanence.</span></>}
          captions={[
            { head: '01 \u00b7 Collect', body: 'Rice straw and groundnut shells, gathered at zero cost from partner farms across the belt.' },
            { head: '02 \u00b7 Pyrolyze', body: 'Thermal decomposition at 400-700\u00b0C in a low oxygen chamber. No burning, no smoke, no loss.' },
            { head: '03 \u00b7 Lock', body: 'Half of the biomass carbon becomes stable char, sequestered for a thousand years or more.' },
            { head: '04 \u00b7 Return', body: 'Subsidized biochar goes back to partner farms, lifting crop yields by 15-30%. Every tonne is digitally measured, reported, and verified.' },
          ]}
        />
        <Technology />

        <Chapter
          id="market"
          images={commFarmer}
          kicker="Chapter 04 &middot; The Market"
          title={<>Built to <span className="accent">scale</span>. Defensible by design.</>}
          captions={[
            { head: 'Three revenue streams', body: 'Verified carbon credits at $136 per tonne, physical biochar sales, and high-margin pyrolysis co-products.' },
            { head: 'Institutional grade', body: 'Dual certification through Puro.earth and Verra VCS, in a carbon removal market projected to reach $25B by 2029.' },
            { head: 'Four moats', body: 'Zero-cost feedstock, government integration, end-to-end digital MRV, and a 12 to 18 month first-mover head-start.' },
          ]}
        />
        <MarketDetails />

        <Chapter
          id="story"
          images={storySetting}
          kicker="Chapter 05 &middot; The Story"
          title={<>From <span className="accent">Nandyal</span> to net-zero.</>}
          captions={[
            { head: 'Roots', body: 'Born from deep agricultural roots in Nandyal, Andhra Pradesh, and incubated at the IE Climate Tech Lab 2026. We watched the fires firsthand.' },
            { head: 'The insight', body: 'Countless interviews with farmers, officials, and buyers taught us one thing: income reliability is paramount. That insight is the bedrock of Vaayubon.' },
            { head: 'The team', body: 'Founded by Srihas Vunnam, Manu Muralee, and Akarshith Reddy. Backed by 120+ pilot farmers, and inviting the world to build India\u2019s carbon future.' },
          ]}
        />

        <Footer />
      </main>
    </>
  );
}
