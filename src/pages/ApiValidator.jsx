import Alert from '../components/Common/Alert';
import Loader from '../components/Common/Loader';
import Card from '../components/Common/Card';
import ApiRequestForm from '../components/ApiValidator/ApiRequestForm';
import ApiResponseDisplay from '../components/ApiValidator/ApiResponseDisplay';
import { useApiValidator } from '../hooks/useApiValidator';

const ApiValidator = () => {
  const {
    formState,
    updateForm,
    requestState,
    actions
  } = useApiValidator();

  const { response, loading, error } = requestState;
  const { executeRequest, loadExample, clearError } = actions;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-100 mb-2">
          🔌 Validador de API
        </h1>
        <p className="text-gray-400">
          Teste requisições HTTP e valide respostas de APIs. Suporta todos os métodos HTTP principais.
        </p>
      </div>

      {error && (
        <Alert type="error" onClose={clearError}>
          <pre className="whitespace-pre-wrap text-sm">{error}</pre>
        </Alert>
      )}

      <ApiRequestForm
        formState={formState}
        updateForm={updateForm}
        onSubmit={executeRequest}
        loading={loading}
        onLoadExample={loadExample}
      />

      {loading && <Loader message="Enviando requisição..." />}

      <ApiResponseDisplay response={response} />

      <Card className="bg-blue-950/30 border-blue-600/50">
        <h3 className="font-semibold text-blue-400 mb-2">ℹ️ Informações</h3>
        <ul className="text-sm text-blue-200/80 space-y-1">
          <li>• Limite de 10 requisições por minuto para prevenir abuso</li>
          <li>• APIs com CORS habilitado funcionam melhor</li>
          <li>• Nenhum dado é armazenado ou enviado para servidores externos</li>
          <li>• Todas as requisições são feitas diretamente do seu navegador</li>
        </ul>
      </Card>

      <Card className="bg-green-950/30 border-green-600/50">
        <h3 className="font-semibold text-green-400 mb-2">🌐 APIs Públicas para Teste</h3>
        <div className="text-sm text-green-200/80 space-y-2">
          <p><strong>JSONPlaceholder</strong> (Fake REST API):</p>
          <ul className="ml-4 space-y-1 font-mono text-xs">
            <li>GET: https://jsonplaceholder.typicode.com/posts</li>
            <li>GET: https://jsonplaceholder.typicode.com/users/1</li>
            <li>POST: https://jsonplaceholder.typicode.com/posts</li>
          </ul>
          <p className="mt-2"><strong>ViaCEP</strong> (Consulta CEP Brasil):</p>
          <ul className="ml-4 space-y-1 font-mono text-xs">
            <li>GET: https://viacep.com.br/ws/01310100/json/</li>
          </ul>
          <p className="mt-2"><strong>CatFacts</strong> (Fatos sobre gatos):</p>
          <ul className="ml-4 space-y-1 font-mono text-xs">
            <li>GET: https://catfact.ninja/fact</li>
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default ApiValidator;

