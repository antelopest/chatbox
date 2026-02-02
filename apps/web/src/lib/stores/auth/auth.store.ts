import type { UserResponse } from '@packages/contracts';
import { writable } from 'svelte/store';

export interface AuthState {
  user: UserResponse | null;
}
export const auth = writable<AuthState>({
  user: null,
});

export function setAuth(userResponse: UserResponse) {
  auth.set({
    user: userResponse,
  });
}

export function setUser(user: UserResponse) {
  auth.update((state) => ({ ...state, user }));
}

export function clearAuth() {
  auth.set({ user: null });
}
