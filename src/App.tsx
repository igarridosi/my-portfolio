import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IoCaretBack, IoCaretForward, IoRefresh, IoSearch } from 'react-icons/io5';

import Section1 from './components/Section1/index';
import CVSection from './components/CVSection/CVSection';
import AboutMe from './components/AboutMe';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import MenuNav from './components/Navigation/MenuNav';
import Contact from './components/Contact';

function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  // The tube's colour follows the pointer. Writing CSS variables straight to
  // the node (rather than through state) keeps this off React's render path:
  // a mousemove must never re-render the app. Coalesced into one rAF so we
  // touch the DOM at most once per frame.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    let x = 0;
    let y = 0;
    const el = document.documentElement;

    const paint = () => {
      frame = 0;
      const px = (x / window.innerWidth) * 100;
      const py = (y / window.innerHeight) * 100;
      el.style.setProperty('--mx', `${px.toFixed(2)}%`);
      el.style.setProperty('--my', `${py.toFixed(2)}%`);
      // Sweep a calm arc of the colour wheel across the screen: deep blue on
      // the left through to violet on the right, never a full rainbow.
      el.style.setProperty('--hue', (196 + (px / 100) * 92).toFixed(1));
    };

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!frame) frame = requestAnimationFrame(paint);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
  const displayUrl = `https://www.your-next-developer.dev${location.pathname}`;
  const isHome = location.pathname === '/';

  return (
    <motion.div
      className="relative min-h-screen flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Decorative only: never announced, never clickable. */}
      <div className="crt-bg" aria-hidden="true" />
      <div className="crt-overlay" aria-hidden="true" />
      <div className="crt-sweep" aria-hidden="true" />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[200] focus:top-2 focus:left-2
          focus:px-4 focus:py-2 focus:bg-white focus:text-gray-900 focus:font-bold
          focus:border-2 focus:border-gray-800 focus:rounded"
      >
        Skip to content
      </a>

      <motion.div
        className="relative z-10 flex flex-1 flex-row justify-center p-2 sm:p-3 lg:px-12 lg:py-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {/* Retro browser window */}
        <div className="crt-screen relative my-auto w-full sm:w-[90%] lg:w-[80%] max-w-[1700px] overflow-hidden border-2 sm:border-3 border-gray-800 bg-gray-100 rounded-lg sm:rounded-xl">

          {/* Traffic lights bar */}
          <div className="flex items-center h-8 sm:h-10 bg-gray-200 border-b-2 border-gray-800 px-3 sm:px-4">
            <div className="flex gap-1.5 sm:gap-2">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500 border border-gray-800" />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500 border border-gray-800" />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500 border border-gray-800" />
            </div>
          </div>

          {/* Address bar */}
          <div className="hidden md:flex items-center h-10 bg-gray-300 border-b-2 border-gray-800 px-4">
            <button type="button" onClick={() => navigate(-1)} aria-label="Go back" className="px-2 py-1 text-sm font-bold text-gray-800 border border-gray-800 bg-gray-200 hover:bg-gray-300">
              <IoCaretBack className="text-gray-700" aria-hidden="true" />
            </button>
            <button type="button" onClick={() => navigate(1)} aria-label="Go forward" className="px-2 py-1 text-sm font-bold text-gray-800 border border-gray-800 bg-gray-200 hover:bg-gray-300 ml-2">
              <IoCaretForward className="text-gray-700" aria-hidden="true" />
            </button>
            <button type="button" onClick={() => window.location.reload()} aria-label="Reload page" className="px-2 py-1 text-sm font-bold text-gray-800 border border-gray-800 bg-gray-200 hover:bg-gray-300 ml-2">
              <IoRefresh className="text-gray-700" aria-hidden="true" />
            </button>
            <input
              type="text"
              className="flex-1 mx-4 px-2 py-1 text-sm border border-gray-800 bg-gray-100 font-mono"
              value={displayUrl}
              readOnly
              tabIndex={-1}
              aria-hidden="true"
            />
            <button type="button" tabIndex={-1} aria-hidden="true" className="px-2 py-1 text-sm font-bold text-gray-800 border border-gray-800 bg-gray-200 hover:bg-gray-300">
              <IoSearch />
            </button>
          </div>

          {/* Navigation bookmarks bar */}
          <MenuNav />

          {/* Main content. The photo only earns its space on the landing page;
              every other route gets the full width for actual content. */}
          <div className="p-3 sm:p-6 lg:p-10 bg-white">
            <div
              className={`grid grid-cols-1 gap-4 sm:gap-6 w-full ${
                isHome ? 'lg:grid-cols-[3fr_2fr]' : ''
              }`}
            >
              <motion.div
                className="flex justify-center"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <main
                  id="main"
                  className={`w-full overflow-y-auto p-2 sm:p-6 md:px-8 rounded-xl no-scrollbar content-height ${
                    isHome ? 'max-w-[800px]' : 'max-w-[1100px]'
                  }`}
                >
                  <Routes>
                    <Route path="/" element={<Section1 />} />
                    <Route path="/about" element={<AboutMe />} />
                    <Route path="/experience" element={<Experience />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/skills" element={<Skills />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="*" element={<Section1 />} />
                  </Routes>
                </main>
              </motion.div>

              {isHome && (
                <motion.div
                  className="flex justify-center"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <CVSection />
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

    </motion.div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
