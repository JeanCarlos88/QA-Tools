# 🚀 Quick Start - QA Tools

## Início Rápido em 3 Passos

### 1️⃣ Instalar

```bash
cd c:\Projetos\QA-Tools
npm install
```

### 2️⃣ Executar

```bash
npm run dev
```

Acesse: http://localhost:5173

### 3️⃣ Usar

- Navegue pelo menu lateral
- Escolha uma ferramenta
- Comece a testar!

---

## 🎯 Ferramentas Disponíveis

| Ferramenta | Descrição | Caminho |
|------------|-----------|---------|
| 🎲 Gerador de Dados | Gere CPF, CNPJ, emails, nomes, etc | `/data-generator` |
| 🔌 Validador de API | Teste requisições HTTP | `/api-validator` |
| 📄 Conversor | CSV ↔ JSON ↔ XML | `/file-converter` |
| 🔍 Regex Tester | Teste expressões regulares | `/regex-tester` |
| ✅ Checklist | Gerencie testes | `/test-checklist` |

---

## 📝 Comandos Úteis

```bash
# Desenvolvimento
npm run dev

# Build
npm run build

# Preview do build
npm run preview

# Lint
npm run lint
```

---

## 🌐 Deploy no GitHub

1. Crie repositório no GitHub
2. Configure GitHub Pages (Settings > Pages > Source: GitHub Actions)
3. Push do código:

```bash
git init
git add .
git commit -m "feat: initial commit"
git branch -M main
git remote add origin https://github.com/seu-usuario/QA-Tools.git
git push -u origin main
```

4. Aguarde o deploy automático!

---

## ⚡ Personalização Rápida

### Mudar nome do repositório

**vite.config.js:**
```javascript
base: '/seu-repo-nome/',
```

**src/main.jsx:**
```javascript
<BrowserRouter basename="/seu-repo-nome">
```

### Mudar cores

**tailwind.config.js:**
```javascript
colors: {
  primary: {
    500: '#0ea5e9', // Sua cor aqui
  }
}
```

---

## 📖 Documentação

- [README.md](README.md) - Documentação completa
- [EXAMPLES.md](EXAMPLES.md) - Exemplos de uso
- [ARCHITECTURE.md](ARCHITECTURE.md) - Arquitetura
- [CONTRIBUTING.md](CONTRIBUTING.md) - Como contribuir

---

## 🐛 Problemas Comuns

### Porta 5173 em uso
```bash
npm run dev -- --port 3000
```

### Erro ao instalar
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build falhando
Verifique se todas as importações estão corretas e execute:
```bash
npm run build
```

---

## 💡 Dicas

- Use Ctrl+C para parar o servidor
- Mudanças no código recarregam automaticamente
- Console do navegador mostra erros
- Build antes de fazer deploy

---

**Pronto para começar! 🎉**

Se tiver dúvidas, consulte a [documentação completa](README.md) ou abra uma [issue](https://github.com/yourusername/QA-Tools/issues).
