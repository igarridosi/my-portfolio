import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface MenuNavProps {
activeSection: string;
setActiveSection: (section: string) => void;
onMenuToggle: (isOpen: boolean) => void;
}

const MenuNav = ({ activeSection, setActiveSection, onMenuToggle }: MenuNavProps) => {
const [isMenuOpen, setIsMenuOpen] = useState(false);

const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact Me' },
];

const menuVariants = {
    hidden: { opacity: 0, scale: 1 },
    visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
        duration: 0.7,
        scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
    }
    }
};

const handleMenuToggle = (open: boolean) => {
    setIsMenuOpen(open);
    onMenuToggle(open);
};

const handleSectionClick = (section: string) => {
    setActiveSection(section);
    handleMenuToggle(false);
};

return (
    <div className="w-full h-full">
        {/* Botón del menú */}
        <button
            onClick={() => handleMenuToggle(!isMenuOpen)}
            className="absolute top-15 left-5/6 sm:top-25 sm:left-5 hover:bg-gray-300 p-1 rounded-full transition-all duration-300 z-[60]"
        >
            <span className="sr-only">Menu</span>
            <svg
                className="w-6 h-6 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
            </svg>
        </button>

        {/* Menú desplegable centrado */}
        <motion.div 
            className={`absolute top-100 md:top-120 sm:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform z-[60] ${isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
            variants={menuVariants}
            initial="hidden"
            animate={isMenuOpen ? "visible" : "hidden"}
        >
            <div className="py-4 relative space-y-9 text-center">
                {menuItems.map(({ id, label }) => (
                    <motion.a
                        key={id}
                        onClick={() => handleSectionClick(id)}
                        className={`
                            block relative px-6 py-3 
                            rounded-full border-2 border-gray-700
                            transition-all duration-300 cursor-pointer
                            ${activeSection === id 
                                ? 'bg-gray-700 text-white border-gray-700' 
                                : 'hover:scale-105 bg-gray-200 text-gray-700 hover:text-gray-900'
                            }
                        `}
                    >
                        <span className="text-xl font-medium capitalize">
                            {label}
                        </span>
                    </motion.a>
                ))}
            </div>
        </motion.div>

        {/* Overlay */}
        {isMenuOpen && (
            <div 
                onClick={() => handleMenuToggle(false)}
                className="absolute inset-0 transition-all duration-300 text-center"
                style={{ zIndex: 50 }}
            />
        )}
    </div>
);
};

export default MenuNav;
