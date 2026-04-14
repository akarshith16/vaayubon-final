import { motion } from 'framer-motion';

const revealUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
};

export default function Home() {
  return (
    <>
      <section style={{ paddingTop: '15vh', paddingBottom: '4rem' }} className="split-bg-section">
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={revealUp}>
            <span className="section-label">HOME PAGE</span>
            <h1 className="mega-title" style={{ fontSize: 'clamp(3rem, 6vw, 6rem)', marginBottom: '2rem' }}>
              THE FUTURE OF CARBON <br/>
              IS ROOTED IN <span className="highlight">AGRICULTURE</span>
            </h1>
          </motion.div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', paddingBottom: '2rem' }}>
             <div></div>
             <motion.div initial="hidden" animate="visible" variants={revealUp} style={{ paddingLeft: '2rem', borderLeft: '1px solid rgba(0,0,0,0.1)' }}>
               <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Turning Agricultural Waste into Institutional-Grade Carbon Removal.</h3>
               <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '400px' }}>
                 Vaayubon operates at the intersection of global climate mandates, agricultural empowerment, and technological innovation in Andhra Pradesh, India.
               </p>
             </motion.div>
          </div>
        </div>

        {/* Home Image */}
        <div style={{ width: '100%', height: '50vh', position: 'relative' }}>
             <img src="/src/assets/img/home.png" style={{ objectFit: 'cover', width: '100%', height: '100%', filter: 'grayscale(20%) sepia(30%)' }} alt="Agricultural field" />
             <div style={{ position: 'absolute', bottom: '2rem', left: '4vw', color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '2px' }}>SCROLL DOWN</div>
        </div>
      </section>

      <section style={{ background: 'var(--bg-primary)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '4rem', maxWidth: '800px', margin: '0 auto' }}>
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={revealUp}>
            <span className="section-label">THE CORE PROBLEM</span>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>
              In the Rayalaseema region and across India, smallholder farmers face a structural economic failure: crop residue has zero disposal cost but generates zero revenue. Because no economic alternative exists, millions of tonnes of residue are burned en masse.
            </p>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginTop: '1rem' }}>
              This destroys a zero-value waste but simultaneously destroys an asset. Annually, 100 million tonnes of residue are burned in India, destroying feedstock that represents over <strong style={{color: 'var(--text-main)'}}>$13.6 billion</strong> in potential carbon credit value.
            </p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={revealUp}>
            <span className="section-label" style={{ color: '#3b82f6' }}>THE VAAYUBON SOLUTION</span>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', lineHeight: 1.2 }}>We convert agricultural crop residue into <span className="highlight">certified biochar carbon credits</span>.</h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>
              We are bridging the gap between India's massive agricultural waste and the institutional demand from technology giants for verified, high-durability carbon credits.
            </p>
          </motion.div>
          
        </div>
      </section>

      <section style={{ background: 'var(--bg-secondary)', padding: '6rem 0' }}>
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp} style={{ marginBottom: '4rem', textAlign: 'center' }}>
            <span className="section-label">BY THE NUMBERS</span>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp} style={{ paddingRight: '2rem', borderRight: '1px solid rgba(0,0,0,0.1)' }}>
              <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--accent-rust)', marginBottom: '0.5rem' }}>$25B</div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}><strong>Target Market:</strong> Global CDR market projection by 2029.</p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp} transition={{ delay: 0.1 }} style={{ paddingRight: '2rem', borderRight: '1px solid rgba(0,0,0,0.1)' }}>
              <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>$150</div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}><strong>Farmer Impact:</strong> Direct income supplement per household per year.</p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp} transition={{ delay: 0.2 }} style={{ paddingRight: '2rem', borderRight: '1px solid rgba(0,0,0,0.1)' }}>
              <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>32%</div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}><strong>Net Margin:</strong> Yielded by our robust unit economics.</p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp} transition={{ delay: 0.3 }}>
              <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>120+</div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}><strong>Pilot Traction:</strong> Active pilot farmers currently enrolled.</p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
