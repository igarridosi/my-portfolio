import React from 'react';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { MdEmail } from "react-icons/md";

const Footer = () => {
const socialLinks = [
    { id: 'linkedin', label: 'Linkedin', icon: <FaLinkedinIn size={30} />, url: 'https://www.linkedin.com' },
    { id: 'github', label: 'Github', icon: <FaGithub size={30} />, url: 'https://www.behance.net' },
    { id: 'facebook', label: 'Gmail', icon: <MdEmail size={30} />, url: 'https://www.facebook.com' },
];

return (
    <footer className="flex justify-center items-center py-8">
    <div className="grid grid-cols-3 gap-0">
        {socialLinks.map(({ id, label, icon, url }) => (
        <a
            key={id}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group w-64 h-64 flex justify-center items-center border border-gray-400"
        >
            <span
            className="absolute inset-0 bg-black transition-all duration-300 transform scale-0 group-hover:scale-100"
            ></span>
            <span className="relative z-10 transition-all duration-300">
            <span className="text-black group-hover:hidden">{icon}</span>
            <span className="hidden group-hover:block text-white text-xl font-bold">{label}</span>
            </span>
        </a>
        ))}
    </div>
    </footer>
);
};

export default Footer;
