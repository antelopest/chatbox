import { get } from 'svelte/store';

import { browser } from '$app/environment';
import { auth } from '$lib/stores';
import type { AppData } from '$lib/common/types';
import { usersApi } from '$lib/features/users';

export const load = async ({ data }): Promise<AppData> => {
  if (!browser || !data?.hasToken) {
    return {};
  }

  if (get(auth).user) {
    return {};
  }

  try {
    const user = await usersApi.getProfile();
    return { user };
  } catch {
    return {};
  }
};
