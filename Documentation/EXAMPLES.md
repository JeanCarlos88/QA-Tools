# Exemplos de Uso - QA Tools

Este documento fornece exemplos práticos de como usar cada ferramenta do QA Tools.

## 🎲 Gerador de Dados de Teste

### Caso de Uso 1: Gerar dados para cadastro de usuários

1. Acesse a ferramenta "Gerador de Dados"
2. Defina quantidade: 10
3. Clique em "Nome Completo", "E-mail", "CPF", "Telefone", "Data de Nascimento"
4. Copie os resultados para usar nos testes

**Exemplo de output:**
```
Nome: Maria Santos
Email: maria.santos@gmail.com
CPF: 123.456.789-10
Telefone: (11) 98765-4321
Data: 15/03/1990
```

### Caso de Uso 2: Gerar senhas para testes de segurança

1. Configure o tamanho da senha: 16
2. Clique em "Senha"
3. Use as senhas geradas para testar políticas de senha

## 🔌 Validador de API

### Caso de Uso 1: Testar endpoint GET

**Cenário:** Validar resposta de uma API pública

```
URL: https://jsonplaceholder.typicode.com/users/1
Método: GET
Headers: {}
```

**Resultado esperado:**
- Status: 200 OK
- Body: JSON com dados do usuário
- Headers: Content-Type: application/json

### Caso de Uso 2: Testar endpoint POST

**Cenário:** Criar um novo recurso

```
URL: https://jsonplaceholder.typicode.com/posts
Método: POST
Headers:
{
  "Content-Type": "application/json"
}
Body:
{
  "title": "Teste QA",
  "body": "Corpo do teste",
  "userId": 1
}
```

**Validações:**
- Verificar status 201 Created
- Confirmar que o body contém id gerado
- Validar tempo de resposta < 2s

## 📄 Conversor de Arquivos

### Caso de Uso 1: Converter CSV para JSON

**Input (CSV):**
```csv
nome,idade,cidade
João,25,São Paulo
Maria,30,Rio de Janeiro
Pedro,28,Belo Horizonte
```

**Output (JSON):**
```json
[
  {
    "nome": "João",
    "idade": "25",
    "cidade": "São Paulo"
  },
  {
    "nome": "Maria",
    "idade": "30",
    "cidade": "Rio de Janeiro"
  },
  {
    "nome": "Pedro",
    "idade": "28",
    "cidade": "Belo Horizonte"
  }
]
```

### Caso de Uso 2: Converter JSON para XML

**Input (JSON):**
```json
{
  "produto": {
    "nome": "Notebook",
    "preco": 3500,
    "estoque": 10
  }
}
```

**Output (XML):**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<root>
  <produto>
    <nome>Notebook</nome>
    <preco>3500</preco>
    <estoque>10</estoque>
  </produto>
</root>
```

## 🔍 Testador de Regex

### Caso de Uso 1: Validar emails em texto

**Pattern:** `[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}`

**Flags:** `g` (global)

**Texto de teste:**
```
Contatos:
João: joao@example.com
Maria: maria.silva@company.com.br
Pedro: pedro123@test.org
Inválido: pedro@
```

**Resultado:**
- 3 matches encontrados
- Emails válidos destacados
- Email inválido não capturado

### Caso de Uso 2: Extrair números de telefone

**Pattern:** `\(?\d{2}\)?\s?\d{4,5}-?\d{4}`

**Flags:** `g`

**Texto de teste:**
```
Telefones para contato:
(11) 98765-4321
11 987654321
(21)3456-7890
```

**Resultado:**
- 3 matches encontrados
- Diferentes formatos identificados

## ✅ Checklist de Testes

### Caso de Uso 1: Checklist de Teste de Login

**Criar checklist:**
1. Nome: "Teste de Login - Sprint 23"
2. Adicionar itens:
   - Validar campo usuário vazio
   - Validar campo senha vazio
   - Validar credenciais inválidas
   - Validar login com sucesso
   - Validar "Lembrar-me"
   - Validar "Esqueci minha senha"
   - Validar timeout de sessão

**Durante execução:**
- Marque cada item ao completar
- Acompanhe o progresso (3/7 = 43%)
- Exporte ao final para documentação

### Caso de Uso 2: Checklist de Regressão

**Criar checklist:**
1. Nome: "Regressão - Módulo Checkout"
2. Adicionar categorias como items:
   - [x] Carrinho de compras
   - [x] Cálculo de frete
   - [ ] Aplicação de cupons
   - [ ] Formas de pagamento
   - [ ] Confirmação de pedido

## 🎯 Fluxos Completos de Teste

### Fluxo 1: Teste de API E2E

1. **Gerar dados de teste** (Gerador de Dados)
   - Nome: Ana Silva
   - Email: ana.silva@test.com
   - CPF: 123.456.789-10

2. **Criar usuário via API** (Validador de API)
   ```
   POST /api/users
   Body: { dados gerados acima }
   Validar: Status 201
   ```

3. **Buscar usuário criado** (Validador de API)
   ```
   GET /api/users/{id}
   Validar: Dados correspondem
   ```

4. **Atualizar checklist** (Checklist de Testes)
   - Marcar "Criar usuário" como completo
   - Marcar "Buscar usuário" como completo

### Fluxo 2: Validação de Dados em Massa

1. **Gerar 100 CPFs** (Gerador de Dados)
   - Quantidade: 100
   - Tipo: CPF

2. **Exportar para CSV** (Conversor de Arquivos)
   - Colar CPFs em formato CSV
   - Converter para JSON se necessário

3. **Validar formato** (Testador de Regex)
   - Pattern: `\d{3}\.\d{3}\.\d{3}-\d{2}`
   - Validar que todos estão corretos

## 💡 Dicas de Uso

### Atalhos de Teclado

- **Gerador de Dados:** Enter após digitar quantidade
- **Conversor:** Ctrl+V para colar, Ctrl+C para copiar
- **Regex:** Use exemplos pré-definidos como base

### Melhores Práticas

1. **Organize seus testes:** Use checklists para cada sprint/módulo
2. **Salve seus dados:** Exporte checklists regularmente
3. **Reutilize patterns:** Salve regex patterns úteis em arquivo local
4. **Documente APIs:** Use o validador para documentar endpoints

### Integração com Outras Ferramentas

**Postman:**
- Gere dados de teste aqui
- Use no Postman para testes manuais

**Jira:**
- Crie checklists baseados em critérios de aceitação
- Exporte e anexe aos tickets

**Excel/Google Sheets:**
- Exporte dados em CSV
- Importe em planilhas para análise

## 🐛 Troubleshooting

### Problema: API retorna CORS error

**Solução:**
- API precisa ter CORS habilitado
- Use proxy CORS ou teste APIs públicas primeiro

### Problema: Conversão falha

**Solução:**
- Verifique formato do input
- Use o botão "Exemplo" para ver formato correto
- Valide JSON/XML antes de converter

### Problema: Regex não encontra matches

**Solução:**
- Teste com padrões simples primeiro
- Use flags corretas (g para global, i para case-insensitive)
- Consulte a referência rápida

---

## 📚 Recursos Adicionais

- [Documentação completa](README.md)
- [Guia de instalação](INSTALLATION.md)
- [Arquitetura do projeto](ARCHITECTURE.md)
- [Como contribuir](CONTRIBUTING.md)

**Precisa de ajuda?** Abra uma [issue no GitHub](https://github.com/yourusername/QA-Tools/issues)
