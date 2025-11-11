import { Link } from 'react-router-dom';
import { MENU_ITEMS } from '../constants';
import Card from '../components/Common/Card';

const Home = () => {
  // Exclude home from tools list
  const tools = MENU_ITEMS.filter(item => item.id !== 'home');

  return (
    <div className="space-y-8">
      <div className="text-center">
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

      <Card className="bg-primary-950/30 border-primary-800/50">
        <h2 className="text-2xl font-bold text-gray-100 mb-4">
          🚀 Características
        </h2>
        <ul className="space-y-2 text-gray-300">
          <li>✅ <strong className="text-primary-400">100% Cliente-Side:</strong> Todos os dados são processados no seu navegador</li>
          <li>✅ <strong className="text-primary-400">Sem Backend:</strong> Nenhum dado é enviado para servidores externos</li>
          <li>✅ <strong className="text-primary-400">Open Source:</strong> Código aberto e disponível no GitHub</li>
          <li>✅ <strong className="text-primary-400">Gratuito:</strong> Todas as ferramentas são gratuitas para uso</li>
          <li>✅ <strong className="text-primary-400">Responsivo:</strong> Funciona perfeitamente em desktop e mobile</li>
        </ul>
      </Card>

      <Card>
        <h2 className="text-2xl font-bold text-gray-100 mb-4">
          📖 Como Contribuir
        </h2>
        <p className="text-gray-300 mb-4">
          Este projeto é open source e aceita contribuições da comunidade! 
          Você pode contribuir de várias formas:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Reportando bugs e sugerindo novas funcionalidades</li>
          <li>Melhorando a documentação</li>
          <li>Desenvolvendo novas ferramentas</li>
          <li>Compartilhando com outros profissionais de QA</li>
        </ul>
        <div className="mt-6">
          <a
            href="https://github.com/yourusername/QA-Tools"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-block"
          >
            Visitar no GitHub
          </a>
        </div>
      </Card>
    </div>
  );
};

export default Home;
