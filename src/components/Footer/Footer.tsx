import React from 'react';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { MdEmail } from "react-icons/md";
import { motion } from 'framer-motion';

const Footer = () => {
const socialLinks = [
    { id: 'linkedin', label: 'Linkedin', icon: <FaLinkedinIn size={30} />, url: 'https://www.linkedin.com/in/ibai-garrido-699826353/' },
    { id: 'github', label: 'Github', icon: <FaGithub size={30} />, url: 'https://github.com/igarridosi' },
    { id: 'facebook', label: 'Gmail', icon: <MdEmail size={30} />, url: 'garridotab4@gmail.com' },
];

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
            <span
            className="absolute inset-0 bg-gray-700 transition-all duration-300 transform scale-0 group-hover:scale-100"
            ></span>
            <span className="relative z-10 transition-all duration-300">
            <span className="text-gray-700 group-hover:hidden text-sm sm:text-base lg:text-lg">{icon}</span>
            <span className="hidden group-hover:block text-white text-sm sm:text-lg lg:text-xl font-bold">{label}</span>
            </span>
        </motion.a>
        ))}
    </div>
    </motion.footer>
);
};

export default Footer;
