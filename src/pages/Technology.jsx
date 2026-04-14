import { motion } from 'framer-motion';

const revealUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
};

export default function Technology() {
  return (
    <>
      <section style={{ paddingTop: '15vh' }} className="top-separator">
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={revealUp}>
            <span className="section-label">SUBPAGE 1: OUR TECHNOLOGY & PROCESS</span>
            <h1 className="mega-title" style={{ fontSize: 'clamp(3rem, 6vw, 6rem)', marginBottom: '4rem' }}>
              END-TO-END <br/>
              <span className="highlight">PYROLYSIS</span> & MEASUREMENT
            </h1>
          </motion.div>
        </div>

        <div style={{ width: '100%', height: '40vh', position: 'relative', margin: '4rem 0' }}>
             <img src="/src/assets/img/tech.png" style={{ objectFit: 'cover', width: '100%', height: '100%', filter: 'grayscale(20%) sepia(30%)' }} alt="Pyrolysis Technology" />
        </div>

        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '4rem', paddingBottom: '6rem' }}>
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp}>
             <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>The Pyrolysis Engine</h2>
             <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
               Vaayubon utilizes commercially mature pyrolysis technology, operating at a Technology Readiness Level (TRL) of 7–8. 
               The process involves the thermal decomposition of organic biomass at 400–700°C in a low-oxygen environment.
             </p>
             <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '1rem', fontWeight: 600 }}>
               Our innovation lies in the end-to-end supply chain integration, stretching from farmer logistics to digital Monitoring, Reporting, and Verification (MRV).
             </p>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp}>
               <span className="section-label">Strategic Feedstock Selection</span>
               <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>We rigorously analyzed five primary feedstock streams across the Rayalaseema belt.</p>
               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                 <div style={{ padding: '1.5rem', background: 'var(--bg-secondary)', borderLeft: '4px solid var(--accent-rust)' }}>
                    <h4 style={{ marginBottom: '0.5rem', fontSize: '1.2rem' }}>Primary MVP Feedstock</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Rice straw and groundnut shells selected for high volume availability, zero cost, and high biochar yield.</p>
                 </div>
                 <div style={{ padding: '1.5rem', background: 'var(--bg-secondary)', borderLeft: '4px solid var(--text-main)' }}>
                    <h4 style={{ marginBottom: '0.5rem', fontSize: '1.2rem' }}>Scale-Up Feedstock</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Cotton stalks, widespread and high lignin content, earmarked for our Year 2 scale-up.</p>
                 </div>
               </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp}>
               <span className="section-label">Beyond Biochar: Co-Products</span>
               <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>The pyrolysis process generates highly valuable commercial co-products.</p>
               <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                 <li style={{ paddingBottom: '1rem', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                   <strong style={{ display: 'block', fontSize: '1.2rem' }}>Wood Vinegar</strong>
                   <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>A natural pesticide and plant growth stimulant for India's organic farming segment.</span>
                 </li>
                 <li>
                   <strong style={{ display: 'block', fontSize: '1.2rem' }}>Syngas</strong>
                   <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Recirculating these non-condensable gases fuels the process itself, reducing operational energy costs by 20–30%.</span>
                 </li>
               </ul>
            </motion.div>
          </div>

        </div>
      </section>
    </>
  );
}
