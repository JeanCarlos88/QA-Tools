# Arquitetura do Projeto QA Tools

## 📁 Estrutura de Diretórios

```
QA-Tools/
├── .github/                    # Configurações do GitHub
│   └── workflows/
│       └── deploy.yml         # GitHub Actions - Deploy automático
│
├── src/                        # Código-fonte da aplicação
│   ├── components/            # Componentes React
│   │   ├── Common/           # Componentes reutilizáveis
│   │   │   ├── Alert.jsx     # Componente de alertas
│   │   │   ├── Button.jsx    # Botões padronizados
│   │   │   ├── Card.jsx      # Cards/containers
│   │   │   ├── Input.jsx     # Input de texto
│   │   │   ├── Loader.jsx    # Indicador de carregamento
│   │   │   ├── Select.jsx    # Select/dropdown
│   │   │   └── Textarea.jsx  # Área de texto
│   │   │
│   │   └── Layout/           # Componentes de layout
│   │       ├── Footer.jsx    # Rodapé da aplicação
│   │       ├── Header.jsx    # Cabeçalho/navbar
│   │       ├── Layout.jsx    # Layout principal
│   │       └── Sidebar.jsx   # Menu lateral
│   │
│   ├── constants/            # Constantes da aplicação
│   │   └── index.js         # Configurações, menus, padrões
│   │
│   ├── pages/               # Páginas/rotas da aplicação
│   │   ├── ApiValidator.jsx      # Ferramenta de validação de APIs
│   │   ├── DataGenerator.jsx     # Gerador de dados de teste
│   │   ├── FileConverter.jsx     # Conversor de arquivos
│   │   ├── Home.jsx             # Página inicial
│   │   ├── NotFound.jsx         # Página 404
│   │   ├── RegexTester.jsx      # Testador de regex
│   │   └── TestChecklist.jsx    # Gerenciador de checklists
│   │
│   ├── services/            # Lógica de negócio
│   │   ├── dataGenerator.js    # Geradores de dados
│   │   └── fileConverter.js    # Conversores de arquivo
│   │
│   ├── utils/               # Funções utilitárias
│   │   ├── formatters.js       # Formatação de dados
│   │   ├── security.js         # Funções de segurança
│   │   ├── storage.js          # Gestão de localStorage
│   │   └── validation.js       # Validações
│   │
│   ├── App.jsx              # Componente raiz com rotas
│   ├── index.css           # Estilos globais + Tailwind
│   └── main.jsx            # Ponto de entrada da aplicação
│
├── public/                  # Arquivos públicos estáticos
│
├── .eslintrc.cjs           # Configuração do ESLint
├── .gitignore              # Arquivos ignorados pelo Git
├── CONTRIBUTING.md         # Guia de contribuição
├── index.html              # HTML principal
├── INSTALLATION.md         # Guia de instalação
├── LICENSE                 # Licença MIT
├── package.json            # Dependências e scripts
├── postcss.config.js       # Configuração PostCSS
├── README.md               # Documentação principal
├── SECURITY.md             # Política de segurança
├── tailwind.config.js      # Configuração Tailwind CSS
└── vite.config.js          # Configuração Vite
```

## 🏗️ Padrões Arquiteturais

### Separação de Responsabilidades

1. **Components**: Componentes React puros, focados em UI
2. **Services**: Lógica de negócio e manipulação de dados
3. **Utils**: Funções auxiliares reutilizáveis
4. **Constants**: Valores fixos e configurações

### Fluxo de Dados

```
User Input → Page Component → Service → Utils → Result
```

### Organização de Componentes

**Common Components**:
- Componentes reutilizáveis em toda aplicação
- Sem lógica de negócio específica
- Props bem definidas

**Layout Components**:
- Estrutura visual da aplicação
- Navegação e organização de páginas

**Page Components**:
- Um por rota
- Orquestram componentes menores
- Gerenciam estado local

## 🔒 Segurança

### Camadas de Proteção

1. **Input Sanitization** (`utils/security.js`)
   - Sanitização de HTML
   - Validação de URLs
   - Validação de arquivos

2. **Validation** (`utils/validation.js`)
   - Validação de formatos (email, CPF, etc.)
   - Validação de JSON/XML
   - Validação de dados estruturados

3. **Rate Limiting** (`utils/security.js`)
   - Classe RateLimiter para controle de requisições
   - Previne abuso de APIs

4. **Storage Security** (`utils/storage.js`)
   - Sanitização antes de salvar
   - Validação ao recuperar
   - Isolamento de dados

## 🎨 Estilização

### Tailwind CSS

- Utility-first CSS framework
- Classes predefinidas em `src/index.css`
- Customização em `tailwind.config.js`

### Classes Customizadas

```css
.card       → Cards com sombra e borda
.btn-primary → Botão primário
.btn-secondary → Botão secundário
.input-field → Campo de entrada
.label → Label de formulário
```

## 🚀 Build e Deploy

### Desenvolvimento

```bash
npm run dev
```
- Hot Module Replacement (HMR)
- Servidor em http://localhost:5173

### Produção

```bash
npm run build
```
- Minificação de código
- Tree-shaking
- Code splitting
- Output em `dist/`

### Deploy Automático

1. Push para branch `main`
2. GitHub Actions executa build
3. Deploy para GitHub Pages
4. Site disponível em minutos

## 📦 Gestão de Estado

### Local State (useState)

Usado para:
- Estado de formulários
- UI temporária (modals, alerts)
- Estado de componente isolado

### localStorage

Usado para:
- Checklists persistentes
- Histórico de uso
- Preferências do usuário

**Chaves definidas em**: `src/constants/index.js`

## 🔄 Roteamento

### React Router DOM

```javascript
/ → Home
/data-generator → Gerador de Dados
/api-validator → Validador de API
/file-converter → Conversor de Arquivos
/regex-tester → Testador de Regex
/test-checklist → Checklist de Testes
* → 404 Not Found
```

### Navegação

- Sidebar com links
- Mobile-friendly
- Active state automático

## 🧪 Qualidade de Código

### ESLint

- React rules habilitadas
- React hooks rules
- Warnings para unused vars

### Boas Práticas

- Componentes pequenos (< 300 linhas)
- Funções puras quando possível
- Props bem tipadas
- Nomes descritivos
- Comentários em código complexo

## 📱 Responsividade

### Breakpoints Tailwind

- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px

### Mobile-First

- Layout adaptativo
- Sidebar colapsável
- Touch-friendly

## 🔧 Extensibilidade

### Adicionar Nova Ferramenta

1. Criar página em `src/pages/NovaTool.jsx`
2. Adicionar rota em `src/App.jsx`
3. Adicionar item em `src/constants/index.js` (MENU_ITEMS)
4. Criar serviço se necessário em `src/services/`
5. Testar e documentar

### Adicionar Novo Componente

1. Criar em `src/components/Common/` se reutilizável
2. Exportar adequadamente
3. Documentar props
4. Seguir padrões existentes

## 🎯 Performance

### Otimizações Implementadas

- Code splitting por rota
- Lazy loading de componentes pesados
- Memoização onde necessário
- Assets otimizados no build
- Vendor chunk separado

### Métricas Alvo

- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Lighthouse Score: > 90

---

Esta arquitetura foi projetada para ser:
- ✅ Escalável
- ✅ Manutenível
- ✅ Testável
- ✅ Segura
- ✅ Performática
