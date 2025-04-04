import React from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaUser, FaCode } from 'react-icons/fa';

interface Section1Props {
setActiveSection?: (section: string) => void;
}

function Section1({ setActiveSection }: Section1Props) {
return (
    <>
    <div className="w-full sm:px-4 sm:py-2">
        <main className="mt-20">
        <h2 className="text-xl uppercase tracking-wider mb-4 font-mono font-bold">
            HEY, I AM IBAI GARRIDO
        </h2>
        <div className="max-w-3xl text-justify">
            <div className="grid grid-cols-1">
            <h1 className="sm:text-9xl text-6xl leading-tight font-thin flex items-center gap-2">
                <FaCode className="text-black" />
                Web
            </h1>
            <h1 className="sm:text-8xl text-5xl font-bold leading-tight font-serif">
                Application
            </h1>
            <h1 className="sm:text-6xl text-4xl leading-tight mb-6 font-mono flex items-center gap-2">
                Developer
            </h1>
            </div>
            <p className="text-xl mb-8">Based in Oiartzun, Spain.</p>
            <motion.button
            onClick={() => setActiveSection && setActiveSection('contact')}
            className="relative px-8 py-4 bg-transparent overflow-hidden rounded-lg border-2 border-gray-800 
                    shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] 
                    hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]
                    transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            >
            <span className="absolute inset-0 bg-gray-800 transform origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
            <span className="relative z-10 inline-flex items-center gap-2 text-lg font-bold text-gray-800 transition-colors duration-300">
                Get in Touch
                <FaEnvelope className="text-xl" />
            </span>
            </motion.button>
        </div>
        </main>
    </div>
    </>
);
}

export default Section1;