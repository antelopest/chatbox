import type { AuthResponse, UserResponse } from '@packages/contracts';
import { writable } from 'svelte/store';

export interface AuthState {
  user: UserResponse | null;
}
export const auth = writable<AuthState>({
  user: null,
});

export function setAuth(response: AuthResponse) {
  auth.set({
    user: response.user,
  });
}

export function setUser(user: UserResponse) {
  auth.update((state) => ({ ...state, user }));
}

export function clearAuth() {
  auth.set({ user: null });
}
