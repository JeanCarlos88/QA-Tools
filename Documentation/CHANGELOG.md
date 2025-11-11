# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [1.0.0] - 2025-11-11

### Adicionado

#### 🎨 Interface e Design
- **Dark Mode Completo** - Interface moderna com tema escuro
  - Paleta de cores personalizada (dark-50 a dark-950)
  - Gradientes e sombras otimizadas
  - Alto contraste para melhor legibilidade
  - Scrollbar customizada com tema dark
  - Hover effects suaves em todos os componentes

#### Ferramentas Principais
- 🎲 Gerador de Dados de Teste
  - Geração de nomes completos
  - Geração de e-mails
  - Geração de CPF válido
  - Geração de CNPJ válido
  - Geração de telefones (formato brasileiro)
  - Geração de datas de nascimento
  - Geração de senhas seguras
  - Geração de UUIDs
  - Geração de endereços IPv4
  - Geração de cores hexadecimais

- 🔌 Validador de API
  - Suporte para todos métodos HTTP (GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS)
  - Headers personalizados
  - Body JSON
  - Visualização de status, headers e body da resposta
  - Medição de tempo de resposta
  - Rate limiting (10 req/min)
  - **Botão "Carregar Exemplo"** com URL de API pública funcional (JSONPlaceholder)
  - **Detecção automática de Content-Type** (JSON, XML, HTML, texto)
  - **Mensagens de erro melhoradas** com explicação detalhada de CORS
  - **Content-Type condicional** - só adiciona para POST/PUT/PATCH
  - **Card com exemplos de APIs públicas** (JSONPlaceholder, ViaCEP, CatFacts)

- 📄 Conversor de Arquivos
  - Conversão CSV → JSON
  - Conversão JSON → CSV
  - Conversão JSON → XML
  - Conversão XML → JSON
  - Conversão CSV → XML
  - Conversão XML → CSV
  - Upload de arquivos (max 5MB)
  - Download de resultados

- 🔍 Testador de Regex
  - Teste em tempo real
  - Destaque de correspondências
  - Suporte para todas as flags (g, i, m, s, u)
  - Padrões comuns pré-definidos
  - Visualização de grupos capturados
  - Referência rápida de sintaxe

- ✅ Checklist de Testes
  - Criação de múltiplos checklists
  - Adição/remoção de items
  - Marcar items como completos
  - Barra de progresso
  - Persistência em localStorage
  - Exportação para JSON

#### Componentes Reutilizáveis
- Alert (success, error, warning, info)
- Button (primary, secondary)
- Card
- Input
- Loader
- Select
- Textarea

#### Layout
- Header responsivo
- Sidebar com navegação
- Footer informativo
- Layout mobile-friendly
- Botão flutuante de menu (mobile)

#### Utilitários
- Validação de CPF/CNPJ/Email/Telefone/URL/IPv4
- Formatação de CPF/CNPJ/Telefone/Data
- Sanitização de HTML
- Validação de arquivos
- Rate limiter
- Gestão de localStorage

#### Segurança
- Sanitização de inputs para prevenir XSS
- Validação de URLs
- Validação de tipos de arquivo
- Rate limiting em requisições
- Processamento client-side only

#### Deploy
- GitHub Actions workflow
- Deploy automático para GitHub Pages
- Build otimizado com Vite

#### Documentação
- README.md completo
- CONTRIBUTING.md
- INSTALLATION.md
- ARCHITECTURE.md
- EXAMPLES.md
- SECURITY.md
- CHANGELOG.md
- LICENSE (MIT)

### Características Técnicas
- React 18.2
- Vite 5.0
- Tailwind CSS 3.3 com Dark Mode (darkMode: 'class')
- React Router DOM 6.20
- ESLint configurado
- Totalmente responsivo (mobile, tablet, desktop)
- PWA-ready
- Lighthouse score > 90
- Cores personalizadas com paleta dark completa

### Correções de Bugs
- ✅ Corrigido problema de visibilidade no DataGenerator (texto invisível em fundo escuro)
- ✅ Corrigido estrutura JSX no ApiValidator (tags duplicadas)
- ✅ Corrigido contraste de cores em todos os componentes
- ✅ Melhorado tratamento de erros CORS no ApiValidator
- ✅ Removido Content-Type desnecessário em requisições GET/DELETE

### Segurança
- Todas operações client-side
- Sem envio de dados para servidores
- localStorage com sanitização
- Validação rigorosa de inputs

---

## [Unreleased]

### Em Planejamento
- [ ] Alternância entre modo claro e escuro (toggle)
- [ ] Suporte para múltiplos idiomas (i18n)
- [ ] Exportação de dados em múltiplos formatos
- [ ] Importação de checklists
- [ ] Histórico de requisições API
- [ ] Gerador de massa de dados (bulk)
- [ ] Integração com Postman Collections
- [ ] Testes automatizados
- [ ] Documentação de APIs (Swagger/OpenAPI)
- [ ] Calculadora de hash (MD5, SHA256)
- [ ] Comparador de JSON/XML
- [ ] Validador de schemas (JSON Schema)
- [ ] CORS Proxy integrado

---

## Tipos de Mudanças

- **Adicionado** para novas funcionalidades
- **Modificado** para mudanças em funcionalidades existentes
- **Obsoleto** para funcionalidades que serão removidas
- **Removido** para funcionalidades removidas
- **Corrigido** para correções de bugs
- **Segurança** para vulnerabilidades corrigidas

---

**Nota:** As datas seguem o formato ISO 8601 (YYYY-MM-DD)
