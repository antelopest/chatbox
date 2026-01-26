# Chatbox

Real-time chat application.

Тестовое задание на FullStack разработчика (Node, Nest, Mongo, Svetle).

## Критерии сдачи

- [x] Регистрация и логин (only local strategy (email + password)).
- [x] JWT защита (access, refresh strategy).
- [ ] Диалоги 1-на-1.
- [ ] Real-time через WebSocket.
- [ ] Опционально:
  - [ ] Stories
  - [ ] Docker
  - [ ] Тесты

## Registration & Login

### Auth Providers:

* Local:
  * Email, password
* OAuth:
  * Facebook, Apple, Google - отсутсвует.

### API

* POST - /login - Войти в систему (Email, Password).
* POST - /register - Регистрация пользователя (Email, Fullname, Password, ConfirmPassword).

## JWT защита 

* GET - /check - Внутренний маршрут для проверки валидности accessToken.
* GET - /refresh - Проверка валидности refreshToken, замена на новый accessToken, refreshToken.
* GET - /logout - Удаляет refreshToken из refreshTokenStorage.

Ролевая модель - отсуствует.

Механизм авторизации - отстуствует. 

## Stack

- **Frontend**: SvelteKit
- **Backend**: NestJS
- **Monorepo**: pnpm

## Structure

- `apps/web` - SvelteKit frontend
- `apps/api` - NestJS backend
- `packages/ui` - Shared Svelte components
- `packages/validators` - Validators Schemes
- `packages/contracts` - Contracts

## Scripts

- pnpm lint
- pnpm lint:fix
- pnpm format
- pnpm format:fix

## Настройки Visual Studio Code

`settings.json`

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

