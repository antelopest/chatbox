import type { DialogsResponse } from '@packages/contracts';

const API_BASE = 'http://localhost:3000';

export const load = async ({
  fetch,
  request,
}): Promise<{ dialogs?: DialogsResponse }> => {
  try {
    const res = await fetch(`${API_BASE}/api/dialogs`, {
      method: 'GET',
      headers: {
        cookie: request.headers.get('cookie') ?? '',
      },
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      console.log('dialogs fetch failed:', res.status, text);
      return {};
    }

    const dialogs = (await res.json()) as DialogsResponse;
    console.log('dialogs:', dialogs);
    return { dialogs };
  } catch {
    return {};
  }
};
