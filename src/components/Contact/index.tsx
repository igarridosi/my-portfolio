import { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { MdEmail, MdPerson, MdMessage } from 'react-icons/md';
import { BiSend } from 'react-icons/bi';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';

const DIRECT_LINKS = [
  {
    icon: <MdEmail className="text-xl" />,
    label: 'garridotab4@gmail.com',
    href: 'mailto:garridotab4@gmail.com',
  },
  {
    icon: <FaLinkedinIn className="text-lg" />,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/ibai-garrido-699826353/',
    external: true,
  },
  {
    icon: <FaGithub className="text-lg" />,
    label: 'GitHub',
    href: 'https://github.com/igarridosi',
    external: true,
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        to_email: 'garridotab4@gmail.com',
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
    .then(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus(''), 3000);
    })
    .catch(() => {
      setStatus('error');
      setTimeout(() => setStatus(''), 3000);
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <motion.div
      className="flex flex-col gap-5 m-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="text-center space-y-2">
        <motion.h2
          className="text-2xl sm:text-3xl font-bold flex items-center justify-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <MdMessage className="text-3xl text-gray-700" />
          Let's Connect
        </motion.h2>
        <p className="text-gray-500 text-sm">
          Looking for a developer? I'd love to hear about your project.
        </p>
      </div>

      {/* Direct contact links */}
      <motion.div
        className="flex flex-wrap justify-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {DIRECT_LINKS.map(({ icon, label, href, external }) => (
          <a
            key={label}
            href={href}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="flex items-center gap-2 px-4 py-2 border-2 border-gray-200 rounded-lg bg-gray-50 hover:border-gray-800 hover:bg-white transition-all duration-150 text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            {icon}
            {label}
          </a>
        ))}
      </motion.div>

      {/* Divider */}
      <div className="flex items-center gap-3 px-4">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-xs text-gray-400 font-mono uppercase tracking-widest">or send a message</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="space-y-3 w-full max-w-md mx-auto px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <div className="space-y-3">
          <div className="relative">
            <label htmlFor="contact-name" className="sr-only">Your Name</label>
            <MdPerson className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
            <input
              id="contact-name"
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 bg-transparent border-2 border-gray-300 rounded-lg focus:border-gray-700 focus:outline-none transition-colors duration-300"
              required
            />
          </div>

          <div className="relative">
            <label htmlFor="contact-email" className="sr-only">Your Email</label>
            <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
            <input
              id="contact-email"
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 bg-transparent border-2 border-gray-300 rounded-lg focus:border-gray-700 focus:outline-none transition-colors duration-300"
              required
            />
          </div>

          <div className="relative">
            <label htmlFor="contact-message" className="sr-only">Your Message</label>
            <MdMessage className="absolute left-3 top-3 text-gray-400 text-xl" />
            <textarea
              id="contact-message"
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              rows={3}
              className="w-full pl-10 pr-4 py-2 bg-transparent border-2 border-gray-300 rounded-lg focus:border-gray-700 focus:outline-none transition-colors duration-300 resize-none"
              required
            />
          </div>
        </div>

        <motion.button
          type="submit"
          disabled={status === 'sending'}
          className={`w-full py-2.5 px-6 ${status === 'sending' ? 'bg-gray-400' : 'bg-gray-800 hover:bg-gray-700'} text-white rounded-lg transition-colors duration-300 font-medium flex items-center justify-center gap-2`}
          whileHover={{ scale: status === 'sending' ? 1 : 1.02 }}
          whileTap={{ scale: status === 'sending' ? 1 : 0.98 }}
        >
          <span>{status === 'sending' ? 'Sending...' : 'Send Message'}</span>
          <BiSend className="text-lg" />
        </motion.button>

        {status === 'success' && (
          <motion.p className="text-green-600 text-center text-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            Message sent successfully!
          </motion.p>
        )}
        {status === 'error' && (
          <motion.p className="text-red-600 text-center text-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            Failed to send message. Please try again.
          </motion.p>
        )}
      </motion.form>
    </motion.div>
  );
};

export default Contact;
