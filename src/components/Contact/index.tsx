import React, { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { MdEmail, MdPerson, MdMessage } from 'react-icons/md';
import { BiSend } from 'react-icons/bi';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    emailjs.send(
      'service_nxm1abo', // Reemplaza con tu Service ID de EmailJS
      'template_hqqmp9k', // Reemplaza con tu Template ID
      {
        to_email: 'garridotab4@gmail.com',
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
      },
      'cT9XkYIydkiqGByKR' // Reemplaza con tu Public Key
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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <motion.div 
      id="contact-section"
      className="flex flex-col gap-6 m-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center space-y-4">
        <motion.h2 
          className="text-2xl sm:text-3xl font-bold flex items-center justify-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <MdMessage className="text-3xl sm:text-4xl text-gray-700" />
          Let's Connect
        </motion.h2>
        
        <motion.div 
          className="max-w-2xl mx-auto space-y-3 px-4 text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <p className="text-base sm:text-lg">
            Looking for a web developer? Let's create something amazing together.
          </p>
          <p className="font-medium text-gray-700 text-sm sm:text-base">
            Drop me a message, and I'll get back to you soon!
          </p>
        </motion.div>
      </div>

      <motion.form 
        onSubmit={handleSubmit}
        className="space-y-4 w-full max-w-md mx-auto px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <div className="space-y-4">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <MdPerson className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 bg-transparent border-2 border-gray-400 rounded-lg focus:border-gray-700 focus:outline-none transition-colors duration-300"
              required
            />
          </motion.div>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="relative"
          >
            <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 bg-transparent border-2 border-gray-400 rounded-lg focus:border-gray-700 focus:outline-none transition-colors duration-300"
              required
            />
          </motion.div>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="relative"
          >
            <MdMessage className="absolute left-3 top-3 text-gray-400 text-xl" />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full pl-10 pr-4 py-2 bg-transparent border-2 border-gray-400 rounded-lg focus:border-gray-700 focus:outline-none transition-colors duration-300 resize-none"
              required
            />
          </motion.div>
        </div>

        <motion.button
          type="submit"
          disabled={status === 'sending'}
          className={`w-full py-3 px-6 ${
            status === 'sending' 
              ? 'bg-gray-400' 
              : 'bg-gray-700 hover:bg-gray-600'
          } text-white rounded-lg transition-colors duration-300 font-medium flex items-center justify-center gap-2`}
          whileHover={{ scale: status === 'sending' ? 1 : 1.02 }}
          whileTap={{ scale: status === 'sending' ? 1 : 0.98 }}
        >
          <span>
            {status === 'sending' 
              ? 'Sending...' 
              : 'Send Message'}
          </span>
          <BiSend className="text-xl" />
        </motion.button>

        {status === 'success' && (
          <motion.p 
            className="text-green-600 text-center mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Message sent successfully!
          </motion.p>
        )}

        {status === 'error' && (
          <motion.p 
            className="text-red-600 text-center mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Failed to send message. Please try again.
          </motion.p>
        )}
      </motion.form>
    </motion.div>
  );
};

export default Contact;
