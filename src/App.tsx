import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IoCaretBack, IoCaretForward, IoRefresh, IoSearch } from 'react-icons/io5';

import Header from './components/Header/index';
import Section1 from './components/Section1/index';
import CVSection from './components/CVSection/CVSection';
import AboutMe from './components/AboutMe';
import Projects from './components/Projects';
import Skills from './components/Skills';
import MenuNav from './components/Navigation/MenuNav';
import Contact from './components/Contact';
import Footer from './components/Footer/Footer';

function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const displayUrl = `https://www.your-next-developer.dev${location.pathname}`;

  return (
    <motion.div
      className="min-h-screen bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header />

      <motion.div
        className="flex flex-row justify-center items-start mt-1 p-2 sm:p-3 lg:px-12 lg:py-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {/* Retro browser window */}
        <div className="relative w-full sm:w-[90%] lg:w-[80%] max-w-[1700px] overflow-hidden border-2 sm:border-3 border-gray-800 bg-gray-100 rounded-lg sm:rounded-xl shadow-[3px_3px_0px_0px_rgba(31,41,55)] sm:shadow-[10px_10px_0px_0px_rgba(31,41,55)]">

          {/* Traffic lights bar */}
          <div className="flex items-center h-8 sm:h-10 bg-gray-200 border-b-2 border-gray-800 px-3 sm:px-4">
            <div className="flex gap-1.5 sm:gap-2">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500 border border-gray-800" />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500 border border-gray-800" />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500 border border-gray-800" />
            </div>
          </div>

          {/* Address bar */}
          <div className="hidden md:flex items-center h-10 bg-gray-300 border-b-2 border-gray-800 px-4">
            <button onClick={() => navigate(-1)} className="px-2 py-1 text-sm font-bold text-gray-800 border border-gray-800 bg-gray-200 hover:bg-gray-300">
              <IoCaretBack className="text-gray-700" />
            </button>
            <button onClick={() => navigate(1)} className="px-2 py-1 text-sm font-bold text-gray-800 border border-gray-800 bg-gray-200 hover:bg-gray-300 ml-2">
              <IoCaretForward className="text-gray-700" />
            </button>
            <button onClick={() => window.location.reload()} className="px-2 py-1 text-sm font-bold text-gray-800 border border-gray-800 bg-gray-200 hover:bg-gray-300 ml-2">
              <IoRefresh className="text-gray-700" />
            </button>
            <input
              type="text"
              className="flex-1 mx-4 px-2 py-1 text-sm border border-gray-800 bg-gray-100 font-mono"
              value={displayUrl}
              readOnly
            />
            <button className="px-2 py-1 text-sm font-bold text-gray-800 border border-gray-800 bg-gray-200 hover:bg-gray-300">
              <IoSearch />
            </button>
          </div>

          {/* Navigation bookmarks bar */}
          <MenuNav />

          {/* Main content */}
          <div className="p-3 sm:p-6 lg:p-10 bg-white">
            <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-4 sm:gap-6 w-full">
              {/* Left column */}
              <motion.div
                className="flex justify-center"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <div className="w-full max-w-[800px] overflow-y-auto p-2 sm:p-6 md:px-8 rounded-xl no-scrollbar content-height">
                  <Routes>
                    <Route path="/" element={<Section1 />} />
                    <Route path="/about" element={<AboutMe />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/skills" element={<Skills />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="*" element={<Section1 />} />
                  </Routes>
                </div>
              </motion.div>

              {/* Right column — CV photo */}
              <motion.div
                className="flex justify-center"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <CVSection />
              </motion.div>
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

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
