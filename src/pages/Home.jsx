import { Link } from 'react-router-dom';
import { MENU_ITEMS } from '../constants';
import Card from '../components/Common/Card';

const Home = () => {
  // Exclude home from tools list
  const tools = MENU_ITEMS.filter(item => item.id !== 'home');

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <img
            src="/QA-Tools/logo-qa-tools.svg"
            alt="Logo QA-Tools"
            className="h-36 w-36 max-w-full rounded-2xl border border-dark-700 bg-dark-900 shadow-xl shadow-primary-900/40 object-contain"
            loading="lazy"
          />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent mb-4">
          Bem-vindo ao QA Tools
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Uma coleção de ferramentas práticas para profissionais de QA. 
          Todas as ferramentas funcionam localmente no seu navegador, 
          garantindo segurança e privacidade dos seus dados.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Link
            key={tool.id}
            to={tool.path}
            className="block transition-all hover:scale-105"
          >
            <Card className="h-full hover:shadow-2xl hover:shadow-primary-900/30 hover:border-primary-600/50 transition-all">
              <div className="text-center">
                <div className="text-5xl mb-4">{tool.icon}</div>
                <h3 className="text-xl font-semibold text-gray-100 mb-2">
                  {tool.name}
                </h3>
                <p className="text-gray-400">
                  {tool.description}
                </p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
