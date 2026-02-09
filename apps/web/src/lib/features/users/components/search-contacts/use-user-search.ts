import type { UserResponse } from '@packages/contracts';
import { writable, type Readable } from 'svelte/store';

import { usersApi } from '$lib/features/users';

export type SearchState = 'idle' | 'loading' | 'success' | 'error';

export interface UserSearch {
  results: Readable<UserResponse[]>;
  state: Readable<SearchState>;
  error: Readable<string | undefined>;
  search(query: string): Promise<void>;
  reset(): void;
}

export function useUserSearch(): UserSearch {
  const results = writable<UserResponse[]>([]);
  const state = writable<SearchState>('idle');
  const error = writable<string | undefined>(undefined);

  let lastRequestId = 0;

  function reset(): void {
    results.set([]);
    state.set('idle');
    error.set(undefined);
  }

  function getErrorMessage(e: unknown): string {
    return e instanceof Error ? e.message : 'Search failed';
  }

  async function search(query: string): Promise<void> {
    const requestId = ++lastRequestId;
    state.set('loading');
    error.set(undefined);

    try {
      const users = await usersApi.search(query);

      if (requestId !== lastRequestId) return;

      results.set(users);
      state.set('success');
    } catch (e) {
      if (requestId !== lastRequestId) return;

      results.set([]);
      error.set(getErrorMessage(e));
      state.set('error');
    }
  }

  return {
    results,
    state,
    error,
    search,
    reset,
  };
}
