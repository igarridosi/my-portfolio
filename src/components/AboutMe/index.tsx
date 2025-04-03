import React from 'react';
import { motion } from 'framer-motion';
import { FaUserGraduate, FaCode, FaLaptopCode } from 'react-icons/fa';
import { MdWork } from 'react-icons/md';

const AboutMe = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="px-4 py-6 space-y-8"
    >
      {/* Introduction Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
          About Me
        </h2>
        <p className="text-gray-700 leading-relaxed">
          I'm a passionate web application development student based in Oiartzun, Spain, 
          with a strong focus on creating smooth, intuitive, and visually engaging digital experiences.
        </p>
      </motion.div>

      {/* Technical Focus */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        <h3 className="text-xl font-semibold flex items-center gap-3">
          <FaCode className="text-gray-700" />
          Technical Focus
        </h3>
        <p className="text-gray-700 leading-relaxed">
          I specialize in frontend development, working with HTML, CSS, JavaScript, and React 
          to build interactive and user-friendly applications. I'm experienced in version control 
          with Git and GitHub, and I prioritize performance optimization and accessibility standards.
        </p>
      </motion.div>

      {/* Work Approach */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="space-y-4"
      >
        <h3 className="text-xl font-semibold flex items-center gap-3">
          <MdWork className="text-gray-700" />
          Work Approach
        </h3>
        <p className="text-gray-700 leading-relaxed">
          I thrive in collaborative environments where creativity and problem-solving converge. 
          I believe the best results come from sharing ideas and learning from each other, 
          and I'm always eager to improve through collaboration and feedback.
        </p>
      </motion.div>

      {/* Professional Goals */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="space-y-4"
      >
        <h3 className="text-xl font-semibold flex items-center gap-3">
          <FaLaptopCode className="text-gray-700" />
          Professional Goals
        </h3>
        <p className="text-gray-700 leading-relaxed">
          I'm passionate about continuous learning and growth in web development. 
          Whether it's optimizing performance, experimenting with new design trends, 
          or collaborating on features, I'm committed to creating exceptional web experiences.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default AboutMe;
