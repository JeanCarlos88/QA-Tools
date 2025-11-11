# Contribuindo para o QA Tools

Obrigado pelo interesse em contribuir! 🎉

## Como Contribuir

### Reportando Bugs

1. Verifique se o bug já foi reportado nas [issues](https://github.com/yourusername/QA-Tools/issues)
2. Se não encontrar, crie uma nova issue incluindo:
   - Descrição clara do problema
   - Passos para reproduzir
   - Comportamento esperado vs atual
   - Screenshots (se aplicável)
   - Navegador e versão

### Sugerindo Funcionalidades

1. Verifique se a funcionalidade já foi sugerida
2. Crie uma issue com tag `enhancement` incluindo:
   - Descrição detalhada da funcionalidade
   - Casos de uso
   - Possíveis implementações

### Desenvolvendo

1. Fork o repositório
2. Clone seu fork: `git clone https://github.com/seu-usuario/QA-Tools.git`
3. Crie uma branch: `git checkout -b feature/minha-feature`
4. Instale dependências: `npm install`
5. Faça suas alterações
6. Teste localmente: `npm run dev`
7. Commit com mensagens claras: `git commit -m "feat: adiciona nova funcionalidade"`
8. Push: `git push origin feature/minha-feature`
9. Abra um Pull Request

## Padrões de Código

### Estrutura de Componentes

```jsx
import { useState } from 'react';
import PropTypes from 'prop-types';

const MeuComponente = ({ prop1, prop2 }) => {
  const [state, setState] = useState(initialValue);

  const handleAction = () => {
    // lógica
  };

  return (
    <div>
      {/* JSX */}
    </div>
  );
};

MeuComponente.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.number,
};

export default MeuComponente;
```

### Convenções de Nomenclatura

- **Componentes**: PascalCase (`MyComponent.jsx`)
- **Funções utilitárias**: camelCase (`formatDate.js`)
- **Constantes**: UPPER_SNAKE_CASE (`MAX_FILE_SIZE`)
- **Pastas**: kebab-case (`my-folder/`)

### Commits

Use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` nova funcionalidade
- `fix:` correção de bug
- `docs:` mudanças na documentação
- `style:` formatação, ponto e vírgula, etc
- `refactor:` refatoração de código
- `test:` adicionar testes
- `chore:` atualização de dependências, etc

### Testes

- Teste suas alterações antes de submeter
- Garanta que o build funciona: `npm run build`
- Verifique se não há erros no console

## Diretrizes

- Mantenha componentes pequenos e focados
- Evite duplicação de código
- Use componentes reutilizáveis quando possível
- Documente funções complexas
- Priorize legibilidade sobre brevidade
- Siga os padrões de acessibilidade (a11y)

## Segurança

- Sempre sanitize inputs do usuário
- Valide dados antes de processar
- Não adicione dependências desnecessárias
- Reporte vulnerabilidades de forma responsável

## Dúvidas?

Abra uma [issue](https://github.com/yourusername/QA-Tools/issues) ou entre em contato!

Obrigado por contribuir! 🚀
