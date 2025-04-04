import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header/index';
import Section1 from './components/Section1/index';
import CVSection from './components/CVSection/CVSection';
import AboutMe from './components/AboutMe';
import Projects from './components/Projects';
import Skills from './components/Skills';
import MenuNav from './components/Navigation/MenuNav';
import Contact from './components/Contact';
import Footer from './components/Footer/Footer';

import { IoCaretBack, IoCaretForward, IoRefresh, IoSearch  } from "react-icons/io5";

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isBlurred, setIsBlurred] = useState(false);

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <Section1 setActiveSection={setActiveSection} />;
      case 'about':
        return <AboutMe />;
      case 'projects':
        return <Projects />;
      case 'skills':
        return <Skills />;
      case 'contact':
        return <Contact />;  // Asegúrate de que este caso esté bien definido
      default:
        return <Section1 setActiveSection={setActiveSection} />;
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header />
      <motion.div 
        className="flex flex-row justify-center items-start mt-2 p-3 sm:p-4 lg:p-12"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {/* Contenedor principal estilo ventana retro */}
        <div className="relative w-full sm:w-[80%] max-w-[1700px] min-h-[700px] overflow-hidden border-2 border-gray-800 bg-gray-100 rounded-lg sm:rounded-xl">
          {/* Barra superior estilo retro */}
          <div className="flex items-center h-10 bg-gray-200 border-b-2 border-gray-800 px-4">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500 border border-gray-800"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 border border-gray-800"></div>
              <div className="w-3 h-3 rounded-full bg-green-500 border border-gray-800"></div>
            </div>
          </div>

          {/* Barra de direcciones */}
          <div className="hidden md:flex items-center h-10 bg-gray-300 border-b-2 border-gray-800 px-4">
            <button className="px-2 py-1 text-sm font-bold text-gray-800 border border-gray-800 bg-gray-200 hover:bg-gray-300">
              <IoCaretBack className="text-gray-700" />
            </button>
            <button className="px-2 py-1 text-sm font-bold text-gray-800 border border-gray-800 bg-gray-200 hover:bg-gray-300 ml-2">
              <IoCaretForward className="text-gray-700" />
            </button>
            <button className="px-2 py-1 text-sm font-bold text-gray-800 border border-gray-800 bg-gray-200 hover:bg-gray-300 ml-2">
              <IoRefresh className="text-gray-700"/>
            </button>
            <input
              type="text"
              className="flex-1 mx-4 px-2 py-1 text-sm border border-gray-800 bg-gray-100"
              value="https://www.your-next-web-developer.dev/"
              readOnly
            />
            <button className="px-2 py-1 text-sm font-bold text-gray-800 border border-gray-800 bg-gray-200 hover:bg-gray-300">
              <IoSearch/>
            </button>
          </div>

          {/* Contenido principal */}
          <div className="p-4 sm:p-6 lg:p-10 bg-white">
            <div className={`flex flex-col lg:flex-row justify-between gap-4 sm:gap-6 w-full transition-all duration-300 relative ${isBlurred ? 'blur-sm' : ''}`}>
              {/* Columna izquierda - Contenido */}
              <motion.div 
                className="w-full lg:w-[60%] flex justify-center order-1 lg:order-1"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <div className="w-full max-w-[800px] h-auto sm:h-[500px] lg:h-[700px] overflow-y-auto p-4 sm:p-6 md:px-8 rounded-xl no-scrollbar sm:bg-transparent">
                  {renderSection()}
                </div>
              </motion.div>
              {/* CV Section */}
              <motion.div 
                className="w-full lg:w-[45%] flex justify-center order-2 lg:order-2 mt-4 lg:mt-0"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <CVSection setActiveSection={setActiveSection} />
              </motion.div>
            </div>

            {/* Menú siempre visible por encima del blur */}
            <div className="flex items-center justify-center z-[60]">
              <MenuNav 
                activeSection={activeSection}
                setActiveSection={setActiveSection}
                onMenuToggle={setIsBlurred}
              />
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <Footer />
      </motion.div>
    </motion.div>
  );
}

export default App;