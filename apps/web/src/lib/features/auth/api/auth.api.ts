import type {
  AuthResponse,
  LoginUser,
  RegisterUser,
} from '@packages/contracts';

import { AUTH_ROUTES } from './auth.routes';

import { http } from '$lib/common/services/http';

export const authApi = {
  register(data: RegisterUser) {
    return http<AuthResponse>(AUTH_ROUTES.register, {
      method: 'POST',
      body: data,
    });
  },

  login(data: LoginUser) {
    return http<AuthResponse>(AUTH_ROUTES.login, {
      method: 'POST',
      body: data,
    });
  },

  refresh() {
    return http<AuthResponse>(AUTH_ROUTES.refresh, {
      method: 'POST',
    });
  },

  logout() {
    return http<void>(AUTH_ROUTES.logout, {
      method: 'POST',
    });
  },
};
