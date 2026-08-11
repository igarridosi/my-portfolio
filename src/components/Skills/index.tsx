import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaHtml5, FaGitAlt, FaGithub, FaJava, FaBolt, FaChartLine, FaLayerGroup } from 'react-icons/fa';
import {
  SiTypescript, SiTailwindcss, SiJavascript, SiMysql, SiMariadb, SiDotnet,
  SiKotlin, SiJetpackcompose, SiAndroid, SiNextdotjs, SiSass, SiPython,
  SiDocker, SiPostgresql, SiGithubactions,
} from 'react-icons/si';
import { MdSync, MdSpeed, MdAutoAwesome } from 'react-icons/md';
import { PiFileCSharp } from 'react-icons/pi';

interface Skill {
  name: string;
  icon: ReactNode;
}

const skillCategories: { title: string; skills: Skill[] }[] = [
  {
    title: 'Languages & Frontend',
    skills: [
      { name: 'TypeScript', icon: <SiTypescript /> },
      { name: 'JavaScript (ES6+)', icon: <SiJavascript /> },
      { name: 'React', icon: <FaReact /> },
      { name: 'Next.js', icon: <SiNextdotjs /> },
      { name: 'Tailwind CSS', icon: <SiTailwindcss /> },
      { name: 'Sass', icon: <SiSass /> },
      { name: 'HTML5 / CSS3', icon: <FaHtml5 /> },
    ],
  },
  {
    title: 'Backend & Systems',
    skills: [
      { name: 'C#', icon: <PiFileCSharp /> },
      { name: '.NET Core', icon: <SiDotnet /> },
      { name: 'Python', icon: <SiPython /> },
      { name: 'Java', icon: <FaJava /> },
      { name: 'RESTful APIs', icon: <FaLayerGroup /> },
      { name: 'Multithreading', icon: <FaBolt /> },
    ],
  },
  {
    title: 'Mobile',
    skills: [
      { name: 'Kotlin', icon: <SiKotlin /> },
      { name: 'Jetpack Compose', icon: <SiJetpackcompose /> },
      { name: 'Android SDK', icon: <SiAndroid /> },
    ],
  },
  {
    title: 'Databases',
    skills: [
      { name: 'PostgreSQL', icon: <SiPostgresql /> },
      { name: 'MySQL', icon: <SiMysql /> },
      { name: 'MariaDB', icon: <SiMariadb /> },
    ],
  },
  {
    title: 'Architecture & Practices',
    skills: [
      { name: 'Asynchronous Systems', icon: <MdSync /> },
      { name: 'UI Performance Profiling', icon: <MdSpeed /> },
      { name: 'Real-time Data Visualization', icon: <FaChartLine /> },
    ],
  },
  {
    title: 'Tools & DevOps',
    skills: [
      { name: 'Git', icon: <FaGitAlt /> },
      { name: 'GitHub', icon: <FaGithub /> },
      { name: 'Docker', icon: <SiDocker /> },
      { name: 'CI/CD', icon: <SiGithubactions /> },
      { name: 'AI-assisted development', icon: <MdAutoAwesome /> },
    ],
  },
];

function Skills() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full px-1 py-4"
    >
      <div className="mb-5 space-y-1">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-2xl sm:text-3xl font-bold text-gray-900"
        >
          Technical Skills
        </motion.h2>
        <p className="text-sm text-gray-500">
          What I reach for, grouped by where it lives in the stack.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {skillCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIndex * 0.07 }}
            className="p-4 border-2 border-gray-200 rounded-lg bg-white"
          >
            <h3 className="text-xs uppercase tracking-widest font-mono text-gray-400 mb-2.5">
              {category.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span
                  key={skill.name}
                  className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg bg-gray-50 hover:border-gray-800 hover:bg-white transition-colors duration-150"
                >
                  <span className="text-lg text-gray-700">{skill.icon}</span>
                  <span className="text-sm font-medium text-gray-800">{skill.name}</span>
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default Skills;
