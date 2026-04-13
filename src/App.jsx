import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import './index.css';

// Fluid, slow reveal animation variants
const revealUp = {
  hidden: { opacity: 0, y: 80 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3 }
  }
};

const drawLine = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 2, ease: "easeOut" } }
};

function App() {
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div className="app-container">
      {/* Decorative Geometric Elements based on Dribbble Ref */}
      <motion.div 
        variants={drawLine} initial="hidden" animate="visible"
        className="decorative-circle" 
        style={{ width: '80vw', height: '80vw', top: '-40vw', left: '10vw' }}
      />
      <motion.div 
        variants={drawLine} initial="hidden" animate="visible"
        className="decorative-circle" 
        style={{ width: '40vw', height: '40vw', bottom: '-20vw', left: '-10vw' }}
      />

      {/* Navigation */}
      <nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4rem' }}>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-1px' }}>VAYU</div>
          <div className="nav-links">
            <a href="#flywheel">Flywheel</a>
            <a href="#mrv">Digital MRV</a>
            <a href="#traction">Traction</a>
          </div>
        </div>
        <div className="nav-links">
          <a href="mailto:invest@vayu.climate">INVEST@VAYU.CLIMATE</a>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ display: 'block', width: '24px', height: '1.5px', background: '#000' }}></span>
            <span style={{ display: 'block', width: '24px', height: '1.5px', background: '#000' }}></span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ paddingTop: '15vh', paddingBottom: '0' }} className="split-bg-section">
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={revealUp}>
            <span className="section-label">THE ISSUE ON</span>
            <h1 className="mega-title" style={{ marginBottom: '4rem' }}>
              AGRICULTURE'S <br />
              <span className="highlight">ENVIRONMENTAL</span> <br />
              LIABILITY
            </h1>
          </motion.div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', paddingBottom: '4rem' }}>
             <div></div>
             <motion.div initial="hidden" animate="visible" variants={revealUp} style={{ paddingLeft: '2rem', borderLeft: '1px solid rgba(0,0,0,0.1)' }}>
               <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '400px' }}>
                 India generates 683 million tonnes of agricultural waste every year. 180 million tonnes are burned annually — the equivalent of 1.4 million trucks' worth of emissions.
               </p>
             </motion.div>
          </div>
        </div>

        {/* Massive Image Placeholder seamlessly cutting into the taupe background */}
        <div style={{ width: '100%', height: '50vh', position: 'relative' }}>
             <div className="image-placeholder" style={{ height: '100%', width: '100%' }}></div>
             <div style={{ position: 'absolute', bottom: '2rem', left: '4vw', color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '2px' }}>SCROLL DOWN</div>
        </div>
      </section>

      {/* Flywheel & Solution Section */}
      <section id="flywheel" style={{ background: 'var(--bg-primary)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }}>
          
          {/* Square Image Placeholder */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={revealUp}>
            <div className="image-placeholder" style={{ aspectRatio: '1/1' }}></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}>
               <span style={{ color: 'var(--accent-rust)' }}>✶</span>
               <span style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '1px' }}>ANDHRA PRADESH, INDIA</span>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <span className="section-label">THE VAYU SOLUTION</span>
            <h2 style={{ fontSize: '4rem', fontWeight: 800, textTransform: 'uppercase', lineHeight: 1, marginBottom: '2rem' }}>
              TURNING WASTE <br/>INTO A <span className="highlight">CARBON ENGINE</span>
            </h2>
            
            <div style={{ display: 'flex', gap: '2rem', borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: '1rem', marginBottom: '2rem', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '1px' }}>
              <span style={{ borderBottom: '2px solid var(--accent-rust)', paddingBottom: '0.5rem' }}>COLLECTION</span>
              <span style={{ color: 'var(--text-muted)' }}>PYROLYSIS</span>
              <span style={{ color: 'var(--text-muted)' }}>BIOCHAR</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', color: 'var(--text-muted)' }}>
              <p style={{ fontSize: '0.95rem' }}>
                We operate a dual-revenue flywheel. Stream 1 focuses on Verified Carbon Credits via forward offtake agreements priced at $100–165 per tonne. Stream 2 relies on physical Biochar Sales to farmers as a subsidized soil amendment.
              </p>
              <p style={{ fontSize: '0.95rem' }}>
                Each tonne of biochar locks 2.5 tonnes of CO₂ for 1,000+ years. With zero feedstock cost, pre-sold credits, and scaling unit economics, we target a $76/tonne net profit.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quote & Data Section (Similar to "One of the first conditions" in Dribbble) */}
      <section style={{ padding: '4rem 0', borderTop: '1px solid rgba(0,0,0,0.1)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem' }}>
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp}>
            <span style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', color: 'var(--accent-rust)' }}>"</span>
            <h3 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', fontWeight: 400, fontStyle: 'italic', lineHeight: 1.3, marginBottom: '2rem' }}>
              To solve the 99.96% carbon completion gap, <span style={{ color: 'var(--accent-rust)' }}>agriculture</span> must become the <span style={{ color: 'var(--accent-rust)' }}>solution</span> rather than the casualty.
            </h3>
          </motion.div>

          {/* Small landscape placeholder */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp} style={{ paddingTop: '2rem' }}>
            <div className="image-placeholder" style={{ aspectRatio: '16/9', width: '80%' }}></div>
          </motion.div>
        </div>
      </section>

      {/* Operational Engine / Moats */}
      <section id="mrv" className="top-separator">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp} style={{ marginBottom: '4rem' }}>
            <span className="section-label">UNFAIR ADVANTAGES</span>
            <h2 className="mega-title" style={{ fontSize: '5rem' }}>
              END-TO-END <br/><span className="highlight">OWNERSHIP</span>
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4rem', marginTop: '4rem' }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--accent-rust)' }}>1. Gov Backing</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Andhra Pradesh government support provides deep regulatory access and trust.</p>
            </motion.div>
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp} transition={{ delay: 0.1 }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--accent-rust)' }}>2. Digital MRV</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Proprietary AI, IoT, and Satellite tracking. Puro Standard & Verra certified.</p>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp} transition={{ delay: 0.2 }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--accent-rust)' }}>3. Farmer-First</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>We don't buy from the top down. We build ground-up networks that stay loyal.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Traction & Footer */}
      <section id="traction" style={{ background: 'var(--bg-dark)', color: '#f2efe9' }}>
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp} style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <span className="section-label" style={{ color: '#f2efe9', opacity: 0.7 }}>TRACTION</span>
            <h2 style={{ fontSize: '4rem', textTransform: 'uppercase', marginBottom: '3rem' }}>
              Q1 MILESTONE <span style={{ color: 'var(--bg-primary)' }}>ACHIEVED</span>
            </h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.2)', padding: '2rem 0', fontWeight: 600 }}>
              <span>150+ Farmers</span>
              <span>MVP Complete</span>
              <span>Top 10 IE Venture Day</span>
            </div>
          </motion.div>
        </div>
      </section>
      
      <footer style={{ background: 'var(--bg-primary)', padding: '2rem 4vw', display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
        <span>© 2026 VAYU CLIMATE</span>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <span>Srihas Vunnam</span>
          <span>Manu Muralee</span>
          <span>Akarshith Reddy</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
