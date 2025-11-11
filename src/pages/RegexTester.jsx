import { useState } from 'react';
import Card from '../components/Common/Card';
import Input from '../components/Common/Input';
import Textarea from '../components/Common/Textarea';
import Button from '../components/Common/Button';
import Alert from '../components/Common/Alert';

const RegexTester = () => {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('g');
  const [testString, setTestString] = useState('');
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState(null);

  const commonPatterns = [
    { name: 'Email', pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}' },
    { name: 'URL', pattern: 'https?://[^\\s]+' },
    { name: 'CPF', pattern: '\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}' },
    { name: 'CNPJ', pattern: '\\d{2}\\.\\d{3}\\.\\d{3}/\\d{4}-\\d{2}' },
    { name: 'Telefone BR', pattern: '\\(\\d{2}\\)\\s?\\d{4,5}-\\d{4}' },
    { name: 'CEP', pattern: '\\d{5}-\\d{3}' },
    { name: 'Data (DD/MM/YYYY)', pattern: '\\d{2}/\\d{2}/\\d{4}' },
    { name: 'Hora (HH:MM)', pattern: '\\d{2}:\\d{2}' },
    { name: 'IPv4', pattern: '\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b' },
    { name: 'Hex Color', pattern: '#[0-9a-fA-F]{6}' },
    { name: 'Números', pattern: '\\d+' },
    { name: 'Palavras', pattern: '\\w+' },
  ];

  const flagOptions = [
    { key: 'g', label: 'Global', desc: 'Encontrar todas as ocorrências' },
    { key: 'i', label: 'Ignore Case', desc: 'Ignorar maiúsculas/minúsculas' },
    { key: 'm', label: 'Multiline', desc: 'Tratar ^ e $ por linha' },
    { key: 's', label: 'Dot All', desc: '. corresponde a quebras de linha' },
    { key: 'u', label: 'Unicode', desc: 'Habilitar suporte Unicode' },
  ];

  const handleTest = () => {
    setError(null);
    setMatches([]);

    if (!pattern) {
      setError('Por favor, insira uma expressão regular');
      return;
    }

    if (!testString) {
      setError('Por favor, insira um texto para testar');
      return;
    }

    try {
      const regex = new RegExp(pattern, flags);
      const foundMatches = [];
      let match;

      if (flags.includes('g')) {
        while ((match = regex.exec(testString)) !== null) {
          foundMatches.push({
            text: match[0],
            index: match.index,
            groups: match.slice(1),
          });
        }
      } else {
        match = regex.exec(testString);
        if (match) {
          foundMatches.push({
            text: match[0],
            index: match.index,
            groups: match.slice(1),
          });
        }
      }

      setMatches(foundMatches);

      if (foundMatches.length === 0) {
        setError('Nenhuma correspondência encontrada');
      }
    } catch (err) {
      setError(`Erro na expressão regular: ${err.message}`);
    }
  };

  const handlePatternSelect = (selectedPattern) => {
    setPattern(selectedPattern);
  };

  const toggleFlag = (flag) => {
    if (flags.includes(flag)) {
      setFlags(flags.replace(flag, ''));
    } else {
      setFlags(flags + flag);
    }
  };

  const highlightMatches = () => {
    if (matches.length === 0) return testString;

    let result = testString;
    let offset = 0;

    matches.forEach((match) => {
      const start = match.index + offset;
      const end = start + match.text.length;
      const highlighted = `<mark class="bg-yellow-300">${match.text}</mark>`;
      result = result.substring(0, start) + highlighted + result.substring(end);
      offset += highlighted.length - match.text.length;
    });

    return result;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-100 mb-2">
          🔍 Testador de Expressões Regulares
        </h1>
        <p className="text-gray-400">
          Teste e valide expressões regulares (regex) em tempo real com exemplos práticos.
        </p>
      </div>

      {error && (
        <Alert type="warning" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Card>
        <Input
          label="Expressão Regular (Pattern)"
          value={pattern}
          onChange={(e) => setPattern(e.target.value)}
          placeholder="Digite sua regex aqui..."
          helperText="Não inclua as barras delimitadoras (/)"
        />

        <div className="mb-4">
          <label className="label">Flags</label>
          <div className="flex flex-wrap gap-3">
            {flagOptions.map((flag) => (
              <label key={flag.key} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={flags.includes(flag.key)}
                  onChange={() => toggleFlag(flag.key)}
                  className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                />
                <span className="text-sm">
                  <strong>{flag.label}</strong> ({flag.key}) - {flag.desc}
                </span>
              </label>
            ))}
          </div>
        </div>

        <Textarea
          label="Texto de Teste"
          value={testString}
          onChange={(e) => setTestString(e.target.value)}
          placeholder="Digite o texto para testar a regex..."
          rows={6}
        />

        <Button onClick={handleTest} className="w-full">
          🔍 Testar
        </Button>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold mb-3">📝 Padrões Comuns</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {commonPatterns.map((item) => (
            <Button
              key={item.name}
              variant="secondary"
              onClick={() => handlePatternSelect(item.pattern)}
              className="text-sm"
            >
              {item.name}
            </Button>
          ))}
        </div>
      </Card>

      {matches.length > 0 && (
        <>
          <Card>
            <h3 className="text-lg font-semibold text-gray-100 mb-3">
              ✅ Correspondências Encontradas ({matches.length})
            </h3>
            <div className="space-y-3">
              {matches.map((match, index) => (
                <div key={index} className="bg-dark-800 p-3 rounded border border-dark-700">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-semibold text-sm text-gray-300">
                      Match #{index + 1}
                    </span>
                    <span className="text-xs text-gray-500">
                      Posição: {match.index}
                    </span>
                  </div>
                  <div className="font-mono text-sm bg-dark-900 text-primary-400 p-2 rounded border border-dark-600">
                    {match.text}
                  </div>
                  {match.groups.length > 0 && (
                    <div className="mt-2">
                      <span className="text-xs text-gray-400">Grupos capturados:</span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {match.groups.map((group, gIndex) => (
                          <span
                            key={gIndex}
                            className="text-xs bg-blue-950/30 text-blue-400 border border-blue-600/50 px-2 py-1 rounded"
                          >
                            {group}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-gray-100 mb-3">🎨 Texto Destacado</h3>
            <div
              className="bg-dark-800 p-4 rounded border border-dark-700 whitespace-pre-wrap break-words text-gray-300"
              dangerouslySetInnerHTML={{ __html: highlightMatches() }}
            />
          </Card>
        </>
      )}

      <Card className="bg-blue-950/30 border-blue-600/50">
        <h3 className="font-semibold text-blue-400 mb-2">📚 Referência Rápida</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-200/80">
          <div>
            <strong>Caracteres Especiais:</strong>
            <ul className="mt-1 space-y-1 font-mono">
              <li>. - Qualquer caractere</li>
              <li>\\d - Dígito (0-9)</li>
              <li>\\w - Palavra (a-z, A-Z, 0-9, _)</li>
              <li>\\s - Espaço em branco</li>
              <li>^ - Início da string</li>
              <li>$ - Fim da string</li>
            </ul>
          </div>
          <div>
            <strong>Quantificadores:</strong>
            <ul className="mt-1 space-y-1 font-mono">
              <li>* - 0 ou mais</li>
              <li>+ - 1 ou mais</li>
              <li>? - 0 ou 1</li>
              <li>{'{n}'} - Exatamente n</li>
              <li>{'{n,m}'} - Entre n e m</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default RegexTester;
