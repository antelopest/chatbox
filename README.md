# Chatbox

Real-time chat application.

## Stack

- **Frontend**: SvelteKit
- **Backend**: NestJS
- **Monorepo**: pnpm

## Structure

- `apps/web` - SvelteKit frontend
- `apps/api` - NestJS backend
- `packages/ui` - Shared Svelte components
- `packages/shared` - Types, Utilities, Validators

## Scripts

- pnpm lint
- pnpm lint:fix
- pnpm format
- pnpm format:fix

## Настройки Visual Studio Code

### settings.json

```
{
  "eslint.workingDirectories": [
    {
      "mode": "auto"
    }
  ],
  "eslint.enable": true,
  "eslint.useFlatConfig": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "prettier.requireConfig": true,
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```
