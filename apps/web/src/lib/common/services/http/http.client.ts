// lib/services/http/http.client.ts
import type { HttpRequestOptions } from './http.types';
import { HttpError } from './http.error';

import { clearAuth } from '$lib/stores';
import { AUTH_ROUTES } from '$lib/features/auth/api/auth.routes';

let refreshPromise: Promise<void> | null = null;

async function parseJsonSafe<T>(res: Response): Promise<T> {
  const text = await res.text();
  if (!text) return undefined as T;
  try {
    return JSON.parse(text) as T;
  } catch {
    return undefined as T;
  }
}

async function refreshTokens(): Promise<void> {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      const res = await fetch(AUTH_ROUTES.refresh, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        let payload: unknown = null;
        try {
          payload = await parseJsonSafe(res);
        } catch {}
        throw new HttpError(res.status, payload);
      }

      await parseJsonSafe(res);
    })().finally(() => {
      refreshPromise = null;
    });
  }

  await refreshPromise;
}

async function handleAuthFailure() {
  clearAuth();
  if (typeof window !== 'undefined') {
    const { goto } = await import('$app/navigation');
    goto('/login');
  }
}

async function request<T>(
  url: string,
  options: HttpRequestOptions,
  allowRefresh: boolean,
): Promise<T> {
  const { method = 'GET', body, headers, credentials = 'include' } = options;

  const res = await fetch(url, {
    method,
    body: body ? JSON.stringify(body) : undefined,
    credentials,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  });

  if (
    res.status === 401 &&
    allowRefresh &&
    !options.skipAuthRefresh &&
    url !== AUTH_ROUTES.refresh
  ) {
    try {
      await refreshTokens();
    } catch (error) {
      await handleAuthFailure();
      throw error;
    }
    return request<T>(url, options, false);
  }

  if (!res.ok) {
    let payload: unknown = null;
    try {
      payload = await parseJsonSafe(res);
    } catch {}

    throw new HttpError(res.status, payload);
  }

  return parseJsonSafe(res) as Promise<T>;
}

export async function http<T>(
  url: string,
  options: HttpRequestOptions = {},
): Promise<T> {
  return request<T>(url, options, true);
}
