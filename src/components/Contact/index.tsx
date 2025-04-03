import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MdEmail, MdPerson, MdMessage } from 'react-icons/md';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { BiSend } from 'react-icons/bi';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <motion.div 
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
          className="w-full py-3 px-6 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors duration-300 font-medium flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>Send Message</span>
          <BiSend className="text-xl" />
        </motion.button>

        <div className="text-center text-sm text-gray-500 mt-6">
          <p className="mb-3">Quick links:</p>
          <div className="flex justify-center gap-8">
            <motion.a 
              href="https://github.com/igarridosi" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-800 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaGithub size={22} />
            </motion.a>
            <motion.a 
              href="https://www.linkedin.com/in/ibai-garrido-699826353/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-800 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaLinkedinIn size={22} />
            </motion.a>
            <motion.a 
              href="mailto:garridotab4@gmail.com"
              className="text-gray-600 hover:text-gray-800 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <MdEmail size={22} />
            </motion.a>
          </div>
        </div>
      </motion.form>
    </motion.div>
  );
};

export default Contact;
