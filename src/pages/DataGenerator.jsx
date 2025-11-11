import { useState } from 'react';
import Card from '../components/Common/Card';
import Button from '../components/Common/Button';
import Input from '../components/Common/Input';
import Alert from '../components/Common/Alert';
import { 
  generateName, 
  generateEmail, 
  generateCPF, 
  generateCNPJ, 
  generatePhone,
  generateDate,
  generatePassword,
  generateUUID,
  generateIPv4,
  generateColor
} from '../services/dataGenerator';

const DataGenerator = () => {
  const [results, setResults] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [passwordLength, setPasswordLength] = useState(12);
  const [copyAlert, setCopyAlert] = useState(null);

  const generators = [
    { id: 'name', label: 'Nome Completo', icon: '👤', generator: generateName },
    { id: 'email', label: 'E-mail', icon: '📧', generator: generateEmail },
    { id: 'cpf', label: 'CPF', icon: '🆔', generator: generateCPF },
    { id: 'cnpj', label: 'CNPJ', icon: '🏢', generator: generateCNPJ },
    { id: 'phone', label: 'Telefone', icon: '📱', generator: generatePhone },
    { id: 'date', label: 'Data de Nascimento', icon: '📅', generator: generateDate },
    { id: 'password', label: 'Senha', icon: '🔒', generator: () => generatePassword(passwordLength) },
    { id: 'uuid', label: 'UUID', icon: '🔑', generator: generateUUID },
    { id: 'ipv4', label: 'IPv4', icon: '🌐', generator: generateIPv4 },
    { id: 'color', label: 'Cor (Hex)', icon: '🎨', generator: generateColor },
  ];

  const handleGenerate = (generatorId, generator) => {
    const count = parseInt(quantity) || 1;
    const generated = Array.from({ length: count }, () => generator());
    setResults(prev => ({
      ...prev,
      [generatorId]: generated
    }));
  };

  const handleCopy = (text) => {
    const textToCopy = Array.isArray(text) ? text.join('\n') : text;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopyAlert('Copiado para a área de transferência!');
      setTimeout(() => setCopyAlert(null), 3000);
    });
  };

  const handleClear = () => {
    setResults({});
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-100 mb-2">
          🎲 Gerador de Dados de Teste
        </h1>
        <p className="text-gray-400">
          Gere dados fictícios válidos para testes. Todos os dados são gerados localmente no seu navegador.
        </p>
      </div>

      {copyAlert && (
        <Alert type="success" onClose={() => setCopyAlert(null)}>
          {copyAlert}
        </Alert>
      )}

      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Input
            type="number"
            label="Quantidade a gerar"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
            max="100"
          />
          <Input
            type="number"
            label="Tamanho da senha"
            value={passwordLength}
            onChange={(e) => setPasswordLength(e.target.value)}
            min="6"
            max="50"
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {generators.map((gen) => (
            <Button
              key={gen.id}
              onClick={() => handleGenerate(gen.id, gen.generator)}
              className="flex items-center justify-center space-x-2"
            >
              <span>{gen.icon}</span>
              <span>{gen.label}</span>
            </Button>
          ))}
        </div>

        {Object.keys(results).length > 0 && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-100">Resultados</h3>
              <Button variant="secondary" onClick={handleClear}>
                Limpar Tudo
              </Button>
            </div>
          </div>
        )}
      </Card>

      {Object.entries(results).map(([id, values]) => {
        const generator = generators.find(g => g.id === id);
        return (
          <Card key={id}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-100 flex items-center space-x-2">
                <span>{generator.icon}</span>
                <span>{generator.label}</span>
              </h3>
              <Button
                variant="secondary"
                onClick={() => handleCopy(values)}
                className="text-sm"
              >
                📋 Copiar
              </Button>
            </div>
            <div className="bg-dark-800 p-4 rounded border border-dark-700 max-h-60 overflow-y-auto">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="py-1 font-mono text-sm text-gray-300 hover:bg-dark-700 hover:text-primary-400 cursor-pointer transition-colors"
                  onClick={() => handleCopy(value)}
                  title="Clique para copiar"
                >
                  {value}
                </div>
              ))}
            </div>
          </Card>
        );
      })}

      <Card className="bg-yellow-950/30 border-yellow-600/50">
        <h3 className="font-semibold text-yellow-400 mb-2">⚠️ Aviso Importante</h3>
        <p className="text-sm text-yellow-200/80">
          Os dados gerados são fictícios e devem ser usados apenas para testes. 
          CPFs e CNPJs são matematicamente válidos mas não correspondem a pessoas ou empresas reais.
        </p>
      </Card>
    </div>
  );
};

export default DataGenerator;
