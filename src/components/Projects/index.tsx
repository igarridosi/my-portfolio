import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  FaGithub,
  FaExternalLinkAlt,
  FaChevronLeft,
  FaChevronRight,
  FaDownload,
} from 'react-icons/fa';
import { IoClose, IoExpand, IoLockClosed } from 'react-icons/io5';
import { projects, type Project, type Gallery } from '../../data/projects';

const AUTOPLAY_MS = 5000;

/** How long the lightbox exit runs before the overlay is unmounted. */
const CLOSE_MS = 260;

/** Soft decelerating curve. Everything in this section shares it so the
 *  motion reads as one system rather than a pile of separate effects. */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Address-bar text: the live site when there is one, otherwise the repo. */
const displayUrl = (project: Project) =>
  (project.demo ?? project.repo).replace(/^https?:\/\//, '').replace(/\/$/, '');

/* ------------------------------------------------------------------ */
/* Slide state                                                         */
/* ------------------------------------------------------------------ */

const useSlides = (total: number) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  const go = useCallback(
    (step: number) => {
      setDirection(step);
      setIndex((i) => (i + step + total) % total);
    },
    [total],
  );

  const jumpTo = useCallback(
    (i: number) => {
      setDirection(i > index ? 1 : -1);
      setIndex(i);
    },
    [index],
  );

  // Advance on its own. Depending on `index` restarts the clock after any
  // manual navigation, so a click always buys a full interval.
  useEffect(() => {
    if (paused || reduceMotion || total <= 1) return;
    const id = setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % total);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, reduceMotion, total, index]);

  return { index, direction, setPaused, go, jumpTo, reduceMotion };
};

const slideVariants = {
  enter: (d: number) => ({ opacity: 0, x: d > 0 ? 44 : -44, scale: 0.985 }),
  center: { opacity: 1, x: 0, scale: 1 },
  exit: (d: number) => ({ opacity: 0, x: d > 0 ? -44 : 44, scale: 0.985 }),
};

/* ------------------------------------------------------------------ */
/* Window chrome: traffic lights + address bar                         */
/* ------------------------------------------------------------------ */

const TrafficLights = ({ onClose }: { onClose?: () => void }) => {
  const dot = 'w-3 h-3 sm:w-3.5 sm:h-3.5';
  return (
    <div className="flex gap-1.5 sm:gap-2">
      {onClose ? (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close gallery"
          className={`${dot} bg-tt-red hover:opacity-70 transition-opacity duration-150`}
        />
      ) : (
        <span className={`${dot} bg-tt-red`} />
      )}
      <span className={`${dot} bg-tt-yellow`} />
      <span className={`${dot} bg-tt-green`} />
    </div>
  );
};

const WindowChrome = ({
  project,
  onClose,
}: {
  project: Project;
  onClose?: () => void;
}) => (
  <>
    {/* Title bar */}
    <div className="flex items-center gap-3 h-9 sm:h-10 px-3 bg-black border-b-2 border-tt-cyan">
      <TrafficLights onClose={onClose} />
      <span className="truncate font-mono text-[11px] sm:text-xs uppercase tracking-[0.16em] text-tt-white">
        {project.name}
      </span>
      <span className="ml-auto shrink-0 px-2 py-0.5 text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-widest text-black bg-tt-cyan">
        {project.category}
      </span>
    </div>

    {/* Address bar */}
    <div className="flex items-center gap-2 h-9 sm:h-10 px-3 bg-black border-b-2 border-tt-cyan">
      <IoLockClosed className="shrink-0 text-[10px] text-tt-green" aria-hidden />
      <div className="flex-1 min-w-0 px-2 py-1 font-mono text-[10px] sm:text-[11px] tracking-wide text-tt-green truncate bg-black border border-tt-cyan">
        {displayUrl(project)}
      </div>
      {project.demo && (
        <a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${project.name} in a new tab`}
          className="shrink-0 px-1.5 py-1 text-[10px] text-tt-cyan bg-black border border-tt-cyan hover:bg-tt-cyan hover:text-black transition-colors duration-150"
        >
          <FaExternalLinkAlt />
        </a>
      )}
    </div>
  </>
);

/* ------------------------------------------------------------------ */
/* Featured card: a browser window showing a single still              */
/* ------------------------------------------------------------------ */

const FeaturedCard = ({
  project,
  index,
  onExpand,
}: {
  project: Project;
  index: number;
  onExpand: (project: Project) => void;
}) => (
  <motion.article
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.12, duration: 0.55, ease: EASE }}
    className="group flex flex-col overflow-hidden bg-white border-2 border-gray-800 rounded-lg
      shadow-[3px_3px_0px_0px_rgba(31,41,55)] sm:shadow-[5px_5px_0px_0px_rgba(31,41,55)]
      hover:shadow-[5px_5px_0px_0px_rgba(31,41,55)] sm:hover:shadow-[10px_10px_0px_0px_rgba(31,41,55)]
      hover:-translate-y-0.5 transition-[box-shadow,transform] duration-300 ease-out"
  >
    <WindowChrome project={project} />

    {/* The still is the whole affordance: one click opens the gallery. */}
    <button
      type="button"
      onClick={() => onExpand(project)}
      aria-label={`Open the ${project.name} gallery`}
      className={`relative w-full aspect-[16/10] overflow-hidden cursor-zoom-in
        focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-800 focus-visible:ring-inset
        ${project.gallery?.bg ?? 'bg-gray-100'}`}
    >
      {project.gallery && (
        <img
          src={project.gallery.images[0]}
          alt={`${project.name} preview`}
          loading="lazy"
          decoding="async"
          className={`absolute inset-0 w-full h-full transition-transform duration-500
            ease-out group-hover:scale-[1.03] ${
              project.gallery.posterFit === 'contain'
                ? 'object-contain p-4'
                : 'object-cover object-top'
            }`}
        />
      )}

      {/* Hover reveal on pointer devices; always visible on touch, where the
          hover state would never fire. */}
      <span
        className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5
          px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider
          text-white bg-gray-900/85 border border-white/25 rounded
          opacity-100 translate-y-0
          sm:opacity-0 sm:translate-y-1
          sm:group-hover:opacity-100 sm:group-hover:translate-y-0
          transition-all duration-300 ease-out"
      >
        <IoExpand />
        View gallery
      </span>
    </button>
  </motion.article>
);

/* ------------------------------------------------------------------ */
/* Lightbox: carousel on the left, floating description on the right   */
/* ------------------------------------------------------------------ */

const Lightbox = ({
  project,
  gallery,
  onDismissed,
}: {
  project: Project;
  gallery: Gallery;
  onDismissed: () => void;
}) => {
  const total = gallery.images.length;
  const { index, direction, setPaused, go, jumpTo, reduceMotion } = useSlides(total);

  // Closing is a two-step: play the exit, then tell the parent to unmount us.
  // The unmount is driven by a plain timer rather than an animation-completion
  // callback, so it cannot be left hanging: an overlay stuck at opacity 0 still
  // covers the viewport and would swallow every click on the page. The exit
  // transition below is a tween shorter than CLOSE_MS, so it always finishes
  // before the node goes.
  const [closing, setClosing] = useState(false);
  const requestClose = useCallback(() => setClosing(true), []);
  const panelRef = useRef<HTMLDivElement>(null);

  // A modal owns the focus while it is open: move focus in, and hand it back to
  // whatever opened the gallery once it closes.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    panelRef.current?.focus();
    return () => previouslyFocused?.focus?.();
  }, []);

  // Keep Tab inside the dialog rather than letting it wander the page behind.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !panelRef.current) return;
      const items = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (!closing) return;
    const id = setTimeout(onDismissed, CLOSE_MS);
    return () => clearTimeout(id);
  }, [closing, onDismissed]);

  // Escape closes, arrows navigate.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') requestClose();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, requestClose]);

  // Freeze the page behind the overlay.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  // The panel inherits `hidden`/`visible` from the overlay: one flag drives
  // the backdrop fade and the zoom together.
  const panelVariants = reduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, scale: 0.94, y: 14 },
        visible: { opacity: 1, scale: 1, y: 0 },
      };

  // Springy on the way in, a quick tween on the way out: a spring would still
  // be settling when CLOSE_MS unmounts the overlay, which reads as a cut.
  const panelTransition =
    closing || reduceMotion
      ? { duration: 0.2, ease: EASE }
      : { type: 'spring' as const, stiffness: 260, damping: 26, mass: 0.9 };

  const arrow =
    'absolute top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center ' +
    'bg-white/90 hover:bg-white text-gray-800 border-2 border-gray-800 rounded ' +
    'transition-transform duration-200 hover:scale-105 active:scale-95';

  return (
    <motion.div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-gray-900/60 backdrop-blur-md ${
        closing ? 'pointer-events-none' : ''
      }`}
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
      initial="hidden"
      animate={closing ? 'hidden' : 'visible'}
      transition={{ duration: closing ? 0.2 : 0.25, ease: EASE }}
      onClick={requestClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} gallery`}
    >
      <motion.div
        ref={panelRef}
        tabIndex={-1}
        variants={panelVariants}
        transition={panelTransition}
        onClick={(e) => e.stopPropagation()}
        className="tt-screen crt-screen crt-lines relative w-full max-w-[96vw] max-h-full overflow-hidden border-2 sm:border-[3px] border-gray-800 rounded-lg sm:rounded-xl"
      >
        <WindowChrome project={project} onClose={requestClose} />

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_clamp(300px,27vw,400px)]">
          {/* Carousel */}
          <div
            className={`relative h-[42vh] sm:h-[50vh] lg:h-[72vh] ${gallery.bg}`}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
          >
            {/* Default `sync` mode: the slides are absolutely positioned and
                stacked, so the outgoing and incoming frames cross-fade in place. */}
            <AnimatePresence initial={false} custom={direction}>
              <motion.img
                key={index}
                src={gallery.images[index]}
                alt={`${project.name}, view ${index + 1} of ${total}`}
                decoding="async"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: EASE }}
                className="absolute inset-0 w-full h-full object-contain"
              />
            </AnimatePresence>

            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous screenshot"
              className={`${arrow} left-2 sm:left-3`}
            >
              <FaChevronLeft className="text-sm" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next screenshot"
              className={`${arrow} right-2 sm:right-3`}
            >
              <FaChevronRight className="text-sm" />
            </button>
          </div>

          {/* Floating description */}
          <div className="relative lg:h-[72vh] bg-gray-100 border-t-2 lg:border-t-0 lg:border-l-2 border-gray-800 overflow-y-auto no-scrollbar">
            <div className="flex min-h-full items-center p-4 sm:p-5">
              <motion.div
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.12, duration: 0.45, ease: EASE }}
                className="flex w-full flex-col p-4 bg-white border-2 border-gray-800 rounded-lg shadow-[4px_4px_0px_0px_rgba(31,41,55)]"
              >
                <h2 className="text-xl font-bold text-gray-900 leading-tight">
                  {project.name}
                </h2>

                <p className="mt-1.5 text-sm font-medium text-gray-800 leading-snug">
                  {project.tagline}
                </p>

                <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                  {project.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-[11px] font-mono text-gray-700 bg-gray-100 border border-gray-300 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-2">
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-bold text-white bg-gray-800 border-2 border-gray-800 rounded hover:bg-gray-700 transition-colors"
                    >
                      <FaExternalLinkAlt className="text-xs" />
                      Live Demo
                    </a>
                  )}
                  {project.download && (
                    <a
                      href={project.download}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-bold text-white bg-gray-800 border-2 border-gray-800 rounded hover:bg-gray-700 transition-colors"
                    >
                      <FaDownload className="text-xs" />
                      Download
                    </a>
                  )}
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-bold text-gray-800 bg-white border-2 border-gray-800 rounded hover:bg-gray-100 transition-colors"
                  >
                    <FaGithub className="text-sm" />
                    Code
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Thumbnail strip doubles as the status bar */}
        <div className="flex items-center gap-3 px-3 py-2 bg-gray-200 border-t-2 border-gray-800">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {gallery.images.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => jumpTo(i)}
                aria-label={`Go to screenshot ${i + 1}`}
                aria-current={i === index}
                className={`shrink-0 w-14 h-9 sm:w-16 sm:h-10 overflow-hidden border-2 rounded transition-all duration-300 ${
                  i === index
                    ? 'border-gray-800 opacity-100 scale-100'
                    : 'border-gray-400 opacity-55 hover:opacity-100 scale-95 hover:scale-100'
                } ${gallery.bg}`}
              >
                <img
                  src={src}
                  alt=""
                  aria-hidden
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain"
                />
              </button>
            ))}
          </div>

          <span className="ml-auto shrink-0 font-mono text-[11px] font-bold text-gray-600">
            {index + 1} / {total}
          </span>

          <button
            type="button"
            onClick={requestClose}
            aria-label="Close gallery"
            className="shrink-0 w-7 h-7 flex items-center justify-center text-gray-800 bg-white border-2 border-gray-800 rounded hover:bg-gray-100 transition-transform duration-200 hover:scale-105 active:scale-95"
          >
            <IoClose />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

/**
 * Rendered into `document.body` so the overlay escapes the `overflow-hidden`
 * browser window and the scrolling content column above it.
 */
const LightboxPortal = ({
  project,
  onDismissed,
}: {
  project: Project | null;
  onDismissed: () => void;
}) =>
  createPortal(
    project?.gallery ? (
      <Lightbox
        key={project.name}
        project={project}
        gallery={project.gallery}
        onDismissed={onDismissed}
      />
    ) : null,
    document.body,
  );

/* ------------------------------------------------------------------ */
/* Compact card: no artwork, the name does the work                    */
/* ------------------------------------------------------------------ */

const CompactCard = ({ project, index }: { project: Project; index: number }) => (
  <motion.article
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 + index * 0.08, duration: 0.35 }}
    className="group relative flex flex-col p-4 overflow-hidden rounded-lg
      bg-gray-900 border-2 border-gray-800
      shadow-[3px_3px_0px_0px_rgba(31,41,55)] hover:shadow-[5px_5px_0px_0px_rgba(31,41,55)]
      transition-shadow duration-200"
  >
    {/* Grid pattern backdrop */}
    <div
      aria-hidden
      className="absolute inset-0 opacity-[0.07] transition-opacity duration-300 group-hover:opacity-[0.14]"
      style={{
        backgroundImage:
          'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
        backgroundSize: '14px 14px',
      }}
    />

    <div className="relative flex flex-col h-full">
      <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-gray-500">
        {project.category}
      </span>

      <h2 className="mt-1.5 font-mono text-base font-bold text-white leading-tight">
        {project.name}
      </h2>

      <p className="mt-1.5 text-xs text-gray-400 leading-relaxed">{project.tagline}</p>

      <div className="mt-2.5 flex flex-wrap gap-1">
        {project.stack.slice(0, 3).map((tech) => (
          <span
            key={tech}
            className="px-1.5 py-0.5 text-[10px] font-mono text-gray-300 border border-gray-700 rounded"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-3 flex items-center gap-3 text-xs font-bold">
        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors"
        >
          <FaGithub />
          Code
        </a>
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors"
          >
            <FaExternalLinkAlt className="text-[10px]" />
            Demo
          </a>
        )}
      </div>
    </div>
  </motion.article>
);

/* ------------------------------------------------------------------ */

const Projects = () => {
  const featured = projects.filter((p) => p.gallery);
  const compact = projects.filter((p) => !p.gallery);
  const [lightbox, setLightbox] = useState<Project | null>(null);

  const openLightbox = useCallback((project: Project) => setLightbox(project), []);
  const closeLightbox = useCallback(() => setLightbox(null), []);

  return (
    <div className="px-1 py-4">
      <div className="mb-5 space-y-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Selected Work</h1>
        <p className="text-sm text-gray-500">
          Five products across web, backend, mobile and desktop, each built end to end.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {featured.map((project, i) => (
          <FeaturedCard
            key={project.name}
            project={project}
            index={i}
            onExpand={openLightbox}
          />
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {compact.map((project, i) => (
          <CompactCard key={project.name} project={project} index={i} />
        ))}
      </div>

      <a
        href="https://github.com/igarridosi"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 flex items-center justify-center gap-2 p-3 text-sm font-medium text-gray-700 border-2 border-gray-300 rounded-lg hover:border-gray-800 hover:text-gray-900 transition-colors"
      >
        <FaGithub />
        See all repositories on GitHub →
      </a>

      <LightboxPortal project={lightbox} onDismissed={closeLightbox} />
    </div>
  );
};

export default Projects;
