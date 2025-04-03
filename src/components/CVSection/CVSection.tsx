import React, { useState } from 'react';
import { ImArrowDownRight2 } from "react-icons/im";
import { motion } from 'framer-motion';

interface CVSectionProps {
setActiveSection: (section: string) => void;
}

const CVSection: React.FC<CVSectionProps> = ({ setActiveSection }) => {
const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
const [isHovered, setIsHovered] = useState(false);

const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.min(Math.max(event.clientX - rect.left, 50), rect.width - 50);
    const y = Math.min(Math.max(event.clientY - rect.top, 50), rect.height - 50);
    setMousePosition({ x, y });
};

return (
    <section className="relative flex flex-col items-center">
    <motion.div
        className="relative w-full h-[400px] sm:h-[500px] lg:h-[680px] max-h-[800px] overflow-hidden flex justify-center items-start bg-transparent sm:bg-gradient-to-b sm:from-gray-300 sm:to-white sm:rounded-2xl"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
    >
        <motion.img
        src="/img/CV_Foto-cut.png"
        alt="CV"
        className="w-auto h-[100vh] sm:h-[130vh] lg:h-[140vh] object-cover filter grayscale object-top scale-77 sm:scale-90"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ 
            opacity: isHovered ? 0.3 : 1,
            scale: 1 
        }}
        transition={{ 
            opacity: { duration: 0.3 },
            scale: { duration: 0.8, ease: "easeOut" }
        }}
        />
        {/* Indicador con flecha y texto "Me" - se oculta en hover */}
        {!isHovered && (
        <motion.div 
            className="absolute top-[240px] left-[50px] sm:top-[300px] sm:left-[100px] flex items-center gap-2 bg-white/90 px-3 py-1.5 rounded-full shadow-md"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
            delay: 0.3,
            duration: 0.3,
            ease: "backOut"
            }}
        >
            <span className="font-mono font-bold text-base sm:text-lg text-gray-800">Me</span>
            <ImArrowDownRight2 className="w-5 h-6 sm:w-6 sm:h-6 text-gray-800" />
        </motion.div>
        )}
        {isHovered && (
        <div
            className="absolute w-24 sm:w-28 lg:w-32 h-24 sm:h-28 lg:h-32 flex text-center items-center justify-center cursor-pointer bg-gray-700 text-white rounded-full transition-all duration-75"
            style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            transform: 'translate(-50%, -50%)',
            }}
            onClick={() => setActiveSection('contact')}
        >
            <p className='font-mono font-bold text-lg sm:text-xl lg:text-2xl m-2 sm:m-3 lg:m-4'>Contact Me👋</p>
        </div>
        )}
    </motion.div>
    </section>
);
};

export default CVSection;
