import { motion } from 'framer-motion';

const revealUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
};

export default function Commercialization() {
  return (
    <>
      <section style={{ paddingTop: '15vh' }} className="top-separator">
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={revealUp}>
            <span className="section-label">SUBPAGE 2: COMMERCIALIZATION & MARKET MOAT</span>
            <h1 className="mega-title" style={{ fontSize: 'clamp(3rem, 6vw, 6rem)', marginBottom: '4rem' }}>
              BUILT TO <span className="highlight">SCALE</span>. <br/>
              DEFENSIBLE BY DESIGN.
            </h1>
          </motion.div>
          
          <div style={{ width: '100%', height: '50vh', position: 'relative', margin: '2rem 0 6rem 0' }}>
             <img src="/src/assets/img/market.png" style={{ objectFit: 'cover', width: '100%', height: '100%', filter: 'grayscale(20%) sepia(30%)' }} alt="Smallholder farmer hands" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '4rem', paddingBottom: '4rem' }}>
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp}>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: '1rem' }}>A Superior Business Model</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Vaayubon's revenue architecture is built on three distinct streams:</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <h4 style={{ fontSize: '1.2rem', color: 'var(--accent-rust)' }}>Verified Carbon Credits</h4>
                  <p style={{ color: 'var(--text-muted)' }}>Forward offtake contracts with corporate buyers at a conservative blended rate of $136 per tonne.</p>
                </div>
                <div>
                  <h4 style={{ fontSize: '1.2rem' }}>Physical Biochar Sales</h4>
                  <p style={{ color: 'var(--text-muted)' }}>Subsidized biochar applied back to partner farmers, improving crop yields by 15–30%.</p>
                </div>
                <div>
                  <h4 style={{ fontSize: '1.2rem' }}>Pyrolysis Co-products</h4>
                  <p style={{ color: 'var(--text-muted)' }}>At scale, wood vinegar and syngas will generate high-margin incremental revenue.</p>
                </div>
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp} style={{ paddingLeft: '2rem', borderLeft: '1px solid rgba(0,0,0,0.1)' }}>
               <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Rigorous Certification</h2>
               <p style={{ color: 'var(--text-muted)' }}>We are pursuing dual certification through the world's leading registries to ensure institutional grade credibility.</p>
               
               <div style={{ marginTop: '2rem', display: 'flex', gap: '2rem' }}>
                 <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', flex: 1 }}>
                   <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Puro.earth</h4>
                   <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Track initiated with an engaged India-based auditor.</p>
                 </div>
                 <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', flex: 1 }}>
                   <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Verra VCS</h4>
                   <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Project Description (PD) preparation is actively underway.</p>
                 </div>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--bg-dark)', color: '#f2efe9' }}>
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp} style={{ marginBottom: '4rem' }}>
            <span className="section-label" style={{ color: '#f2efe9', opacity: 0.7 }}>OUR COMPETITIVE MOATS</span>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '4rem' }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--bg-primary)' }}>1. Zero-Cost Feedstock</h3>
              <p style={{ opacity: 0.8 }}>While competitors purchase biomass, we utilize a farmer-as-partner model where residue is delivered freely in exchange for subsidized biochar.</p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp} transition={{ delay: 0.1 }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--bg-primary)' }}>2. Government Integration</h3>
              <p style={{ opacity: 0.8 }}>Leveraging AP Government rural channel partnerships grants us access to verified extension services and a massive network of smallholders.</p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp} transition={{ delay: 0.2 }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--bg-primary)' }}>3. End-to-End MRV</h3>
              <p style={{ opacity: 0.8 }}>Owning the full digital verification chain allows us to bypass third-party MRV fees that erode margins for other operators.</p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp} transition={{ delay: 0.3 }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--bg-primary)' }}>4. First-Mover Advantage</h3>
              <p style={{ opacity: 0.8 }}>A critical 12–18 month head-start in the systematically under-served Rayalaseema belt before geographic competition becomes credible.</p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
