# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

Se você descobrir uma vulnerabilidade de segurança neste projeto, por favor, siga estas etapas:

### 1. Não Abra uma Issue Pública

Vulnerabilidades de segurança não devem ser reportadas publicamente para evitar exploração.

### 2. Entre em Contato Diretamente

Recomendamos abrir um aviso privado via **GitHub Security Advisories**:

- Link: https://github.com/JeanCarlos88/QA-Tools/security/advisories

Opcionalmente, você pode enviar um e-mail (se preferir): `seu.email@dominio.com`.

Inclua:
- Descrição detalhada da vulnerabilidade
- Passos para reproduzir
- Possível impacto
- Sugestões de correção (se houver)

### 3. Aguarde Resposta

- Você receberá confirmação em até 48 horas
- Faremos o possível para corrigir vulnerabilidades críticas em até 7 dias
- Manteremos você informado sobre o progresso

### 4. Divulgação Coordenada

- Aguarde nossa correção antes de divulgar publicamente
- Creditaremos sua descoberta (se desejar)

## Práticas de Segurança

Este projeto segue estas práticas:

✅ **Client-Side Processing**: Todos os dados são processados localmente
✅ **Input Sanitization**: Inputs são sanitizados para prevenir XSS
✅ **No Backend**: Nenhum dado é enviado para servidores
✅ **Rate Limiting**: Limitação de requisições para prevenir abuso
✅ **URL Validation**: Validação de URLs antes de requisições
✅ **File Validation**: Validação de tipo e tamanho de arquivos

## O Que NÃO é uma Vulnerabilidade

- Problemas de usabilidade
- Bugs que não afetam a segurança
- Incompatibilidades de navegador
- Sugestões de funcionalidades

## Agradecimentos

Agradecemos a todos que reportam vulnerabilidades de forma responsável! 🙏
