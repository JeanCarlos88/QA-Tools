# 🚀 Guia de Deploy no GitHub Pages

Este guia garante que o projeto funcione perfeitamente no GitHub Pages.

## ✅ Configurações Aplicadas

### 1. Configuração do Vite (`vite.config.js`)
```javascript
base: '/QA-Tools/'  // Nome do repositório
```

### 2. Configuração do React Router (`src/main.jsx`)
```javascript
<BrowserRouter basename="/QA-Tools">
```

### 3. Suporte a SPA (Single Page Application)

#### Arquivo `public/404.html`
- Redireciona todas as rotas para o `index.html`
- Necessário para que as rotas do React Router funcionem no GitHub Pages

#### Script no `index.html`
- Processa os parâmetros de redirecionamento do 404.html
- Restaura a rota correta no navegador

### 4. GitHub Actions (`.github/workflows/deploy.yml`)
- Build automático ao fazer push na branch `main`
- Deploy automático para GitHub Pages
- Workflow simplificado e comentado para facilitar manutenção
- Usa Node.js 18 e npm ci para builds consistentes

## 📋 Checklist Pré-Deploy

Antes de fazer o deploy, certifique-se de:

- [ ] **Atualizar URLs no `package.json`**
  ```json
  "homepage": "https://JeanCarlos88.github.io/QA-Tools"
  ```

- [ ] **Atualizar repository no `package.json`**
  ```json
  "repository": {
    "url": "https://github.com/JeanCarlos88/QA-Tools.git"
  }
  ```

- [ ] **Criar repositório no GitHub**
  - Nome deve ser exatamente: `QA-Tools`
  - Público ou privado (Pages funciona em ambos)

- [ ] **Configurar GitHub Pages**
  1. Vá em Settings → Pages
  2. Source: GitHub Actions
  3. Aguarde o primeiro deploy

## 🔧 Comandos Importantes

### Build Local
```bash
npm run build
```

### Testar Build Localmente
```bash
npm run preview
```
Acesse: `http://localhost:4173/QA-Tools/`

### Verificar Rotas
Teste todas as rotas:
- http://localhost:4173/QA-Tools/
- http://localhost:4173/QA-Tools/data-generator
- http://localhost:4173/QA-Tools/api-validator
- http://localhost:4173/QA-Tools/file-converter
- http://localhost:4173/QA-Tools/regex-tester
- http://localhost:4173/QA-Tools/test-checklist

## 🌐 Deploy Manual (Opcional)

Se preferir deploy manual sem GitHub Actions:

```bash
# 1. Build
npm run build

# 2. Instalar gh-pages
npm install -D gh-pages

# 3. Adicionar script ao package.json
"deploy": "gh-pages -d dist"

# 4. Deploy
npm run deploy
```

## 🐛 Troubleshooting

### Problema: Página em branco
**Solução:** Verifique se `base` no `vite.config.js` e `basename` no `BrowserRouter` estão corretos.

### Problema: 404 ao acessar rotas diretas
**Solução:** Certifique-se de que:
- `public/404.html` existe
- Script de redirecionamento está no `index.html`

### Problema: Assets não carregam
**Solução:** O `base` no `vite.config.js` deve ter `/` no início e no fim: `/QA-Tools/`

### Problema: GitHub Actions falha
**Solução:** 
1. Verifique se as permissões estão configuradas (Settings → Actions → General → Workflow permissions)
2. Habilite "Read and write permissions"

## 📊 Verificação de Funcionamento

Após o deploy, verifique:

1. **Home Page carrega** ✓
2. **Navegação entre páginas funciona** ✓
3. **Reload em qualquer rota funciona** ✓
4. **Ferramentas funcionam corretamente** ✓
5. **Assets (CSS, JS) carregam** ✓

## 🔒 Segurança

O projeto já está configurado com:
- ✅ Processamento 100% client-side
- ✅ Sanitização de inputs
- ✅ Validação de dados
- ✅ Rate limiting
- ✅ Sem backend ou banco de dados
- ✅ Sem necessidade de secrets ou variáveis de ambiente

## 📚 Referências

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html#github-pages)
- [SPA GitHub Pages](https://github.com/rafgraph/spa-github-pages)

---

**Pronto para deploy!** 🎉

Siga os passos do `Documentation/NEXT_STEPS.md` para fazer o primeiro deploy.
