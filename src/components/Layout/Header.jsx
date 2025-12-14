import { Link } from 'react-router-dom';
import { APP_NAME } from '../../constants';
import ThemeToggle from './ThemeToggle';

const Header = ({ theme, toggleTheme }) => {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 text-gray-900 shadow-lg 
    dark:bg-dark-900/80 dark:border-dark-800 dark:text-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">

          {/* LOGO NOVA DO PROJETO */}
          <div className="flex items-center justify-between gap-4">
            <Link
              to="/"
              className="flex items-center gap-3 hover:opacity-90 transition-opacity"
              aria-label={`${APP_NAME} - Voltar para a página inicial`}
            >
              <img
                src="/QA-Tools/logo-qa-tools.svg"
                alt="Logo QA-Tools"
                className="h-10 w-10 md:h-12 md:w-12 rounded-lg shadow-lg shadow-primary-900/40 border border-dark-700 bg-dark-900"
                loading="lazy"
              />
              <div className="flex flex-col">
                <h1 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                  {APP_NAME}
                </h1>
                <span className="hidden md:inline text-xs text-gray-400">
                  Ferramentas para apoiar seus testes de QA
                </span>
              </div>
            </Link>
          </div>

          {/* MENU + TOGGLE */}
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
