import type { DialogsResponse } from '@packages/contracts';

import { DIALOGS_ROUTES } from '$lib/features/dialogs/api/dialogs.routes.js';

export const load = async ({
  fetch,
  request,
}): Promise<{ dialogs?: DialogsResponse }> => {
  try {
    const res = await fetch(DIALOGS_ROUTES.dialogs, {
      method: 'GET',
      headers: {
        cookie: request.headers.get('cookie') ?? '',
      },
    });

    if (!res.ok) {
      return {};
    }

    const dialogs = (await res.json()) as DialogsResponse;
    return { dialogs };
  } catch {
    return {};
  }
};
