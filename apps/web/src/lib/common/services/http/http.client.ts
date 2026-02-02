// lib/services/http/http.client.ts
import type { HttpRequestOptions } from './http.types';
import { HttpError } from './http.error';

export async function http<T>(
  url: string,
  options: HttpRequestOptions = {},
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

  if (!res.ok) {
    let payload: unknown = null;
    try {
      payload = await res.json();
    } catch {}

    throw new HttpError(res.status, payload);
  }

  return res.json() as Promise<T>;
}
