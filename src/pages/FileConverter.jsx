import { useState } from 'react';
import Card from '../components/Common/Card';
import Button from '../components/Common/Button';
import Select from '../components/Common/Select';
import Textarea from '../components/Common/Textarea';
import Alert from '../components/Common/Alert';
import { FILE_TYPES, MAX_FILE_SIZE } from '../constants';
import { 
  csvToJson, 
  jsonToCsv, 
  jsonToXml, 
  xmlToJson,
  csvToXml,
  xmlToCsv
} from '../services/fileConverter';
import { formatFileSize } from '../utils/formatters';

const FileConverter = () => {
  const [inputType, setInputType] = useState('json');
  const [outputType, setOutputType] = useState('csv');
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const fileTypeOptions = [
    { value: 'json', label: 'JSON' },
    { value: 'csv', label: 'CSV' },
    { value: 'xml', label: 'XML' }
  ];

  const handleConvert = () => {
    setError(null);
    setSuccess(null);

    if (!inputText.trim()) {
      setError('Por favor, insira o conteúdo a ser convertido');
      return;
    }

    if (inputType === outputType) {
      setError('Tipo de entrada e saída devem ser diferentes');
      return;
    }

    try {
      let result;

      // CSV to other formats
      if (inputType === 'csv' && outputType === 'json') {
        result = JSON.stringify(csvToJson(inputText), null, 2);
      } else if (inputType === 'csv' && outputType === 'xml') {
        result = csvToXml(inputText);
      }
      // JSON to other formats
      else if (inputType === 'json' && outputType === 'csv') {
        result = jsonToCsv(inputText);
      } else if (inputType === 'json' && outputType === 'xml') {
        result = jsonToXml(inputText);
      }
      // XML to other formats
      else if (inputType === 'xml' && outputType === 'json') {
        result = JSON.stringify(xmlToJson(inputText), null, 2);
      } else if (inputType === 'xml' && outputType === 'csv') {
        result = xmlToCsv(inputText);
      }

      setOutputText(result);
      setSuccess('Conversão realizada com sucesso!');
    } catch (err) {
      setError(`Erro na conversão: ${err.message}`);
      setOutputText('');
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      setError(`Arquivo muito grande. Máximo: ${formatFileSize(MAX_FILE_SIZE)}`);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setInputText(e.target.result);
      setError(null);
    };
    reader.onerror = () => {
      setError('Erro ao ler arquivo');
    };
    reader.readAsText(file);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
    setSuccess('Resultado copiado para a área de transferência!');
    setTimeout(() => setSuccess(null), 3000);
  };

  const handleDownload = () => {
    const blob = new Blob([outputText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `converted.${outputType}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setSuccess('Arquivo baixado com sucesso!');
    setTimeout(() => setSuccess(null), 3000);
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
    setError(null);
    setSuccess(null);
  };

  const getExample = () => {
    const examples = {
      json: '[\n  {"name": "João", "age": 25, "city": "São Paulo"},\n  {"name": "Maria", "age": 30, "city": "Rio de Janeiro"}\n]',
      csv: 'name,age,city\nJoão,25,São Paulo\nMaria,30,Rio de Janeiro',
      xml: '<?xml version="1.0" encoding="UTF-8"?>\n<root>\n  <item>\n    <name>João</name>\n    <age>25</age>\n    <city>São Paulo</city>\n  </item>\n</root>'
    };
    setInputText(examples[inputType]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-700 dark:text-gray-100 mb-2">
          📄 Conversor de Arquivos
        </h1>
        <p className="text-gray-400">
          Converta facilmente entre CSV, JSON e XML. Todas as conversões são feitas localmente.
        </p>
      </div>

      {error && (
        <Alert type="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert type="success" onClose={() => setSuccess(null)}>
          {success}
        </Alert>
      )}

      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Select
            label="De (Formato de Entrada)"
            value={inputType}
            onChange={(e) => setInputType(e.target.value)}
            options={fileTypeOptions}
          />
          <Select
            label="Para (Formato de Saída)"
            value={outputType}
            onChange={(e) => setOutputType(e.target.value)}
            options={fileTypeOptions}
          />
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <Button onClick={handleConvert}>
            🔄 Converter
          </Button>
          <Button variant="secondary" onClick={getExample}>
            📝 Exemplo
          </Button>
          <Button variant="secondary" onClick={handleClear}>
            🗑️ Limpar
          </Button>
          <label className="btn-secondary cursor-pointer">
            📁 Upload
            <input
              type="file"
              onChange={handleFileUpload}
              accept=".json,.csv,.xml,.txt"
              className="hidden"
            />
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Textarea
              label={`Entrada (${inputType.toUpperCase()})`}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Cole seu ${inputType.toUpperCase()} aqui...`}
              rows={15}
              className="font-mono text-sm"
            />
          </div>
          <div>
            <div className="mb-1 flex justify-between items-center">
              <label className="label">
                Saída ({outputType.toUpperCase()})
              </label>
              {outputText && (
                <div className="space-x-2">
                  <button
                    onClick={handleCopy}
                    className="text-sm text-primary-600 hover:text-primary-800"
                  >
                    📋 Copiar
                  </button>
                  <button
                    onClick={handleDownload}
                    className="text-sm text-primary-600 hover:text-primary-800"
                  >
                    💾 Download
                  </button>
                </div>
              )}
            </div>
            <textarea
              value={outputText}
              readOnly
              placeholder="Resultado aparecerá aqui..."
              rows={15}
              className="input-field font-mono text-sm bg-dark-800 text-gray-300"
            />
          </div>
        </div>
      </Card>

      <Card className="bg-blue-950/30 border-blue-600/50">
        <h3 className="font-semibold text-blue-400 mb-2">💡 Dicas</h3>
        <ul className="text-sm text-blue-200/80 text-blue-400 space-y-1">
          <li>• Use o botão "Exemplo" para ver formatos válidos</li>
          <li>• Arquivos maiores que 5MB não são suportados</li>
          <li>• CSV deve ter cabeçalhos na primeira linha</li>
          <li>• JSON deve ser um objeto ou array válido</li>
          <li>• XML deve estar bem formatado</li>
        </ul>
      </Card>
    </div>
  );
};

export default FileConverter;
