import { APP_NAME, APP_VERSION } from '../../constants';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-900 border-t border-dark-800 text-gray-400 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm mb-4 md:mb-0">
            © {currentYear} {APP_NAME} v{APP_VERSION}. Desenvolvido com ❤️ para a comunidade de QA.
          </div>
          <div className="flex space-x-4 text-sm">
            <a 
              href="https://github.com/yourusername/QA-Tools/blob/main/LICENSE" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary-400 transition-colors"
            >
              Licença MIT
            </a>
            <a 
              href="https://github.com/yourusername/QA-Tools/blob/main/CONTRIBUTING.md" 
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
