import { Link, useLocation } from 'react-router-dom';
import { MENU_ITEMS } from '../../constants';
import ThemeToggle from './ThemeToggle';

const Sidebar = ({ isOpen, onClose, theme, toggleTheme }) => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
  fixed md:sticky top-0 left-0 z-50 h-screen w-64 
  transform transition-transform duration-300 ease-in-out
  ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
  

  bg-white border-r border-gray-300 text-gray-900 shadow-lg 
  

  dark:bg-dark-900 dark:border-dark-800 dark:text-gray-100 
`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-dark-800 md:hidden">
            <span className="text-lg font-semibold text-gray-700 dark:text-gray-100">Menu</span>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-200 text-2xl"
              aria-label="Fechar menu"
            >
              ✕
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {MENU_ITEMS.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.path}
                    onClick={() => onClose()}
                    className={`
                    flex items-center space-x-3 px-4 py-3 rounded-lg transition-all
                    ${isActive('alguma-path')
                      ? 'bg-primary-600/20 text-primary-400 font-semibold border border-primary-600/30 shadow-lg'
                      //  LIGHT MODE PADRÃO PARA LINKS
                      : 'text-gray-700 hover:bg-gray-200 hover:text-primary-600' 
                    }
                    /* DARK MODE (Override): Inverte a cor do texto para claro */
                    dark:text-gray-300 dark:hover:bg-dark-800 dark:hover:text-primary-400
                  `}
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-gray-500">{item.description}</div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
              
          <div className="p-4 border-t border-dark-800">
            <div className="text-xs text-gray-500 text-center">
              💡 Todas as ferramentas funcionam localmente no seu navegador
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
