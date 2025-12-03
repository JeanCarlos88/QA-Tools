import { useState } from 'react';
import { isValidURL, RateLimiter } from '../utils/security';

const rateLimiter = new RateLimiter(10, 60000); // 10 requests per minute

export const useApiValidator = () => {
  const [formState, setFormState] = useState({
    url: '',
    method: 'GET',
    headers: '',
    body: ''
  });

  const [requestState, setRequestState] = useState({
    response: null,
    loading: false,
    error: null
  });

  const updateForm = (field, value) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  };

  const loadExample = () => {
    setFormState({
      url: 'https://jsonplaceholder.typicode.com/posts/1',
      method: 'GET',
      headers: '',
      body: ''
    });
    setRequestState({
      response: null,
      loading: false,
      error: null
    });
  };

  const clearError = () => {
    setRequestState(prev => ({ ...prev, error: null }));
  };

  const executeRequest = async (e) => {
    if (e) e.preventDefault();
    
    setRequestState(prev => ({ ...prev, error: null, response: null }));

    const { url, method, headers, body } = formState;

    // Validate URL
    if (!url) {
      setRequestState(prev => ({ ...prev, error: 'Por favor, insira uma URL válida' }));
      return;
    }

    if (!isValidURL(url)) {
      setRequestState(prev => ({ ...prev, error: 'URL inválida. Use http:// ou https://' }));
      return;
    }

    // Rate limiting
    if (!rateLimiter.canMakeRequest()) {
      const remainingTime = Math.ceil(rateLimiter.getRemainingTime() / 1000);
      setRequestState(prev => ({ 
        ...prev, 
        error: `Limite de requisições atingido. Tente novamente em ${remainingTime} segundos.` 
      }));
      return;
    }

    // Parse headers
    let parsedHeaders = {};
    if (headers.trim()) {
      try {
        parsedHeaders = JSON.parse(headers);
      } catch (err) {
        setRequestState(prev => ({ ...prev, error: 'Headers inválidos. Use formato JSON válido.' }));
        return;
      }
    }

    // Parse body
    let parsedBody = null;
    if (body.trim() && ['POST', 'PUT', 'PATCH'].includes(method)) {
      try {
        parsedBody = JSON.parse(body);
      } catch (err) {
        setRequestState(prev => ({ ...prev, error: 'Body inválido. Use formato JSON válido.' }));
        return;
      }
    }

    setRequestState(prev => ({ ...prev, loading: true }));

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

      setRequestState({
        loading: false,
        error: null,
        response: {
          status: res.status,
          statusText: res.statusText,
          headers: Object.fromEntries(res.headers.entries()),
          data: responseData,
          duration,
          ok: res.ok,
          contentType: contentType || 'unknown'
        }
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
      
      setRequestState({
        loading: false,
        response: null,
        error: errorMessage
      });
    }
  };

  return {
    formState,
    updateForm,
    requestState,
    actions: {
      executeRequest,
      loadExample,
      clearError
    }
  };
};
