# Guia de Instalação Rápida - QA Tools

## 🚀 Iniciando o Projeto

### 1. Instalar Dependências

```bash
npm install
```

### 2. Executar em Desenvolvimento

```bash
npm run dev
```

Acesse: http://localhost:5173

### 3. Build para Produção

```bash
npm run build
```

Arquivos gerados em: `dist/`

### 4. Preview do Build

```bash
npm run preview
```

## 📦 Estrutura de Comandos

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento |
| `npm run build` | Gera build otimizado |
| `npm run preview` | Visualiza build de produção |

## 🌐 Deploy no GitHub Pages

### Configuração Inicial

1. No GitHub, vá em **Settings** > **Pages**
2. Em **Source**, selecione **GitHub Actions**
3. Faça push do código para a branch `main`
4. O deploy será automático via GitHub Actions

### Personalização

Edite `vite.config.js` e altere o `base`:

```javascript
export default defineConfig({
  base: '/seu-repositorio-nome/',
  // ...
})
```

E em `src/main.jsx`:

```javascript
<BrowserRouter basename="/seu-repositorio-nome">
```

Nota: Neste repositório (`QA-Tools`), já está configurado como:

```javascript
// vite.config.js
base: '/QA-Tools/'

// src/main.jsx
<BrowserRouter basename="/QA-Tools">
```

## 🔧 Troubleshooting

### Erro: "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build falhando
- Verifique se todas as importações estão corretas
- Execute `npm run build` localmente primeiro

### GitHub Pages mostrando 404
- Confirme que o `base` no `vite.config.js` está correto
- Aguarde alguns minutos após o deploy

## 💡 Dicas

- Use `npm run dev` durante desenvolvimento
- Teste o build localmente antes de fazer push
- Mantenha as dependências atualizadas
- Configure seu repositório como público no GitHub

## 📝 Próximos Passos

1. Personalize as cores em `tailwind.config.js`
2. Atualize os links do GitHub no código
3. Adicione sua licença personalizada
4. Configure analytics (opcional)

---

Pronto! Seu projeto está configurado e pronto para uso! 🎉
