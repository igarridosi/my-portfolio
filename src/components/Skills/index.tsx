import { motion } from 'framer-motion';
import { FaReact, FaHtml5, FaGitAlt, FaGithub, FaJava } from 'react-icons/fa';
import { SiTypescript, SiTailwindcss, SiJavascript, SiMysql, SiMariadb, SiDotnet, SiKotlin, SiJetpackcompose, SiAndroid } from 'react-icons/si';
import { PiFileCSharp } from 'react-icons/pi';

const skillCategories = [
  {
    title: 'Frontend Development',
    skills: [
      { name: 'React', icon: <FaReact /> },
      { name: 'JavaScript', icon: <SiJavascript /> },
      { name: 'TypeScript', icon: <SiTypescript /> },
      { name: 'Tailwind CSS', icon: <SiTailwindcss /> },
      { name: 'HTML5 / CSS3', icon: <FaHtml5 /> },
    ],
  },
  {
    title: 'Backend & Core',
    skills: [
      { name: 'C#', icon: <PiFileCSharp /> },
      { name: '.NET', icon: <SiDotnet /> },
      { name: 'Java', icon: <FaJava /> },
    ],
  },
  {
    title: 'Mobile Development',
    skills: [
      { name: 'Kotlin', icon: <SiKotlin /> },
      { name: 'Jetpack Compose', icon: <SiJetpackcompose /> },
      { name: 'Android SDK', icon: <SiAndroid /> },
    ],
  },
  {
    title: 'Databases & Tools',
    skills: [
      { name: 'MySQL', icon: <SiMysql /> },
      { name: 'MariaDB', icon: <SiMariadb /> },
      { name: 'Git', icon: <FaGitAlt /> },
      { name: 'GitHub', icon: <FaGithub /> },
    ],
  },
];

function Skills() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full flex flex-col justify-center px-4 py-4"
    >
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-2xl sm:text-3xl font-bold mb-4"
      >
        Technical Skills
      </motion.h2>

      <div className="grid gap-3">
        {skillCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: categoryIndex * 0.1 }}
            className="p-4 border-2 border-gray-200 rounded-lg bg-white"
          >
            <h3 className="text-xs uppercase tracking-widest font-mono text-gray-400 mb-2">
              {category.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: categoryIndex * 0.1 + index * 0.05 }}
                  className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg bg-gray-50 hover:border-gray-800 hover:bg-white transition-colors duration-150"
                >
                  <span className="text-lg text-gray-700">{skill.icon}</span>
                  <span className="text-sm font-medium text-gray-800">{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default Skills;
