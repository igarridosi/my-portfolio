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

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isBlurred, setIsBlurred] = useState(false);

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <Section1 />;
      case 'about':
        return <AboutMe />;
      case 'projects':
        return <Projects />;
      case 'skills':
        return <Skills />;
      case 'contact':
        return <Contact />;
      default:
        return <Section1 />;
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
        className="flex flex-row justify-center items-start mt-3 p-0 sm:p-4 lg:p-12"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="relative bg-transparent sm:bg-gradient-to-br sm:from-gray-100 sm:to-gray-300 p-2 sm:p-6 lg:p-10 sm:rounded-3xl sm:shadow-black sm:shadow-2xl sm:border-3 sm:border-gray-600 w-full sm:w-[95%] max-w-[1700px] min-h-[750px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 rounded-3xl blur-md -z-10 hidden sm:block"></div>
          
          {/* Container principal con contenido que se difumina */}
          <div className={`flex flex-col lg:flex-row justify-between gap-4 sm:gap-6 w-full transition-all duration-300 relative ${isBlurred ? 'blur-sm' : ''}`}>
            {/* Columna izquierda - Contenido */}
            <motion.div 
              className="w-full lg:w-[60%] flex justify-center order-1 lg:order-1"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <div className="w-full max-w-[800px] h-auto sm:h-[500px] lg:h-[700px] overflow-y-auto p-12 sm:p-4 rounded-xl no-scrollbar sm:bg-transparent">
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