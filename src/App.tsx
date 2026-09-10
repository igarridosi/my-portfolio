import { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IoCaretBack, IoCaretForward, IoRefresh, IoSearch } from 'react-icons/io5';

import Section1 from './components/Section1/index';
import CVSection from './components/CVSection/CVSection';
import AboutMe from './components/AboutMe';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import {
  TeletextHeader,
  TeletextFooter,
  TeletextNav,
} from './components/Teletext/TeletextBars';
import { PageWipe, usePageWipe } from './components/Teletext/PageWipe';
import Contact from './components/Contact';

/* Spacing of the grid the trail snaps to, and the size of the block drawn on
   it - they are the same number on purpose. A block smaller than its cell
   leaves a permanent margin around every square, so even a slow, continuous
   sweep comes out as a dotted line. Equal to the cell, the blocks tile: a
   run of them is unbroken, and the only holes left are whole cells the
   cursor genuinely skipped. Declared as `--trail-cell` in index.css, which
   is where the block's width and height come from. */
const TRAIL_CELL = 68;
const TRAIL_MAX = 40;
/* Ceiling on how many cells one frame may fill in. A pointer flung across a
   4K screen can cross fifty cells between frames; drawing all of them is
   both pointless and a long synchronous DOM write. */
const TRAIL_MAX_STEP = 16;

function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  // `displayed` lags the real route until the wipe has covered the screen, so
  // the page never changes in plain sight.
  const { displayed, active: wiping, run: wipeRun } = usePageWipe();
  const trailRef = useRef<HTMLDivElement>(null);
  // The tube's colour follows the pointer. Writing CSS variables straight to
  // the node (rather than through state) keeps this off React's render path:
  // a mousemove must never re-render the app. Coalesced into one rAF so we
  // touch the DOM at most once per frame.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    let x = 0;
    let y = 0;
    // Last cell painted, as grid coordinates. `null` until the first frame,
    // so the pointer entering the window drops a single block rather than
    // drawing a line from the top-left corner to wherever it appeared.
    let prev: { col: number; row: number } | null = null;
    const el = document.documentElement;

    const dropBlock = (layer: HTMLElement, col: number, row: number) => {
      const block = document.createElement('span');
      block.className = 'crt-trail__block';
      // Snap to the cell's own corner. Centring on the cursor instead would
      // put the block astride two cells and break the tiling.
      block.style.transform =
        `translate3d(${col * TRAIL_CELL}px, ${row * TRAIL_CELL}px, 0)`;
      block.addEventListener('animationend', () => block.remove(), { once: true });
      layer.appendChild(block);
    };

    const paint = () => {
      frame = 0;
      const px = (x / window.innerWidth) * 100;
      const py = (y / window.innerHeight) * 100;
      el.style.setProperty('--mx', `${px.toFixed(2)}%`);
      el.style.setProperty('--my', `${py.toFixed(2)}%`);
      // Sweep a calm arc of the colour wheel across the screen: deep blue on
      // the left through to violet on the right, never a full rainbow.
      el.style.setProperty('--hue', (196 + (px / 100) * 92).toFixed(1));

      // Drop a block on each new grid cell the cursor enters. Snapping to the
      // grid is what makes it read as pixels; keying on the cell stops a slow
      // mouse from stacking dozens of them in one spot.
      const layer = trailRef.current;
      if (!layer) return;
      const col = Math.floor(x / TRAIL_CELL);
      const row = Math.floor(y / TRAIL_CELL);
      if (prev && prev.col === col && prev.row === row) return;

      if (!prev) {
        dropBlock(layer, col, row);
      } else {
        // The pointer reports one position per frame, so anything quicker
        // than a cell per frame teleports and leaves the trail perforated.
        // Walk the cells between the last one and this one instead: one step
        // per cell along the longer axis, which is Bresenham's line reduced
        // to the case where both endpoints are already known.
        const dc = col - prev.col;
        const dr = row - prev.row;
        const steps = Math.min(Math.max(Math.abs(dc), Math.abs(dr)), TRAIL_MAX_STEP);
        for (let i = 1; i <= steps; i += 1) {
          dropBlock(
            layer,
            prev.col + Math.round((dc * i) / steps),
            prev.row + Math.round((dr * i) / steps),
          );
        }
      }
      prev = { col, row };

      // Safety net: if animationend never fires (background tab), the layer
      // still cannot grow without bound.
      while (layer.childElementCount > TRAIL_MAX) {
        layer.firstElementChild?.remove();
      }
    };

    const onMove = (e: PointerEvent) => {
      // Mouse only. A finger drag also fires pointermove, and the inverted
      // pixel chasing a thumb across a phone screen is noise, not character.
      if (e.pointerType !== 'mouse') return;
      x = e.clientX;
      y = e.clientY;
      if (!frame) frame = requestAnimationFrame(paint);
    };

    // Leaving the window ends the stroke. Without this, coming back in on the
    // far side would draw a line across the whole screen to reconnect with a
    // cell the cursor left minutes ago.
    const onLeave = () => {
      prev = null;
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    window.addEventListener('blur', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('blur', onLeave);
      if (frame) cancelAnimationFrame(frame);
      if (trailRef.current) trailRef.current.replaceChildren();
    };
  }, []);
  // The address bar follows the click straight away - that is the chrome
  // acknowledging the navigation - while everything inside the screen waits.
  const displayUrl = `https://ibaigarrido.dev${location.pathname}`;
  const isHome = displayed.pathname === '/';

  return (
    <motion.div
      className="relative isolate min-h-screen flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Decorative only: never announced, never clickable. */}
      <div className="crt-bg" aria-hidden="true" />
      <div className="crt-overlay" aria-hidden="true" />
      <div className="crt-sweep" aria-hidden="true" />
      <div className="crt-bezel" aria-hidden="true" />
      <div ref={trailRef} className="crt-trail" aria-hidden="true" />

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
        <div className="crt-screen relative my-auto w-full sm:w-[90%] lg:w-[80%] max-w-[1700px] overflow-hidden border-2 sm:border-3 border-gray-800 bg-[#0c0d10] rounded-lg sm:rounded-xl">

          {/* Traffic lights bar */}
          <div className="flex items-center h-9 sm:h-11 bg-black border-b-2 border-tt-cyan px-3 sm:px-5">
            {/* Square, not round: teletext drew everything on a character grid. */}
            <div className="flex gap-1.5 sm:gap-2">
              <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 bg-tt-red" />
              <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 bg-tt-yellow" />
              <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 bg-tt-green" />
            </div>
            <span className="ml-3 sm:ml-4 font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-tt-cyan">
              Ibai Garrido
            </span>
          </div>

          {/* Address bar */}
          <div className="hidden md:flex items-center h-11 bg-black border-b-2 border-tt-cyan px-4 gap-2">
            <button type="button" onClick={() => navigate(-1)} aria-label="Go back" className="px-2 py-1 text-sm font-bold text-tt-cyan border border-tt-cyan bg-black hover:bg-tt-cyan hover:text-black transition-colors duration-100">
              <IoCaretBack aria-hidden="true" />
            </button>
            <button type="button" onClick={() => navigate(1)} aria-label="Go forward" className="px-2 py-1 text-sm font-bold text-tt-cyan border border-tt-cyan bg-black hover:bg-tt-cyan hover:text-black transition-colors duration-100">
              <IoCaretForward aria-hidden="true" />
            </button>
            <button type="button" onClick={() => window.location.reload()} aria-label="Reload page" className="px-2 py-1 text-sm font-bold text-tt-cyan border border-tt-cyan bg-black hover:bg-tt-cyan hover:text-black transition-colors duration-100">
              <IoRefresh aria-hidden="true" />
            </button>
            <input
              type="text"
              className="flex-1 px-2 py-1 text-sm border border-tt-cyan bg-black text-tt-green font-mono tracking-wide"
              value={displayUrl}
              readOnly
              tabIndex={-1}
              aria-hidden="true"
            />
            <button type="button" tabIndex={-1} aria-hidden="true" className="px-2 py-1 text-sm font-bold text-tt-cyan border border-tt-cyan bg-black hover:bg-tt-cyan hover:text-black transition-colors duration-100">
              <IoSearch />
            </button>
          </div>

          {/* Everything below the address bar is the tube: the index row, the
              page and its footer. It is wrapped so that it can be switched off
              as one thing when a project takes over the screen. */}
          <div className="crt-tube">
          {/* Navigation, drawn as a teletext index row */}
          <TeletextNav />

          {/* Main content. The photo only earns its space on the landing page;
              every other route gets the full width for actual content. */}
          <div className="tt-screen crt-glass relative">
            <PageWipe active={wiping} run={wipeRun} />
            <TeletextHeader pathname={displayed.pathname} />

            <div className="px-3 py-2 sm:px-5 sm:py-2.5 lg:px-6 lg:py-2.5">
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
                  <Routes location={displayed}>
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

            <TeletextFooter />
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
