import { useNavigate } from 'react-router-dom';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { motion } from 'framer-motion';

const socialLinks = [
  { id: 'linkedin', label: 'Linkedin', icon: <FaLinkedinIn className="text-xl sm:text-3xl" />, url: 'https://www.linkedin.com/in/ibai-garrido-699826353/' },
  { id: 'github', label: 'Github', icon: <FaGithub className="text-xl sm:text-3xl" />, url: 'https://github.com/igarridosi' },
];

function Footer() {
  const navigate = useNavigate();

  return (
    <motion.footer
      className="flex justify-center items-center py-4 sm:py-6 lg:py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-3 gap-0">
        {socialLinks.map(({ id, label, icon, url }, index) => (
          <motion.a
            key={id}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group w-24 h-24 sm:w-48 sm:h-48 lg:w-64 lg:h-64 flex justify-center items-center border border-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <span className="absolute inset-0 bg-gray-700 transition-all duration-300 transform scale-0 group-hover:scale-100" />
            <span className="relative z-10 transition-all duration-300">
              <span className="text-gray-700 group-hover:hidden">{icon}</span>
              <span className="hidden group-hover:block text-white text-xs sm:text-lg lg:text-xl font-bold">{label}</span>
            </span>
          </motion.a>
        ))}

        <motion.button
          onClick={() => {
            window.scrollTo({ top: 110, behavior: 'smooth' });
            setTimeout(() => navigate('/contact'), 100);
          }}
          className="relative group w-24 h-24 sm:w-48 sm:h-48 lg:w-64 lg:h-64 flex justify-center items-center border border-gray-400 cursor-pointer bg-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <span className="absolute inset-0 bg-gray-700 transition-all duration-300 transform scale-0 group-hover:scale-100" />
          <span className="relative z-10 transition-all duration-300">
            <span className="text-gray-700 group-hover:hidden"><MdEmail className="text-xl sm:text-3xl" /></span>
            <span className="hidden group-hover:block text-white text-xs sm:text-lg lg:text-xl font-bold">Gmail</span>
          </span>
        </motion.button>
      </div>
    </motion.footer>
  );
}

export default Footer;
