import { Link } from 'react-router-dom';
import Card from '../components/Common/Card';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="text-center max-w-md">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-3xl font-bold text-gray-100 mb-4">
          Página Não Encontrada
        </h1>
        <p className="text-gray-400 mb-6">
          A página que você está procurando não existe ou foi movida.
        </p>
        <Link to="/" className="btn-primary inline-block">
          Voltar para Home
        </Link>
      </Card>
    </div>
  );
};

export default NotFound;
