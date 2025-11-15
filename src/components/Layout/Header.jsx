import { Link } from 'react-router-dom';
import { APP_NAME } from '../../constants';
import ThemeToggle from './ThemeToggle';

const Header = ({ theme, toggleTheme }) => {
  return (
    <header className="bg-white border-b border-gray-200 text-gray-900 shadow-lg 
    dark:bg-dark-900 dark:border-dark-800 dark:text-gray-100 ">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">

          <div className="flex items-center justify-between space-x-4">
            <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <span className="text-2xl">🛠️</span>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                {APP_NAME}
              </h1>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

            <nav className="hidden md:flex space-x-6">
              <a
                href="https://github.com/JeanCarlos88/QA-Tools"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-400 transition-colors"
              >
                GitHub
              </a>

              <a
                href="https://github.com/JeanCarlos88/QA-Tools/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-400 transition-colors"
              >
                Reportar Bug
              </a>
            </nav>

          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
