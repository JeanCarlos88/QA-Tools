import { useState } from 'react';
import Card from '../components/Common/Card';
import Button from '../components/Common/Button';
import Input from '../components/Common/Input';
import Select from '../components/Common/Select';
import Textarea from '../components/Common/Textarea';
import Alert from '../components/Common/Alert';
import Loader from '../components/Common/Loader';
import { HTTP_METHODS } from '../constants';
import { isValidURL } from '../utils/security';
import { RateLimiter } from '../utils/security';

const rateLimiter = new RateLimiter(10, 60000); // 10 requests per minute

const ApiValidator = () => {
  const [url, setUrl] = useState('');
  const [method, setMethod] = useState('GET');
  const [headers, setHeaders] = useState('');
  const [body, setBody] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResponse(null);

    // Validate URL
    if (!url) {
      setError('Por favor, insira uma URL válida');
      return;
    }

    if (!isValidURL(url)) {
      setError('URL inválida. Use http:// ou https://');
      return;
    }

    // Rate limiting
    if (!rateLimiter.canMakeRequest()) {
      const remainingTime = Math.ceil(rateLimiter.getRemainingTime() / 1000);
      setError(`Limite de requisições atingido. Tente novamente em ${remainingTime} segundos.`);
      return;
    }

    // Parse headers
    let parsedHeaders = {};
    if (headers.trim()) {
      try {
        parsedHeaders = JSON.parse(headers);
      } catch (err) {
        setError('Headers inválidos. Use formato JSON válido.');
        return;
      }
    }

    // Parse body
    let parsedBody = null;
    if (body.trim() && ['POST', 'PUT', 'PATCH'].includes(method)) {
      try {
        parsedBody = JSON.parse(body);
      } catch (err) {
        setError('Body inválido. Use formato JSON válido.');
        return;
      }
    }

    setLoading(true);

    const startTime = performance.now();

    try {
      const options = {
        method,
        headers: {
          ...parsedHeaders
        }
      };

      // Só adiciona Content-Type se tiver body
      if (parsedBody && ['POST', 'PUT', 'PATCH'].includes(method)) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(parsedBody);
      }

      const res = await fetch(url, options);
      const endTime = performance.now();
      const duration = Math.round(endTime - startTime);

      let responseData;
      const contentType = res.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        try {
          responseData = await res.json();
        } catch {
          responseData = await res.text();
        }
      } else if (contentType && contentType.includes('application/xml')) {
        responseData = await res.text();
      } else if (contentType && contentType.includes('text/html')) {
        responseData = await res.text();
      } else {
        responseData = await res.text();
      }

      setResponse({
        status: res.status,
        statusText: res.statusText,
        headers: Object.fromEntries(res.headers.entries()),
        data: responseData,
        duration,
        ok: res.ok,
        contentType: contentType || 'unknown'
      });
    } catch (err) {
      let errorMessage = 'Erro na requisição: ';
      
      if (err.message === 'Failed to fetch') {
        errorMessage += 'Não foi possível conectar à API. Possíveis causas:\n\n';
        errorMessage += '🔒 PROBLEMA DE CORS (mais comum):\n';
        errorMessage += `A API "${url}" não permite requisições do navegador.\n`;
        errorMessage += 'Solução: A API precisa ter CORS habilitado ou use um CORS proxy.\n\n';
        errorMessage += '📋 OUTRAS CAUSAS:\n';
        errorMessage += '• URL incorreta ou servidor offline\n';
        errorMessage += '• Protocolo HTTP em página HTTPS (Mixed Content)\n';
        errorMessage += '• Firewall ou antivírus bloqueando a conexão\n\n';
        errorMessage += '💡 DICA: Teste com APIs públicas que suportam CORS como:\n';
        errorMessage += '   - https://jsonplaceholder.typicode.com\n';
        errorMessage += '   - https://viacep.com.br\n';
        errorMessage += '   - https://catfact.ninja';
      } else if (err.message.includes('NetworkError')) {
        errorMessage += 'Erro de rede. Verifique sua conexão com a internet.';
      } else {
        errorMessage += err.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(JSON.stringify(text, null, 2));
  };

  const loadExample = () => {
    setUrl('https://jsonplaceholder.typicode.com/posts/1');
    setMethod('GET');
    setHeaders('');
    setBody('');
    setError(null);
    setResponse(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-700 dark:text-gray-100 mb-2">
          🔌 Validador de API
        </h1>
        <p className="text-gray-400">
          Teste requisições HTTP e valide respostas de APIs. Suporta todos os métodos HTTP principais.
        </p>
      </div>

      {error && (
        <Alert type="error" onClose={() => setError(null)}>
          <pre className="whitespace-pre-wrap text-sm">{error}</pre>
        </Alert>
      )}

      <Card>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-100">Configurar Requisição</h3>
          <Button variant="secondary" onClick={loadExample} type="button" className="text-sm">
            📝 Carregar Exemplo
          </Button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-3">
              <Input
                label="URL da API"
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://jsonplaceholder.typicode.com/posts"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                💡 Dica: Use APIs públicas como jsonplaceholder.typicode.com para testar
              </p>
            </div>
            <div>
              <Select
                label="Método HTTP"
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                options={HTTP_METHODS}
              />
            </div>
          </div>

          <Textarea
            label="Headers (JSON)"
            value={headers}
            onChange={(e) => setHeaders(e.target.value)}
            placeholder='{"Authorization": "Bearer token", "Custom-Header": "value"}'
            rows={4}
            helperText="Opcional: Headers personalizados em formato JSON"
          />

          {['POST', 'PUT', 'PATCH'].includes(method) && (
            <Textarea
              label="Body (JSON)"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder='{"key": "value", "data": "example"}'
              rows={6}
              helperText="Body da requisição em formato JSON"
            />
          )}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Enviando...' : 'Enviar Requisição'}
          </Button>
        </form>
      </Card>

      {loading && <Loader message="Enviando requisição..." />}

      {response && (
        <div className="space-y-4">
          <Card>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-100">Status da Resposta</h3>
                <div className="flex items-center space-x-2 mt-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    response.ok ? 'bg-green-950/30 text-green-400 border border-green-600' : 'bg-red-950/30 text-red-400 border border-red-600'
                  }`}>
                    {response.status} {response.statusText}
                  </span>
                  <span className="text-sm text-gray-400">
                    ⏱️ {response.duration}ms
                  </span>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-100">Headers da Resposta</h3>
              <Button
                variant="secondary"
                onClick={() => handleCopy(response.headers)}
                className="text-sm"
              >
                📋 Copiar
              </Button>
            </div>
            <div className="bg-dark-800 p-4 rounded border border-dark-700 max-h-60 overflow-y-auto">
              <pre className="text-sm font-mono text-gray-300 whitespace-pre-wrap break-all">
                {JSON.stringify(response.headers, null, 2)}
              </pre>
            </div>
          </Card>

          <Card>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-100">Body da Resposta</h3>
              <Button
                variant="secondary"
                onClick={() => handleCopy(response.data)}
                className="text-sm"
              >
                📋 Copiar
              </Button>
            </div>
            <div className="bg-dark-800 p-4 rounded border border-dark-700 max-h-96 overflow-y-auto">
              <pre className="text-sm font-mono text-gray-300 whitespace-pre-wrap break-all">
                {typeof response.data === 'object' 
                  ? JSON.stringify(response.data, null, 2)
                  : response.data
                }
              </pre>
            </div>
          </Card>
        </div>
      )}

      <Card className="bg-blue-950/30 border-blue-600/50">
        <h3 className="font-semibold text-blue-400 mb-2">ℹ️ Informações</h3>
        <ul className="text-sm text-blue-200/80 text-blue-400  space-y-1">
          <li>• Limite de 10 requisições por minuto para prevenir abuso</li>
          <li>• APIs com CORS habilitado funcionam melhor</li>
          <li>• Nenhum dado é armazenado ou enviado para servidores externos</li>
          <li>• Todas as requisições são feitas diretamente do seu navegador</li>
        </ul>
      </Card>

      <Card className="bg-green-950/30 border-green-600/50 ">
        <h3 className="font-semibold text-green-400  mb-2">🌐 APIs Públicas para Teste</h3>
        <div className="text-sm dark:text-green-200/80  text-green-400 space-y-2">
          <p><strong>JSONPlaceholder</strong> (Fake REST API):</p>
          <ul className="ml-4 space-y-1 font-mono text-xs ">
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
