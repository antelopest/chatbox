import type { AuthResponse, UserResponse } from '@packages/contracts';
import { writable } from 'svelte/store';

export interface AuthState {
  accessToken: string | null;
  user: UserResponse | null;
}
export const auth = writable<AuthState>({
  accessToken: null,
  user: null,
});

export function setAuth(response: AuthResponse) {
  auth.set({
    accessToken: response.tokens.accessToken,
    user: response.user,
  });

  localStorage.setItem('accessToken', response.tokens.accessToken);
}

export function clearAuth() {
  auth.set({ accessToken: null, user: null });
}
