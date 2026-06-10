import { useRef, useEffect, useState } from 'react';
import {
  motion, useScroll, useTransform, useSpring, useInView,
  useVelocity, useMotionValue, animate,
} from 'framer-motion';
import './index.css';

import heroImg from './assets/hero.png';
import homeProblem from './assets/img/home_problem.png';
import homeSolution from './assets/img/home_solution.png';
import techProcess from './assets/img/tech_process.png';
import techMachinery from './assets/img/tech_machinery.png';
import commFarmer from './assets/img/comm_farmer.png';
import commSoil from './assets/img/comm_soil.png';
import storySetting from './assets/img/story_setting.png';

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
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${range}%`, `${range}%`]);
  return (
    <div className="img-frame" ref={ref} style={{ aspectRatio: ratio }}>
      <motion.img src={src} alt={alt} style={{ y, scale: 1.3, willChange: 'transform' }} />
      {tag && <div className="img-tag">{tag}</div>}
      {children}
    </div>
  );
}

/* ---------------- scroll-scrubbed temperature readout ---------------- */
function PyrolysisImage() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-18%', '18%']);
  const tempRef = useRef(null);
  useEffect(() => {
    return scrollYProgress.on('change', (p) => {
      if (tempRef.current) {
        const t = Math.round(400 + Math.min(Math.max(p, 0), 1) * 300);
        tempRef.current.textContent = t + '°C';
      }
    });
  }, [scrollYProgress]);
  return (
    <div className="img-frame" ref={ref} style={{ aspectRatio: '21/8' }}>
      <motion.img src={techProcess} alt="Pyrolysis glowing internal view" style={{ y, scale: 1.3, willChange: 'transform' }} />
      <div className="img-tag">The process &middot; low-oxygen thermal decomposition</div>
      <div className="temp-readout">
        <span className="temp-label">Core temp</span>
        <span ref={tempRef} className="temp-value">400&deg;C</span>
      </div>
    </div>
  );
}

/* ---------------- nav with active section ---------------- */
const NAV = [
  ['Problem', 'problem'],
  ['Solution', 'solution'],
  ['Technology', 'technology'],
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
      <a href="#top" className="wordmark">VAAYU<span>BON</span></a>
      <div className="nav-links">
        {NAV.map(([t, id]) => (
          <a key={id} href={'#' + id} className={active === id ? 'active' : ''}>{t}</a>
        ))}
        <a className="cta-pill" href="mailto:invest@vaayubon.com">Invest</a>
      </div>
    </motion.nav>
  );
}

/* ---------------- hero ---------------- */
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const rise = useTransform(scrollYProgress, [0, 0.7], ['0%', '-12%']);

  return (
    <header className="hero" id="top" ref={ref}>
      <motion.div className="hero-bg" style={{ y: bgY, scale: bgScale }}>
        <img src={heroImg} alt="Agricultural fields at dusk" />
      </motion.div>
      <motion.div className="container" style={{ opacity: fade, y: rise }}>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.6 }}
          className="label"
          style={{ marginBottom: '1.6rem' }}
        >
          Biochar Carbon Removal &middot; Andhra Pradesh, India
        </motion.p>
        <h1 className="mega">
          {['The future of', 'carbon is rooted', 'in agriculture.'].map((line, i) => (
            <span key={line} style={{ display: 'block', overflow: 'hidden' }}>
              <motion.span
                style={{ display: 'block' }}
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, ease: EASE, delay: 0.7 + i * 0.13 }}
              >
                {i === 1 ? <>carbon is <span className="accent">rooted</span></> : line}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.6 }}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '3.5rem', flexWrap: 'wrap', gap: '2rem' }}
        >
          <p style={{ maxWidth: '440px' }}>
            Turning agricultural waste into institutional-grade carbon removal,
            at the intersection of global climate mandates, farmer empowerment, and
            commercially proven pyrolysis.
          </p>
          <div className="scroll-cue">Scroll</div>
        </motion.div>
      </motion.div>
    </header>
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
      <span><b>TRL 7&ndash;8</b> proven pyrolysis</span>
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
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.4'] });
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

/* ---------------- problem ---------------- */
function Problem() {
  return (
    <section id="problem" style={{ paddingTop: '2rem' }}>
      <div className="glow" style={{ width: '40vw', height: '40vw', top: '-10%', right: '-15%', background: 'rgba(194,65,39,0.07)' }} />
      <div className="container">
        <Reveal className="section-head">
          <span className="index-num">01</span>
          <span className="label">The Problem</span>
        </Reveal>

        <Reveal>
          <h2 className="mega" style={{ fontSize: 'clamp(2.4rem, 5vw, 5rem)', maxWidth: '18ch' }}>
            Every year, India burns <span className="outline">$13.6 billion</span> worth of carbon.
          </h2>
        </Reveal>

        <div className="grid-2" style={{ marginTop: '5rem' }}>
          <Reveal>
            <ParallaxImage src={homeProblem} alt="Agricultural field burning" tag="Field burning &middot; Rayalaseema" ratio="4/3" />
          </Reveal>
          <Reveal style={{ paddingTop: '2rem' }}>
            <p style={{ fontSize: '1.2rem', color: 'var(--ink)', marginBottom: '1.5rem' }}>
              Smallholder farmers face a structural economic failure: crop residue
              has zero disposal cost and zero revenue.
            </p>
            <p>
              With no economic alternative, millions of tonnes of residue are burned
              en masse across the Rayalaseema belt and beyond. Each fire destroys a
              feedstock asset, degrades soil, and pollutes the air. It is rational
              behavior in the absence of a market.
            </p>
            <div style={{ display: 'flex', gap: '3rem', marginTop: '3rem' }}>
              <div>
                <div className="stat-num"><CountUp to={100} suffix="M" /></div>
                <div className="stat-cap"><strong>Tonnes</strong>of crop residue burned in India annually</div>
              </div>
              <div>
                <div className="stat-num"><CountUp to={13.6} prefix="$" suffix="B" decimals={1} /></div>
                <div className="stat-cap"><strong>Destroyed</strong>in potential carbon credit value</div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- solution ---------------- */
function Solution() {
  return (
    <section id="solution" style={{ background: 'var(--bg-2)' }}>
      <div className="glow" style={{ width: '36vw', height: '36vw', bottom: '-10%', left: '-12%', background: 'rgba(255,122,61,0.06)' }} />
      <div className="container">
        <Reveal className="section-head">
          <span className="index-num">02</span>
          <span className="label">The Solution</span>
        </Reveal>

        <div className="grid-2">
          <Reveal>
            <h2 className="h2" style={{ marginBottom: '2rem' }}>
              We convert crop residue into{' '}
              <span className="serif-i" style={{ color: 'var(--ember)' }}>certified biochar carbon credits.</span>
            </h2>
            <p>
              Vaayubon bridges the gap between India&rsquo;s massive agricultural
              waste streams and institutional demand from technology giants for
              verified, high-durability carbon removal.
            </p>
            <p style={{ marginTop: '1.2rem' }}>
              Biochar locks carbon into a stable form for over a millennium,
              while returning fertility to the very soil the residue came from.
            </p>
          </Reveal>
          <Reveal>
            <ParallaxImage src={homeSolution} alt="Hands holding biochar" tag="Biochar &middot; stable carbon" ratio="4/3" />
          </Reveal>
        </div>

        <motion.div
          className="stat-grid"
          style={{ marginTop: '7rem' }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
        >
          {[
            [<CountUp key="a" to={25} prefix="$" suffix="B" />, 'Target market', 'Global CDR market projection by 2029'],
            [<CountUp key="b" to={150} prefix="$" />, 'Farmer impact', 'Direct income supplement per household, per year'],
            [<CountUp key="c" to={32} suffix="%" />, 'Net margin', 'Yielded by our unit economics'],
            [<CountUp key="d" to={120} suffix="+" />, 'Pilot traction', 'Active pilot farmers on the ground'],
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
  ['04', 'Syngas loop', 'Non-condensable gases are recirculated to fuel the process itself, cutting operational energy costs by 20–30%.'],
];

function ProcessRail() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
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
    <section id="technology" style={{ paddingBottom: 0 }}>
      <div className="container">
        <Reveal className="section-head">
          <span className="index-num">03</span>
          <span className="label">Technology &amp; Process</span>
        </Reveal>

        <Reveal>
          <h2 className="mega" style={{ fontSize: 'clamp(2.4rem, 5vw, 5rem)' }}>
            End-to-end <span className="accent">pyrolysis</span><br />&amp; measurement.
          </h2>
        </Reveal>
      </div>

      <div style={{ margin: '5rem 0' }}>
        <PyrolysisImage />
      </div>

      <div className="container">
        <div className="grid-2">
          <Reveal>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1.2rem' }}>The Pyrolysis Engine</h3>
            <p>
              Commercially mature technology operating at TRL 7&ndash;8: thermal
              decomposition of organic biomass at 400&ndash;700&deg;C in a
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

/* ---------------- market ---------------- */
function Market() {
  return (
    <section id="market" style={{ background: 'var(--bg-2)' }}>
      <div className="glow" style={{ width: '38vw', height: '38vw', top: '0%', right: '-10%', background: 'rgba(255,122,61,0.05)' }} />
      <div className="container">
        <Reveal className="section-head">
          <span className="index-num">04</span>
          <span className="label">Commercialization &amp; Moat</span>
        </Reveal>

        <Reveal>
          <h2 className="mega" style={{ fontSize: 'clamp(2.4rem, 5vw, 5rem)' }}>
            Built to <span className="accent">scale</span>.<br />
            <span className="outline">Defensible by design.</span>
          </h2>
        </Reveal>

        <div style={{ margin: '5rem 0' }}>
          <ParallaxImage src={commFarmer} alt="Indian farmer shoveling biochar" tag="Farmer impact" ratio="21/9" range={16} />
        </div>

        <div className="grid-2">
          <Reveal>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>Three revenue streams</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div className="panel">
                <h4 style={{ color: 'var(--ember)', marginBottom: '0.5rem' }}>Verified carbon credits</h4>
                <p style={{ fontSize: '0.95rem' }}>Forward offtake contracts with corporate buyers at a conservative blended rate of $136 per tonne.</p>
              </div>
              <div className="panel">
                <h4 style={{ marginBottom: '0.5rem' }}>Physical biochar sales</h4>
                <p style={{ fontSize: '0.95rem' }}>Subsidized biochar applied back to partner farms, improving crop yields by 15&ndash;30%.</p>
              </div>
              <div className="panel">
                <h4 style={{ marginBottom: '0.5rem' }}>Pyrolysis co-products</h4>
                <p style={{ fontSize: '0.95rem' }}>Wood vinegar and syngas generate high-margin incremental revenue at scale.</p>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <ParallaxImage src={commSoil} alt="Terra preta rich soil" tag="Soil health" ratio="16/9" />
            <h3 style={{ fontSize: '1.8rem', margin: '2.5rem 0 1rem' }}>Rigorous certification</h3>
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
              ['End-to-end MRV', 'Owning the full digital verification chain bypasses the third-party MRV fees that erode competitors’ margins.'],
              ['First-mover advantage', 'A 12–18 month head-start in the under-served Rayalaseema belt before credible geographic competition emerges.'],
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

/* ---------------- story ---------------- */
function Story() {
  return (
    <section id="story">
      <div className="glow" style={{ width: '34vw', height: '34vw', top: '20%', left: '-12%', background: 'rgba(194,65,39,0.06)' }} />
      <div className="container">
        <Reveal className="section-head">
          <span className="index-num">05</span>
          <span className="label">The Vaayubon Story</span>
        </Reveal>

        <Reveal>
          <h2 className="mega" style={{ fontSize: 'clamp(2.4rem, 5vw, 5rem)' }}>
            From <span className="accent">Nandyal</span><br />to net-zero.
          </h2>
        </Reveal>

        <div className="grid-2" style={{ marginTop: '5rem' }}>
          <Reveal>
            <ParallaxImage src={storySetting} alt="Nandyal village setting" tag="The setting &middot; Nandyal, AP" ratio="4/5" />
          </Reveal>

          <Reveal style={{ paddingTop: '1rem' }}>
            <h3 className="serif-i" style={{ fontSize: 'clamp(1.5rem, 2.4vw, 2.1rem)', lineHeight: 1.35, fontWeight: 300, marginBottom: '2.5rem', color: 'var(--ink)' }}>
              &ldquo;Industrial competitors were tackling carbon removal with
              capital-heavy, disconnected models. We wanted to build something
              different.&rdquo;
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
              <p>
                Originating from deep agricultural roots in Nandyal, Andhra Pradesh,
                and incubated at the IE Climate Tech Lab 2026, Vaayubon was forged
                to solve a problem we witnessed firsthand.
              </p>
              <p>
                Our founders, Srihas Vunnam, Manu Muralee, and Akarshith
                Reddy, recognized that the annual burning of crop residue was
                not farmer negligence, but rational behavior in the absence of a
                market.
              </p>
              <p>
                Countless interviews with farmers, officials, and carbon buyers
                taught us that income reliability is paramount. That insight is the
                bedrock of Vaayubon: agricultural waste becomes a $150-per-year
                income supplement for households that need it, while carbon
                is locked in the ground for a millennium.
              </p>
              <p style={{ color: 'var(--ink)', fontWeight: 500 }}>
                Backed by 120+ pilot farmers, Vaayubon is proving a model that
                scales, and inviting the world to help build India&rsquo;s
                carbon future.
              </p>
            </div>
          </Reveal>
        </div>
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
      <main>
        <Hero />
        <Marquee />
        <Manifesto />
        <Problem />
        <Solution />
        <Technology />
        <Market />
        <Story />
        <Footer />
      </main>
    </>
  );
}
