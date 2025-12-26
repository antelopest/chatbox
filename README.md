# Chatbox

Web Application

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
