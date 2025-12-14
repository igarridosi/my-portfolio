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
          I’m a Junior Developer based in Oiartzun, Spain, driven by the challenge of building functional digital products from scratch. Rather than just writing lines of code, I focus on architecting complete solutions that combine robust logic with seamless user experiences across different platforms.
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
          My technical expertise spans across platforms. I build dynamic web interfaces using React and Tailwind CSS, develop scalable application logic with a strong core in C#, and create modern native mobile experiences using Kotlin (Jetpack Compose). My GitHub portfolio reflects this versatility, showcasing a wide range of projects, from web tools to mobile apps, where I prioritize clean architecture, performance, and maintainable code.
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
          I view development as a creative process. While I am capable of troubleshooting, I thrive most when conceptualizing and building new features to solve real-world problems. I leverage version control with Git and GitHub not just to save code, but to manage the evolution of my projects, believing that the best software is built through continuous iteration and clear structure.
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
          I am committed to mastering the ecosystem of mobile and desktop development. My goal is to join a forward-thinking team where I can apply my skills in C# and Kotlin to deliver impactful software. I aim to move beyond simple execution and contribute to the entire lifecycle of creating exceptional digital products.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default AboutMe;
