// Application constants
export const APP_NAME = 'QA Tools';
export const APP_VERSION = '1.0.0';
export const APP_DESCRIPTION = 'Ferramentas práticas para profissionais de QA';

// Navigation menu items
export const MENU_ITEMS = [
  {
    id: 'home',
    name: 'Início',
    path: '/',
    icon: '🏠',
    description: 'Página inicial'
  },
  {
    id: 'data-generator',
    name: 'Gerador de Dados',
    path: '/data-generator',
    icon: '🎲',
    description: 'Gere dados de teste como nomes, emails, CPFs, etc.'
  },
  {
    id: 'api-validator',
    name: 'Validador de API',
    path: '/api-validator',
    icon: '🔌',
    description: 'Teste e valide respostas de APIs'
  },
  {
    id: 'file-converter',
    name: 'Conversor de Arquivos',
    path: '/file-converter',
    icon: '📄',
    description: 'Converta entre CSV, JSON e XML'
  },
  {
    id: 'regex-tester',
    name: 'Testador de Regex',
    path: '/regex-tester',
    icon: '🔍',
    description: 'Teste expressões regulares'
  },
  {
    id: 'test-checklist',
    name: 'Checklist de Testes',
    path: '/test-checklist',
    icon: '✅',
    description: 'Crie e gerencie checklists de testes'
  }
];

// HTTP methods for API validator
export const HTTP_METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'];

// File types for converter
export const FILE_TYPES = {
  CSV: 'csv',
  JSON: 'json',
  XML: 'xml'
};

// Local storage keys
export const STORAGE_KEYS = {
  CHECKLISTS: 'qa_tools_checklists',
  API_HISTORY: 'qa_tools_api_history',
  REGEX_HISTORY: 'qa_tools_regex_history',
  USER_PREFERENCES: 'qa_tools_preferences'
};

// Maximum file size for upload (5MB)
export const MAX_FILE_SIZE = 5 * 1024 * 1024;

// Regex patterns
export const REGEX_PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  cpf: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
  cnpj: /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,
  phone: /^\(\d{2}\) \d{4,5}-\d{4}$/,
  url: /^https?:\/\/.+/,
  ipv4: /^(\d{1,3}\.){3}\d{1,3}$/
};
