import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex flex-col min-h-screen bg-dark-950">
      <Header />
      
      {/* Mobile menu button */}
      <button
        onClick={toggleSidebar}
        className="fixed bottom-4 right-4 z-50 md:hidden bg-primary-600 text-white p-4 rounded-full shadow-lg hover:bg-primary-700 transition-colors"
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

      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
        
        <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
