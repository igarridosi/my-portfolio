import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { projects, type Project, type Gallery } from '../../data/projects';

const AUTOPLAY_MS = 5000;

/* ------------------------------------------------------------------ */
/* Quick-look carousel                                                 */
/* ------------------------------------------------------------------ */

const Carousel = ({ gallery, name }: { gallery: Gallery; name: string }) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = gallery.images.length;
  const reduceMotion = useReducedMotion();

  const go = (step: number) => {
    setDirection(step);
    setIndex((i) => (i + step + total) % total);
  };

  const jumpTo = (i: number) => {
    setDirection(i > index ? 1 : -1);
    setIndex(i);
  };

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

  // Portrait phone mockups need a tall frame or the UI inside becomes illegible.
  const frame =
    gallery.layout === 'portrait' ? 'h-[420px] sm:h-[560px]' : 'aspect-video';

  return (
    <div
      className={`relative w-full overflow-hidden border-b-2 border-gray-800 group ${frame} ${gallery.bg}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.img
          key={index}
          src={gallery.images[index]}
          alt={`${name}, view ${index + 1} of ${total}`}
          loading="lazy"
          decoding="async"
          custom={direction}
          initial={{ opacity: 0, x: direction > 0 ? 40 : -40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction > 0 ? -40 : 40 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          className="absolute inset-0 w-full h-full object-contain"
        />
      </AnimatePresence>

      {/* Prev / next */}
      <button
        type="button"
        onClick={() => go(-1)}
        aria-label={`Previous ${name} screenshot`}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center
          bg-white/85 hover:bg-white text-gray-800 border-2 border-gray-800 rounded
          opacity-100 sm:opacity-0 sm:group-hover:opacity-100 focus-visible:opacity-100
          transition-opacity duration-200"
      >
        <FaChevronLeft className="text-xs" />
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        aria-label={`Next ${name} screenshot`}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center
          bg-white/85 hover:bg-white text-gray-800 border-2 border-gray-800 rounded
          opacity-100 sm:opacity-0 sm:group-hover:opacity-100 focus-visible:opacity-100
          transition-opacity duration-200"
      >
        <FaChevronRight className="text-xs" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2 py-1 bg-white/85 border border-gray-800 rounded-full">
        {gallery.images.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => jumpTo(i)}
            aria-label={`Go to ${name} screenshot ${i + 1}`}
            aria-current={i === index}
            className={`h-1.5 rounded-full transition-all duration-200 ${
              i === index ? 'w-4 bg-gray-800' : 'w-1.5 bg-gray-400 hover:bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Large card: projects with a gallery                                 */
/* ------------------------------------------------------------------ */

const FeaturedCard = ({ project, index }: { project: Project; index: number }) => (
  <motion.article
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1, duration: 0.4 }}
    className="flex flex-col overflow-hidden bg-white border-2 border-gray-800 rounded-lg
      shadow-[3px_3px_0px_0px_rgba(31,41,55)] sm:shadow-[5px_5px_0px_0px_rgba(31,41,55)]
      hover:shadow-[5px_5px_0px_0px_rgba(31,41,55)] sm:hover:shadow-[8px_8px_0px_0px_rgba(31,41,55)]
      transition-shadow duration-200"
  >
    <div className="relative">
      {project.gallery && <Carousel gallery={project.gallery} name={project.name} />}
      <span className="absolute top-2 right-2 z-10 px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-gray-800 text-white border border-white/25 rounded">
        {project.category}
      </span>
    </div>

    <div className="flex flex-col flex-1 p-4">
      <h3 className="text-lg font-bold text-gray-900 leading-tight">{project.name}</h3>

      <p className="mt-1 text-sm font-medium text-gray-800 leading-snug">{project.tagline}</p>

      <p className="mt-2 text-sm text-gray-600 leading-relaxed">{project.description}</p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="px-2 py-0.5 text-[11px] font-mono text-gray-700 bg-gray-100 border border-gray-300 rounded"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-4 flex flex-wrap items-center gap-2">
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
    </div>
  </motion.article>
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

      <h3 className="mt-1.5 font-mono text-base font-bold text-white leading-tight">
        {project.name}
      </h3>

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

  return (
    <div className="px-1 py-4">
      <div className="mb-5 space-y-1">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Selected Work</h2>
        <p className="text-sm text-gray-500">
          Five products across web, backend, mobile and desktop, each built end to end.
        </p>
      </div>

      <div className="space-y-4">
        {featured.map((project, i) => (
          <FeaturedCard key={project.name} project={project} index={i} />
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
    </div>
  );
};

export default Projects;
