import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEnvelope, FaDownload, FaLinkedinIn, FaGithub, FaMapMarkerAlt } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const ROLES = ['Developer', 'Engineer', 'Builder'];

/**
 * Splits a label into per-character spans so CSS can stagger them off
 * `--char-index`. Hidden from assistive tech: a screen reader handed one span
 * per letter reads the word out letter by letter, so the button carries a
 * plain `aria-label` instead.
 */
const SplitText = ({ text }: { text: string }) => (
  <span aria-hidden="true">
    {[...text].map((char, i) => (
      <span
        key={`${char}-${i}`}
        className={`split-char${char === ' ' ? ' split-char--space' : ''}`}
        style={{ '--char-index': i } as React.CSSProperties}
      >
        {char === ' ' ? ' ' : char}
      </span>
    ))}
  </span>
);

const useTypewriter = () => {
  const [text, setText] = useState('');
  const [roleIdx, setRoleIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = ROLES[roleIdx % ROLES.length];

    if (!isDeleting && text === current) {
      const pause = setTimeout(() => setIsDeleting(true), 1800);
      return () => clearTimeout(pause);
    }

    if (isDeleting && text === '') {
      setIsDeleting(false);
      setRoleIdx(i => i + 1);
      return;
    }

    const speed = isDeleting ? 60 : 110;
    const tick = setTimeout(() => {
      setText(isDeleting
        ? current.slice(0, text.length - 1)
        : current.slice(0, text.length + 1)
      );
    }, speed);

    return () => clearTimeout(tick);
  }, [text, isDeleting, roleIdx]);

  return text;
};

const Section1 = () => {
  const navigate = useNavigate();
  const typedText = useTypewriter();

  return (
    <motion.div
      className="w-full h-full flex flex-col justify-center sm:px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="hero-title space-y-0">
        {/* Name tag */}
        <p className="text-xs sm:text-sm uppercase tracking-[0.25em] font-mono text-gray-400 mb-5">
          Hey, I am Ibai Garrido
        </p>

        {/* Main heading */}
        <div className="hero-gap-sm">
          {/* One heading, three lines: screen readers announce
              "Fullstack Application Developer", not three separate titles. */}
          <h1>
            <span className="hero-line-1 flex items-baseline gap-1.5 sm:gap-2 text-gray-900">
              <span aria-hidden="true" className="text-[0.55em] leading-none">&lt;/&gt;</span>
              Fullstack
            </span>
            <span className="hero-line-2 block font-bold text-gray-900">
              Application
            </span>
            <span className="hero-line-3 block font-mono text-gray-900">
              <span className="sr-only">Developer</span>
              <span aria-hidden="true">
                {typedText}<span className="cursor-blink">|</span>
              </span>
            </span>
          </h1>
        </div>

        {/* Professional tagline */}
        <div className="hero-gap-md space-y-2">
          <p className="text-sm sm:text-base lg:text-lg text-gray-700 font-medium">
            High-concurrency desktop apps and data-heavy web platforms. Fast on both.
          </p>
          <p className="text-xs sm:text-sm font-mono text-gray-400 flex items-center gap-2 flex-wrap">
            <FaMapMarkerAlt className="text-gray-400" />
            <span>Prague, Czech Republic</span>
            <span className="text-gray-300">·</span>
            <span className="text-green-600 font-semibold">Open to work</span>
          </p>
          <p className="text-xs font-mono text-gray-500">
            On-site or hybrid in Prague · Remote across Europe
          </p>
        </div>

        {/* CTA buttons */}
        <div className="hero-gap-sm flex flex-wrap gap-3">
          <motion.button
            onClick={() => navigate('/contact')}
            aria-label="Get in Touch"
            className="btn-split px-5 py-2.5 sm:px-7 sm:py-3.5 bg-transparent rounded-lg border-2 border-gray-800
                    shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)]
                    hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]
                    transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-gray-800">
              <SplitText text="Get in Touch" />
              <FaEnvelope aria-hidden="true" />
            </span>
          </motion.button>

          <motion.a
            href="/cv/Ibai_Garrido_CV.pdf"
            download="Ibai_Garrido_CV.pdf"
            aria-label="Download CV"
            className="btn-split px-5 py-2.5 sm:px-7 sm:py-3.5 bg-transparent rounded-lg border-2 border-gray-800
                    shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)]
                    hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]
                    transition-all duration-300 inline-flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-gray-800">
              <SplitText text="Download CV" />
              <FaDownload aria-hidden="true" />
            </span>
          </motion.a>
        </div>

        {/* Social links */}
        <div className="flex items-center gap-4">
          <a
            href="https://www.linkedin.com/in/ibai-garrido/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors font-mono"
          >
            <FaLinkedinIn className="text-base" />
            LinkedIn
          </a>
          <span className="text-gray-300">·</span>
          <a
            href="https://github.com/igarridosi"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors font-mono"
          >
            <FaGithub className="text-base" />
            GitHub
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default Section1;
