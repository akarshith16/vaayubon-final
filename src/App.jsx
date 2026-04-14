import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Home from './pages/Home';
import Technology from './pages/Technology';
import Commercialization from './pages/Commercialization';
import Story from './pages/Story';
import './index.css';

const drawLine = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 2, ease: "easeOut" } }
};

function ScrollToTop() {
  const { pathname } = useLocation();
  import('react').then(({ useEffect }) => {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  });
  return null;
}

function Layout({ children }) {
  const location = useLocation();
  return (
    <div className="app-container">
      {/* Decorative Geometric Elements */}
      <motion.div 
        variants={drawLine} initial="hidden" animate="visible"
        className="decorative-circle" 
        style={{ width: '80vw', height: '80vw', top: '-40vw', left: '10vw' }}
      />

      <nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4rem' }}>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-1px' }}>VAYUBON</div>
          <div className="nav-links">
            <Link to="/" style={{ color: location.pathname === '/' ? 'var(--accent-rust)' : 'var(--text-main)' }}>Home</Link>
            <Link to="/technology" style={{ color: location.pathname === '/technology' ? 'var(--accent-rust)' : 'var(--text-main)' }}>Technology</Link>
            <Link to="/commercialization" style={{ color: location.pathname === '/commercialization' ? 'var(--accent-rust)' : 'var(--text-main)' }}>Commercialization</Link>
            <Link to="/story" style={{ color: location.pathname === '/story' ? 'var(--accent-rust)' : 'var(--text-main)' }}>Story</Link>
          </div>
        </div>
        <div className="nav-links">
          <a href="mailto:invest@vayu.climate">INVEST@VAAYUBON.COM</a>
        </div>
      </nav>

      <main style={{ minHeight: '80vh' }}>
        {children}
      </main>

      <footer style={{ background: 'var(--bg-primary)', padding: '2rem 4vw', display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', borderTop: '1px solid rgba(0,0,0,0.1)' }}>
        <span>© 2026 VAAYUBON. The Future of Carbon.</span>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <span>Srihas Vunnam</span>
          <span>Manu Muralee</span>
          <span>Akarshith Reddy</span>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/technology" element={<Technology />} />
          <Route path="/commercialization" element={<Commercialization />} />
          <Route path="/story" element={<Story />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
