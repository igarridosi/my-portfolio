import React, { useState } from 'react';
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
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex flex-row justify-center items-start mt-5 p-10">
        <div className="relative bg-gradient-to-br from-gray-100 to-gray-300 p-10 rounded-3xl shadow-2xl border-4 border-black w-[1700px] h-[800px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 rounded-3xl blur-md -z-10"></div>
          
          {/* Container principal con contenido que se difumina */}
          <div className={`flex flex-row justify-between w-full transition-all duration-300 relative ${isBlurred ? 'blur-sm' : ''}`}>
            {/* Columna izquierda - Contenido */}
            <div className="w-1/2">
              <div className="w-[800px] max-h-[700px] overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 no-scrollbar">
                {renderSection()}
              </div>
            </div>
            {/* CV Section */}
            <div className="w-1/2">
              <CVSection setActiveSection={setActiveSection} />
            </div>
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
      <Footer />
    </div>
  );
}

export default App;