import { Link } from 'react-router-dom';
import { APP_NAME } from '../../constants';

const Header = () => {
  return (
    <header className="bg-dark-900 border-b border-dark-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
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
    </header>
  );
};

export default Header;
