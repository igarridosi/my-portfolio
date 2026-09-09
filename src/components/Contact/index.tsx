import { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { MdEmail, MdPerson, MdMessage } from 'react-icons/md';
import { BiSend } from 'react-icons/bi';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';

const DIRECT_LINKS = [
  {
    icon: <MdEmail className="text-xl" />,
    label: 'Gmail',
    href: 'mailto:garridotab4@gmail.com',
  },
  {
    icon: <FaLinkedinIn className="text-lg" />,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/ibai-garrido/',
    external: true,
  },
  {
    icon: <FaGithub className="text-lg" />,
    label: 'GitHub',
    href: 'https://github.com/igarridosi',
    external: true,
  },
];

const OWNER_EMAIL = 'garridotab4@gmail.com';

/* EmailJS occasionally refuses a request that looks perfectly fine from here:
   the Gmail authorisation behind the service expires, the monthly quota runs
   out, or - most often for a portfolio - the visitor runs an ad blocker and
   `api.emailjs.com` never gets called at all. None of that is recoverable in
   the browser, so the promise is given a deadline and the failure is made
   useful instead of being swallowed. */
const SEND_TIMEOUT_MS = 15000;

/** A message that failed to send is not lost: it is handed to the visitor's
    own mail client, already written. */
const mailtoFallback = (name: string, email: string, message: string) =>
  `mailto:${OWNER_EMAIL}?subject=${encodeURIComponent(
    `Portfolio enquiry from ${name || 'a visitor'}`,
  )}&body=${encodeURIComponent(`${message}

-- 
${name}
${email}`)}`;

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');

    try {
      await Promise.race([
        emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          {
            to_email: OWNER_EMAIL,
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
          },
          { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY },
        ),
        new Promise((_, reject) =>
          setTimeout(
            () => reject(new Error(`No response after ${SEND_TIMEOUT_MS}ms`)),
            SEND_TIMEOUT_MS,
          ),
        ),
      ]);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus(''), 4000);
    } catch (err) {
      // The old handler discarded this. EmailJS puts the real reason in
      // `text` (expired Gmail token, quota exceeded, bad template id), which
      // is the difference between fixing this in a minute and guessing.
      const detail =
        err && typeof err === 'object' && 'text' in err
          ? (err as { text: string }).text
          : err instanceof Error
            ? err.message
            : String(err);
      console.error('[contact] send failed:', detail, err);
      setStatus('error');
      // No auto-dismiss on failure: the fallback link below has to stay put
      // long enough for the visitor to actually use it.
    }
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
        <motion.h1
          className="text-2xl sm:text-3xl font-bold flex items-center justify-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <MdMessage className="text-3xl text-gray-700" />
          Let's Connect
        </motion.h1>
        <p className="text-gray-500 text-sm">
          Looking for a developer? I'd love to hear about the role.
        </p>
        <p className="text-xs font-mono text-gray-400">
          Prague · On-site, hybrid, or remote across Europe
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
          <motion.div
            className="text-center text-sm space-y-1"
            role="alert"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-red-600">Couldn't send that from here.</p>
            <p className="text-gray-500">
              <a
                href={mailtoFallback(formData.name, formData.email, formData.message)}
                className="underline hover:no-underline"
              >
                Open it in your mail app instead
              </a>{' '}
              - your message is kept.
            </p>
          </motion.div>
        )}
      </motion.form>
    </motion.div>
  );
};

export default Contact;
