import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

const Layout = ({ children, theme, toggleTheme }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <>
      <Antigravity />
      <div className="
        min-h-screen flex flex-col 
        relative
        text-gray-900 
        dark:text-gray-100 
        pointer-events-none
      ">

        <div className="pointer-events-auto">
          <Header theme={theme} toggleTheme={toggleTheme} />
        </div>

        {/* Mobile menu button */}
        <button
          onClick={toggleSidebar}
          className="fixed bottom-4 right-4 z-50 md:hidden bg-primary-600 text-white p-4 rounded-full shadow-lg hover:bg-primary-700 transition-colors pointer-events-auto"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <div className="flex flex-1 pointer-events-auto">
          <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} theme={theme} toggleTheme={toggleTheme} />

          <main className="flex-1 p-4 md:p-8 overflow-x-hidden backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 rounded-tl-2xl">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>

        <div className="pointer-events-auto">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Layout;
