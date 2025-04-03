import React from 'react'
import { useState } from 'react';

function index() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
return (
    <>
        {/* Header */} 
        <div className="flex justify-center items-center mt-5">
            {/*
            <div className="flex justify-between items-center relative z-50">
            <div className="flex items-center space-x-2">
                <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 hover:bg-gray-100 rounded-full transition-all duration-300 relative z-50"
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

                <div className={`
                absolute top-full left-0 w-56 mt-2 
                transform transition-all duration-300 ease-in-out z-50
                ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}
                `}>
                <div className="py-4 relative space-y-3 text-center">
                    <a href="#home" 
                    className="group block relative px-6 py-3 transition-all duration-300">
                    <div className="absolute inset-0 -skew-x-6 border-2 rounded-full transform transition-all duration-300 group-hover:bg-gray-200 " />
                    <span className="relative text-xl text-black ">Home</span>
                    </a>
                    <a href="#about" 
                    className="group block relative px-6 py-3 transition-all duration-300">
                    <div className="absolute inset-0 -skew-x-6 border-2 rounded-full transform transition-all duration-300 group-hover:bg-gray-200" />
                    <span className="relative text-xl text-black ">About</span>
                    </a>
                    <a href="#projects" 
                    className="group block relative px-6 py-3 transition-all duration-300">
                    <div className="absolute inset-0 -skew-x-6 border-2 rounded-full transform transition-all duration-300 group-hover:bg-gray-200" />
                    <span className="relative text-xl text-black ">Projects</span>
                    </a>
                    <a href="#contact" 
                    className="group block relative px-6 py-3 transition-all duration-300">
                    <div className="absolute inset-0 -skew-x-6 border-2 rounded-full transform transition-all duration-300 group-hover:bg-gray-200" />
                    <span className="relative text-xl text-black ">Contact</span>
                    </a>
                </div>
                </div>

                <div 
                onClick={() => setIsMenuOpen(false)}
                className={`
                    fixed inset-0 bg-black/20 backdrop-blur-sm transition-all duration-300
                    ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}
                `}
                style={{ zIndex: 40 }}
                />
            </div>
            </div>
            */}
            {/* Imagen centrada arriba */}
            <img src="/img/ibai-logo-cut.png" alt="Icon" className="w-45 h-25 " />
            {/* Navigation 
            <div className="flex flex-col md:flex-row md:space-x-8">
            <a href="#" className="hover:text-red-600 transition-colors">
                [Contact]
            </a>
            </div>
            */}
        </div>
    </>
)
}

export default index