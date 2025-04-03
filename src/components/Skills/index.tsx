import React from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaHtml5, FaCss3Alt, FaGitAlt, FaGithub, FaJava, FaLaravel, FaPhp, FaPython } from 'react-icons/fa';
import { SiTypescript, SiTailwindcss, SiJavascript, SiMysql, SiMariadb, SiBootstrap } from 'react-icons/si';

function Skills() {
  const skillCategories = [
    {
      title: "Frontend Development",
      skills: [
        { name: "HTML", icon: <FaHtml5 />, level: 90 },
        { name: "CSS", icon: <FaCss3Alt />, level: 85 },
        { name: "JavaScript", icon: <SiJavascript />, level: 80 },
        { name: "React", icon: <FaReact />, level: 75 },
        { name: "TypeScript", icon: <SiTypescript />, level: 70 },
      ]
    },
    {
      title: "Backend Development",
      skills: [
        { name: "PHP", icon: <FaPhp />, level: 65 },
        { name: "Java", icon: <FaJava />, level: 70 },
        { name: "Python", icon: <FaPython />, level: 60 },
      ]
    },
    {
      title: "Frameworks & Libraries",
      skills: [
        { name: "Laravel", icon: <FaLaravel />, level: 75 },
        { name: "Bootstrap", icon: <SiBootstrap />, level: 80 },
        { name: "Tailwind CSS", icon: <SiTailwindcss />, level: 85 },
      ]
    },
    {
      title: "Databases & Tools",
      skills: [
        { name: "MySQL", icon: <SiMysql />, level: 80 },
        { name: "MariaDB", icon: <SiMariadb />, level: 75 },
        { name: "Git", icon: <FaGitAlt />, level: 85 },
        { name: "GitHub", icon: <FaGithub />, level: 85 },
      ]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8 space-y-8"
    >
      <motion.h2 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-2xl sm:text-3xl font-bold mb-6"
      >
        Technical Skills
      </motion.h2>

      <div className="grid gap-6">
        {skillCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: categoryIndex * 0.2 }}
            className="p-6 border-2 border-gray-200 rounded-lg bg-white/50 backdrop-blur-sm"
          >
            <h3 className="text-xl font-bold mb-4 text-gray-800">{category.title}</h3>
            <div className="space-y-4">
              {category.skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: (categoryIndex * 0.2) + (index * 0.1) }}
                  className="relative"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl text-gray-700">{skill.icon}</span>
                    <span className="font-medium text-gray-800">{skill.name}</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: (categoryIndex * 0.2) + (index * 0.1) }}
                      className="h-full bg-gray-700 rounded-full"
                    />
                  </div>
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
