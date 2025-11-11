# QA Tools 🛠️

[![Deploy to GitHub Pages](https://github.com/JeanCarlos88/QA-Tools/actions/workflows/deploy.yml/badge.svg)](https://github.com/JeanCarlos88/QA-Tools/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> Coleção de ferramentas práticas para profissionais de QA (Quality Assurance) com interface Dark Mode

## 🌟 Demonstração

Acesse: [https://jeancarlos88.github.io/QA-Tools](https://jeancarlos88.github.io/QA-Tools)

## 📋 Sobre o Projeto

QA Tools é uma aplicação web estática que oferece ferramentas práticas para profissionais de QA realizarem testes de software de forma mais eficiente. Todas as ferramentas funcionam localmente no navegador, garantindo privacidade e segurança dos dados.

## ✨ Funcionalidades

### 🎲 Gerador de Dados de Teste
- Geração de nomes, e-mails, CPFs, CNPJs
- Números de telefone (formato brasileiro)
- Datas de nascimento
- Senhas seguras com opções customizáveis
- UUIDs, endereços IPv4 e cores hexadecimais

### 🔌 Validador de API
- Suporte para todos os métodos HTTP (GET, POST, PUT, PATCH, DELETE)
- Headers personalizados
- Validação de respostas JSON, XML, HTML e texto
- Medição de tempo de resposta
- Rate limiting para prevenir abuso
- Botão de exemplo com APIs públicas funcionais
- Detecção automática de problemas de CORS
- Suporte para múltiplos tipos de conteúdo

### 📄 Conversor de Arquivos
- Conversão entre CSV, JSON e XML
- Validação de formatos
- Upload de arquivos (até 5MB)
- Download dos resultados

### 🔍 Testador de Regex
- Teste de expressões regulares em tempo real
- Destaque de correspondências
- Padrões comuns pré-definidos
- Suporte para flags (global, ignore case, multiline, etc.)
- Referência rápida de sintaxe

### ✅ Checklist de Testes
- Criação de múltiplos checklists
- Acompanhamento de progresso
- Persistência local (localStorage)
- Exportação para JSON
- Interface intuitiva e responsiva

## 🚀 Tecnologias Utilizadas

- **React 18** - Biblioteca para interface de usuário
- **Vite** - Build tool rápida e moderna
- **Tailwind CSS** - Framework CSS utility-first com Dark Mode
- **React Router** - Roteamento client-side
- **GitHub Pages** - Hospedagem estática gratuita
- **GitHub Actions** - CI/CD automatizado

## 🎨 Design

- ✅ **Dark Mode** - Interface moderna com tema escuro
- ✅ **Responsivo** - Funciona perfeitamente em mobile, tablet e desktop
- ✅ **Acessível** - Contraste adequado e navegação intuitiva
- ✅ **Animações suaves** - Transições e hover effects

## 🌐 Compatibilidade com GitHub Pages

✅ **100% Compatível** - Este projeto está totalmente configurado para funcionar no GitHub Pages:

- ✅ **Rotas SPA** - Sistema de redirecionamento `404.html` para rotas funcionarem
- ✅ **Base Path** - Configuração correta do caminho base (`/QA-Tools/`)
- ✅ **Assets** - Todos os recursos (CSS, JS) carregam corretamente
- ✅ **Build Otimizado** - ~70KB gzipped, carregamento rápido
- ✅ **Deploy Automático** - GitHub Actions configurado
- ✅ **Sem Backend** - 100% client-side, sem necessidade de servidor

📚 **Documentação completa:** [GITHUB_PAGES.md](Documentation/GITHUB_PAGES.md) | [PAGES_CHECKLIST.md](Documentation/PAGES_CHECKLIST.md)

## 🛡️ Segurança

- ✅ Todas as operações são realizadas no cliente (client-side)
- ✅ Nenhum dado é enviado para servidores externos
- ✅ Sanitização de inputs para prevenir XSS
- ✅ Validação de URLs e tipos de arquivo
- ✅ Rate limiting em requisições de API
- ✅ Dados do localStorage são sanitizados

## 📦 Instalação e Desenvolvimento

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn

### Passos

1. Clone o repositório:
```bash
git clone https://github.com/JeanCarlos88/QA-Tools.git
cd QA-Tools
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

4. Acesse `http://localhost:5173` no navegador

### Build para Produção

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`.

## 🏗️ Arquitetura do Projeto

```
QA-Tools/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── src/
│   ├── components/
│   │   ├── Common/             # Componentes reutilizáveis
│   │   │   ├── Alert.jsx
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Loader.jsx
│   │   │   ├── Select.jsx
│   │   │   └── Textarea.jsx
│   │   └── Layout/             # Componentes de layout
│   │       ├── Footer.jsx
│   │       ├── Header.jsx
│   │       ├── Layout.jsx
│   │       └── Sidebar.jsx
│   ├── constants/
│   │   └── index.js            # Constantes da aplicação
│   ├── pages/                  # Páginas/Rotas
│   │   ├── ApiValidator.jsx
│   │   ├── DataGenerator.jsx
│   │   ├── FileConverter.jsx
│   │   ├── Home.jsx
│   │   ├── NotFound.jsx
│   │   ├── RegexTester.jsx
│   │   └── TestChecklist.jsx
│   ├── services/               # Lógica de negócio
│   │   ├── dataGenerator.js
│   │   └── fileConverter.js
│   ├── utils/                  # Funções utilitárias
│   │   ├── formatters.js
│   │   ├── security.js
│   │   ├── storage.js
│   │   └── validation.js
│   ├── App.jsx                 # Componente principal
│   ├── index.css              # Estilos globais
│   └── main.jsx               # Entry point
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 📚 Documentação Completa

Para mais informações detalhadas, consulte a pasta [Documentation](Documentation/):

- 📖 [Guia de Instalação](Documentation/INSTALLATION.md) - Setup completo passo a passo
- 🏗️ [Arquitetura do Projeto](Documentation/ARCHITECTURE.md) - Estrutura e padrões
- 🤝 [Como Contribuir](Documentation/CONTRIBUTING.md) - Guia de contribuição
- 🧪 [Guia de Testes](Documentation/TESTING.md) - Checklist completo de testes
- 🔒 [Política de Segurança](Documentation/SECURITY.md) - Reporte de vulnerabilidades
- 🚀 [Quick Start](Documentation/QUICKSTART.md) - Início rápido
- 🗺️ [Roadmap](Documentation/ROADMAP.md) - Planejamento futuro
- 📝 [Changelog](Documentation/CHANGELOG.md) - Histórico de versões
- ✅ [Próximos Passos](Documentation/NEXT_STEPS.md) - Guia pós-implementação

## 🤝 Como Contribuir

Contribuições são muito bem-vindas! Existem várias formas de contribuir:

1. **Reportar bugs** - Abra uma [issue](https://github.com/JeanCarlos88/QA-Tools/issues)
2. **Sugerir funcionalidades** - Compartilhe suas ideias
3. **Melhorar documentação** - Ajude outros usuários
4. **Desenvolver novas ferramentas** - Expanda o projeto

Para instruções detalhadas, consulte [CONTRIBUTING.md](Documentation/CONTRIBUTING.md).

### Passos Rápidos

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👤 Autor

**Jean Carlos**

- GitHub: [@JeanCarlos88](https://github.com/JeanCarlos88)
- LinkedIn: [Jean Carlos](https://linkedin.com/in/jean-carlos-qa)

## 🙏 Agradecimentos

- Comunidade de QA brasileira
- Contribuidores open source
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

## 📞 Suporte

Se você encontrar algum problema ou tiver dúvidas:

- Abra uma [issue](https://github.com/JeanCarlos88/QA-Tools/issues)
- Entre em contato via GitHub

---

Feito com ❤️ para a comunidade de QA
