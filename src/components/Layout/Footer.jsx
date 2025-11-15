import { APP_NAME, APP_VERSION } from '../../constants';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="
    mt-auto 
    bg-gray-100 text-gray-800 border-t border-gray-300 
    dark:bg-dark-900 dark:text-gray-400 dark:border-dark-800
">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <img
              src="/QA-Tools/logo-qa-tools.svg"
              alt="Logo QA-Tools"
              className="h-7 w-7 rounded-md border border-dark-700 bg-dark-900 hidden sm:block"
              loading="lazy"
            />
            <div className="text-xs md:text-sm">
              <p>
                © {currentYear} {APP_NAME} v{APP_VERSION}. Desenvolvido com ❤️ para a comunidade de QA.
              </p>
              <p className="text-[11px] md:text-xs text-gray-500 mt-1">
                Focado em ferramentas client-side, sem envio de dados sensíveis.
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-xs md:text-sm">
            <a 
              href="https://github.com/JeanCarlos88/QA-Tools/blob/main/LICENSE" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary-400 transition-colors"
            >
              Licença MIT
            </a>
            <a 
              href="https://github.com/JeanCarlos88/QA-Tools/blob/main/Documentation/CONTRIBUTING.md" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary-400 transition-colors"
            >
              Contribuir
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
