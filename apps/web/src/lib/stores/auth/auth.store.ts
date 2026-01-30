import type {
  AuthResponse,
  UserProfileResponse,
  UserResponse,
} from '@packages/contracts';
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
    accessToken: null,
    user: response.user,
  });
}

export function setUser(user: UserResponse | UserProfileResponse) {
  auth.update((state) => ({ ...state, user }));
}

export function setAccessToken(accessToken: string | null) {
  auth.update((state) => ({ ...state, accessToken }));
}

export function clearAuth() {
  auth.set({ accessToken: null, user: null });
}
