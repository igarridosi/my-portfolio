import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEnvelope, FaCode, FaDownload, FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const ROLES = ['Developer', 'Engineer', 'Builder'];

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
      <main className="space-y-0">
        {/* Name tag */}
        <p className="text-xs sm:text-sm uppercase tracking-[0.25em] font-mono text-gray-400 mb-5">
          Hey, I am Ibai Garrido
        </p>

        {/* Main heading */}
        <div className="leading-none mb-5">
          <h1 className="sm:text-9xl text-6xl font-thin flex items-center gap-3 text-gray-900">
            <FaCode className="text-gray-800" />
            Fullstack
          </h1>
          <h1 className="sm:text-8xl text-5xl font-bold font-serif text-gray-900">
            Application
          </h1>
          <h1 className="sm:text-6xl text-4xl font-mono text-gray-900 mt-5">
            {typedText}<span className="cursor-blink">|</span>
          </h1>
        </div>

        {/* Professional tagline */}
        <div className="mb-8 space-y-1">
          <p className="text-base sm:text-lg text-gray-700 font-medium">
            End-to-end products — web, backend &amp; mobile.
          </p>
          <p className="text-sm font-mono text-gray-400 flex items-center gap-2">
            <span>Oiartzun, Spain</span>
            <span className="text-gray-300">·</span>
            <span className="text-green-600 font-semibold">Available for hire</span>
          </p>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-wrap gap-3 mb-6">
          <motion.button
            onClick={() => navigate('/contact')}
            className="px-7 py-3.5 bg-transparent rounded-lg border-2 border-gray-800
                    shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)]
                    hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]
                    transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="inline-flex items-center gap-2 text-base font-bold text-gray-800">
              Get in Touch
              <FaEnvelope />
            </span>
          </motion.button>

          <motion.a
            href="/cv/ibai-garrido-cv.pdf"
            download="Ibai_Garrido_CV.pdf"
            className="px-7 py-3.5 bg-transparent rounded-lg border-2 border-gray-800
                    shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)]
                    hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]
                    transition-all duration-300 inline-flex items-center gap-2 text-base font-bold text-white"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="inline-flex items-center gap-2 text-base font-bold text-gray-800">
              Download CV
              <FaDownload />
            </span>
          </motion.a>
        </div>

        {/* Social links */}
        <div className="flex items-center gap-4">
          <a
            href="https://www.linkedin.com/in/ibai-garrido-699826353/"
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
      </main>
    </motion.div>
  );
};

export default Section1;
