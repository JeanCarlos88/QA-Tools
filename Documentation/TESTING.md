# 🧪 Guia de Testes - QA Tools

Este guia fornece instruções para testar o QA Tools localmente e garantir qualidade.

## 📋 Checklist de Testes Pré-Deploy

### ✅ Testes de Interface

#### Navegação
- [ ] Menu lateral abre/fecha corretamente
- [ ] Navegação entre páginas funciona
- [ ] Links externos abrem em nova aba
- [ ] Página 404 aparece para rotas inválidas
- [ ] Botão flutuante de menu funciona no mobile

#### Layout Responsivo
- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)
- [ ] Orientação portrait e landscape

---

### 🎲 Gerador de Dados de Teste

#### Funcionalidades Básicas
- [ ] Gerar nome completo
- [ ] Gerar e-mail válido
- [ ] Gerar CPF válido (validar matematicamente)
- [ ] Gerar CNPJ válido (validar matematicamente)
- [ ] Gerar telefone no formato correto
- [ ] Gerar data de nascimento
- [ ] Gerar senha com tamanho personalizado
- [ ] Gerar UUID válido
- [ ] Gerar IPv4 válido
- [ ] Gerar cor hexadecimal

#### Quantidade
- [ ] Gerar 1 item
- [ ] Gerar 10 itens
- [ ] Gerar 50 itens
- [ ] Gerar 100 itens
- [ ] Validar limite máximo

#### Interações
- [ ] Copiar resultado único
- [ ] Copiar múltiplos resultados
- [ ] Limpar todos os resultados
- [ ] Gerar múltiplos tipos simultaneamente

---

### 🔌 Validador de API

#### Métodos HTTP
- [ ] GET request (usar: https://jsonplaceholder.typicode.com/users/1)
- [ ] POST request (usar: https://jsonplaceholder.typicode.com/posts)
- [ ] PUT request
- [ ] PATCH request
- [ ] DELETE request

#### Headers
- [ ] Enviar sem headers
- [ ] Enviar headers customizados
- [ ] Headers inválidos (JSON malformado)
- [ ] Content-Type correto

#### Body
- [ ] POST com body JSON válido
- [ ] POST com body JSON inválido
- [ ] PUT com body JSON
- [ ] GET sem body (deve ser ignorado)

#### Validações
- [ ] URL vazia deve mostrar erro
- [ ] URL inválida deve mostrar erro
- [ ] Rate limiting após 10 requisições
- [ ] Tempo de resposta exibido corretamente
- [ ] Status code exibido corretamente
- [ ] Headers de resposta exibidos
- [ ] Body de resposta exibido e formatado
- [ ] Botão "Carregar Exemplo" preenche URL e método corretamente
- [ ] Content-Type só é enviado para métodos com body (POST/PUT/PATCH)
- [ ] Tipo de resposta é detectado e exibido corretamente (JSON, XML, HTML, texto)


#### CORS
- [ ] API com CORS habilitado funciona
- [ ] API sem CORS mostra erro apropriado
- [ ] Mensagens explicam a causa do CORS e alternativas de teste

---

### 📄 Conversor de Arquivos

#### CSV → JSON
- [ ] CSV simples (3 colunas, 3 linhas)
- [ ] CSV com cabeçalhos
- [ ] CSV sem dados (apenas cabeçalho) - deve dar erro
- [ ] CSV com vírgulas nos valores
- [ ] CSV com linhas vazias

#### JSON → CSV
- [ ] JSON array simples
- [ ] JSON com objetos aninhados
- [ ] JSON vazio - deve dar erro
- [ ] JSON não é array - deve dar erro

#### JSON → XML
- [ ] JSON objeto simples
- [ ] JSON array
- [ ] JSON com arrays aninhados
- [ ] JSON com caracteres especiais (<, >, &)

#### XML → JSON
- [ ] XML simples
- [ ] XML com atributos
- [ ] XML com CDATA
- [ ] XML malformado - deve dar erro

#### Upload de Arquivo
- [ ] Upload CSV válido
- [ ] Upload JSON válido
- [ ] Upload XML válido
- [ ] Upload arquivo muito grande (>5MB) - deve dar erro
- [ ] Upload tipo de arquivo inválido - deve dar erro

#### Botões e Ações
- [ ] Botão "Exemplo" preenche corretamente
- [ ] Botão "Copiar" copia resultado
- [ ] Botão "Download" baixa arquivo
- [ ] Botão "Limpar" limpa campos

---

### 🔍 Testador de Regex

#### Patterns Básicos
- [ ] Pattern simples (ex: "test")
- [ ] Pattern com metacaracteres (\d, \w, \s)
- [ ] Pattern com quantificadores (*, +, ?)
- [ ] Pattern com grupos ()
- [ ] Pattern inválido - deve mostrar erro

#### Flags
- [ ] Flag 'g' (global) - múltiplos matches
- [ ] Flag 'i' (ignore case) - case insensitive
- [ ] Flag 'm' (multiline)
- [ ] Combinação de flags
- [ ] Sem flags

#### Patterns Pré-definidos
- [ ] Email
- [ ] URL
- [ ] CPF
- [ ] CNPJ
- [ ] Telefone BR
- [ ] CEP
- [ ] Data
- [ ] IPv4
- [ ] Hex Color

#### Resultados
- [ ] Matches encontrados e exibidos
- [ ] Posição dos matches exibida
- [ ] Grupos capturados exibidos
- [ ] Destaque visual dos matches
- [ ] Nenhum match encontrado - exibir aviso

---

### ✅ Checklist de Testes

#### Criar Checklist
- [ ] Criar com nome válido
- [ ] Criar com nome vazio - deve dar erro
- [ ] Criar múltiplos checklists
- [ ] Trocar entre checklists

#### Gerenciar Items
- [ ] Adicionar item
- [ ] Adicionar item vazio - deve dar erro
- [ ] Adicionar múltiplos items
- [ ] Marcar item como completo
- [ ] Desmarcar item completo
- [ ] Remover item
- [ ] Remover todos os items

#### Persistência
- [ ] Dados salvos após refresh
- [ ] Dados salvos após fechar navegador
- [ ] Dados salvos no localStorage correto

#### Progresso
- [ ] Barra de progresso atualiza
- [ ] Contador de items atualiza
- [ ] Percentual calculado corretamente

#### Exportação
- [ ] Exportar checklist vazio
- [ ] Exportar checklist com items
- [ ] Arquivo JSON válido
- [ ] Nome do arquivo correto

#### Excluir
- [ ] Excluir checklist com confirmação
- [ ] Cancelar exclusão
- [ ] Excluir último checklist

---

## 🧪 Testes de Segurança

### XSS Prevention
- [ ] Input com `<script>alert('XSS')</script>` deve ser sanitizado
- [ ] Input com `<img src=x onerror=alert('XSS')>` deve ser sanitizado
- [ ] Input com HTML entities

### URL Validation
- [ ] `javascript:alert('XSS')` deve ser rejeitado
- [ ] `file:///etc/passwd` deve ser rejeitado
- [ ] URLs com http/https devem funcionar

### File Upload
- [ ] Arquivo .exe deve ser rejeitado
- [ ] Arquivo sem extensão deve ser rejeitado
- [ ] Arquivo muito grande deve ser rejeitado

### Rate Limiting
- [ ] 10 requisições em 1 minuto devem funcionar
- [ ] 11ª requisição deve ser bloqueada
- [ ] Após 1 minuto, requisições devem funcionar novamente

---

## 🎨 Testes de Acessibilidade

### Navegação por Teclado
- [ ] Tab navega entre elementos focáveis
- [ ] Enter ativa botões e links
- [ ] Escape fecha modals
- [ ] Foco visível em todos os elementos

### Screen Readers
- [ ] Imagens têm alt text
- [ ] Botões têm labels descritivos
- [ ] Inputs têm labels associados
- [ ] Landmarks estão corretos

### Contraste
- [ ] Texto tem contraste mínimo 4.5:1
- [ ] Botões têm contraste adequado
- [ ] Estados de foco são visíveis

---

## ⚡ Testes de Performance

### Lighthouse
- [ ] Performance > 90
- [ ] Accessibility > 90
- [ ] Best Practices > 90
- [ ] SEO > 90

### Bundle Size
- [ ] Tamanho total < 500KB
- [ ] Vendor chunk separado
- [ ] Code splitting funcionando

### Loading
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3.5s
- [ ] Largest Contentful Paint < 2.5s

---

## 🌐 Testes de Navegadores

### Desktop
- [ ] Chrome (última versão)
- [ ] Firefox (última versão)
- [ ] Safari (última versão)
- [ ] Edge (última versão)

### Mobile
- [ ] Chrome Mobile (Android)
- [ ] Safari (iOS)
- [ ] Samsung Internet

---

## 🔧 Testes de Build

### Desenvolvimento
```bash
npm run dev
```
- [ ] Servidor inicia sem erros
- [ ] Hot reload funciona
- [ ] Console sem erros

### Produção
```bash
npm run build
```
- [ ] Build completa sem erros
- [ ] Arquivos gerados em dist/
- [ ] Tamanho dos bundles aceitável

```bash
npm run preview
```
- [ ] Preview funciona
- [ ] Todas funcionalidades OK
- [ ] Performance adequada

---

## 📝 Relatório de Bugs

Ao encontrar bugs, documente:

1. **Descrição**: O que aconteceu?
2. **Passos para reproduzir**: Como reproduzir?
3. **Comportamento esperado**: O que deveria acontecer?
4. **Comportamento atual**: O que está acontecendo?
5. **Ambiente**: Navegador, OS, versão
6. **Screenshots**: Se possível
7. **Console logs**: Erros no console

---

## ✅ Critérios de Aceitação

Para considerar uma release pronta:

- [ ] Todos os testes de funcionalidade passam
- [ ] Todos os testes de segurança passam
- [ ] Lighthouse score > 90 em todas as métricas
- [ ] Funciona em todos os navegadores suportados
- [ ] Responsivo em todos os tamanhos de tela
- [ ] Acessível (WCAG 2.1 AA)
- [ ] Build de produção funciona
- [ ] Documentação atualizada
- [ ] CHANGELOG.md atualizado

---

**Dica**: Use este documento como um checklist real antes de cada release!
