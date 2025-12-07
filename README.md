# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:


## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
# Golden-flex-web

Aplicação frontend web para o projeto Golden Flex — painel/cliente em React (Vite).

**Descrição**: projeto React + Vite que consome uma API REST (estacionamento) e provê telas de Splash, Login, Cadastro e Listagem. Usa `styled-components` para estilos e `framer-motion` para animações de transição.

**Principais características**
- Setup leve com Vite
- Rotas com `react-router-dom`
- Comunicação HTTP via `axios` (arquivo central `src/api.js`)
- Armazenamento de token no `localStorage` e interceptador do `axios`
- Fontes locais em `src/assets/Font` com `@font-face` em `src/index.css`

**Tecnologias**
- React 19
- Vite
- styled-components
- framer-motion
- axios
- react-router-dom

**Scripts úteis**
- `npm run dev` — inicia o servidor de desenvolvimento (Vite)
- `npm run build` — gera build de produção em `dist/`
- `npm run preview` — pré-visualiza o build localmente
- `npm run lint` — executa ESLint (projeto pode não ter regras automáticas configuradas)

---

**Instalação**

```bash
npm install
```

**Rodando localmente**

```bash
npm run dev
```

Abra `http://localhost:5173` (porta padrão do Vite) no navegador.

Se estiver no Windows PowerShell e ocorrer erro relacionado a scripts (`npm.ps1`), execute o npm via `npm.cmd` ou ajuste a ExecutionPolicy: por exemplo `npm.cmd run build` ou ajustar política do PowerShell conforme permissões locais.

**Build de produção**

```bash
npm run build
npm run preview
```

---

**Configuração da API**

- O cliente usa um `axios` instance em `src/api.js` com `baseURL` apontando para a API: `https://estacionamentoapi.azurewebsites.net`.
- Se necessário apontar para outra URL (ex.: ambiente de desenvolvimento), atualize o `baseURL` em `src/api.js` ou adicione suporte a variável de ambiente.
- O token de autenticação é lido/gravado em `localStorage` com a chave `token` (padrão atual). O interceptor anexa `Authorization: Bearer <token>` às requisições.

---

**Arquitetura / Rotas**

- `/` — Splash (redireciona para `/login` após animação)
- `/login` — Tela de login
- `/cadastro` — Tela para criar novo usuário
- `/list` — Tela principal/Listagem

**Onde alterar as fontes**
- Fontes estão em `src/assets/Font` e são registradas via `@font-face` em `src/index.css`.

---

**Notas de desenvolvimento**

- Componentes foram migrados de padrões RN para web onde necessário (ex.: `select` no lugar de `Picker`).
- Animações de transição de página usam `framer-motion` (ver `src/App.jsx` — `AnimatedLayout`).
- Inputs aceitam `onChange` (valor de string) e não `onChangeText` (padrão RN).

**Qualidade e lint**
- Rode `npm run lint` para ver avisos de ESLint. Recomenda-se configurar `prettier`/`husky`/`lint-staged` para padronizar commits.

---

**Problemas conhecidos / Dicas**
- O projeto envia temporariamente tanto `senha` quanto `password` no payload de login para compatibilidade com a API; recomenda-se alinhar o campo correto com o backend e remover a duplicação.
- Se ocorrerem avisos do ESLint sobre parâmetros não usados, revise os arquivos alterados (ex.: `src/api.js`) e aplique pequenas correções (já feito em commits recentes).

---

**Como contribuir**
- Faça um fork, crie uma branch com sua feature/bugfix, abra PR com descrição clara.
- Execute `npm install` e `npm run dev` para testar localmente.
- Rode `npm run lint` antes do PR.

---

**Próximos passos sugeridos**
- Padronizar armazenamento do token e remover envio duplicado de campos de senha.
- Adicionar CI (GitHub Actions) para rodar `npm run build` e `npm run lint` em PRs.
- Adicionar documentação de componentes e storybook (opcional).

---

Se quiser, eu posso:
- criar um commit com este `README.md`;
- ou criar um workflow de GitHub Actions básico para build + lint.

Obrigado — diga como prefere que eu prossiga.
