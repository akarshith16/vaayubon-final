import { motion } from 'framer-motion';
import storySetting from '../assets/img/story_setting.png';
import storyMission from '../assets/img/story_mission.png';

const revealUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
};

export default function Story() {
  return (
    <>
      <section style={{ paddingTop: '15vh' }} className="top-separator">
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={revealUp}>
            <span className="section-label">SUBPAGE 3: THE VAAYUBON STORY</span>
            <h1 className="mega-title" style={{ fontSize: 'clamp(3rem, 6vw, 6rem)', marginBottom: '4rem' }}>
              FROM <span className="highlight">NANDYAL</span> <br/>TO NET-ZERO.
            </h1>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(400px, 1fr) 1fr', gap: '6rem', margin: '4rem 0' }}>
             
             <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div className="image-placeholder" style={{ width: '100%', aspectRatio: '4/5', position: 'relative' }}>
                  <img src={storySetting} style={{ objectFit: 'cover', width: '100%', height: '100%', filter: 'grayscale(20%) sepia(30%)', position: 'absolute', inset: 0 }} alt="Nandyal village setting" />
                  <div style={{ position: 'absolute', top: '1rem', left: '1rem', color: 'rgba(255,255,255,0.9)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '2px', background: 'rgba(0,0,0,0.5)', padding: '0.5rem 1rem' }}>THE SETTING</div>
                </div>
                
                <div className="image-placeholder" style={{ width: '100%', aspectRatio: '16/9', position: 'relative' }}>
                  <img src={storyMission} style={{ objectFit: 'cover', width: '100%', height: '100%', filter: 'grayscale(20%) sepia(30%)', position: 'absolute', inset: 0 }} alt="Farmer mission theme" />
                  <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', color: 'rgba(255,255,255,0.9)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '2px', background: 'rgba(0,0,0,0.5)', padding: '0.5rem 1rem' }}>THE MISSION</div>
                </div>
             </motion.div>

             <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp} style={{ paddingTop: '2rem' }}>
                
                <h3 style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', fontWeight: 400, fontStyle: 'italic', lineHeight: 1.3, marginBottom: '2rem' }}>
                  "We realized that industrial competitors were tackling carbon removal with capital-heavy, disconnected models. We wanted to build something different."
                </h3>
                
                <div style={{ color: 'var(--text-muted)', fontSize: '1.05rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <p>
                    Originating from deep agricultural roots in Nandyal, Andhra Pradesh, and incubated at the IE Climate Tech Lab 2026, Vaayubon was forged to solve a problem we witnessed firsthand. 
                  </p>
                  <p>
                    Our founders, Srihas Vunnam, Manu Muralee, and Akarshith Reddy, recognized that the annual burning of crop residue was not farmer negligence, but rational behavior in the absence of a market.
                  </p>
                  <p>
                    Through countless interviews with farmers, government officials, and carbon market buyers, we refined our proposition. We learned that for farmers, income reliability is paramount. That insight became the bedrock of Vaayubon: we turn agricultural waste into an income supplement of $150 per year for households that desperately need it, while locking carbon in the ground for a millennium.
                  </p>
                  <p style={{ fontWeight: 600, color: 'var(--text-main)', marginTop: '2rem' }}>
                    Today, with the backing of over 120 pilot farmers, Vaayubon is not just a climate tech venture. We are proving a model that scales, inviting the world to help us build India's carbon future.
                  </p>
                </div>

             </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
