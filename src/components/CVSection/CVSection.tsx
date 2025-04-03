import React, { useState } from 'react';

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
    <div 
        className="relative w-full h-[720px] overflow-hidden flex justify-center items-start bg-gradient-to-b from-gray-300 to-white rounded-2xl"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
    >
        <img
        src="/img/CV_Foto-cut.png"
        alt="CV"
        className={`w-auto h-auto object-cover filter grayscale object-top scale-80 transition-opacity duration-300 ${isHovered ? 'opacity-40' : 'opacity-100'}`}
        style={{ transform: 'translateY(-200px)' }}
        />
        {isHovered && (
        <div
            className="absolute w-32 h-32 flex text-center items-center justify-center cursor-pointer bg-gray-700 text-white rounded-full transition-all duration-75"
            style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            transform: 'translate(-50%, -50%)',
            }}
            onClick={() => setActiveSection('contact')}
        >
            <p className='font-mono font-bold text-2xl m-4'>Contact Me👋</p>
        </div>
        )}
    </div>
    </section>
);
};

export default CVSection;
