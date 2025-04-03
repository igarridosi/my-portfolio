import React, { useState } from 'react';

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
        {/* Botón en la esquina superior izquierda */}
        <button
            onClick={() => handleMenuToggle(!isMenuOpen)}
            className="absolute top-8 left-8 hover:bg-gray-300 p-1 rounded-full transition-all duration-300 z-[60]"
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
                    d={
                    isMenuOpen
                        ? 'M6 18L18 6M6 6l12 12'
                        : 'M4 6h16M4 12h16M4 18h16'
                    }
                />
            </svg>
        </button>

        {/* Menú desplegable centrado */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform transition-all duration-300 ease-in-out z-[60] ${isMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
            <div className="py-4 relative space-y-9">
            {menuItems.map(({ id, label }) => (
                <a
                key={id}
                onClick={() => handleSectionClick(id)}
                className="group block relative px-6 py-3 transition-all duration-300 cursor-pointer"
                >
                <div className={`absolute inset-0 -skew-x-6 border-2 rounded-full transform transition-all duration-300 ${activeSection === id ? 'bg-gray-200' : 'group-hover:bg-gray-200/50'}`} />
                <span className="relative text-xl text-black capitalize">{label}</span>
                </a>
            ))}
            </div>
        </div>

        {/* Overlay para el container */}
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
