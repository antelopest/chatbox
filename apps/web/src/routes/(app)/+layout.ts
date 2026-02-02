import { get } from 'svelte/store';

import { browser } from '$app/environment';
import { profileApi } from '$lib/features/profile/index.js';
import { auth } from '$lib/stores';
import type { AppData } from '$lib/common/types';

export const load = async ({ data }): Promise<AppData> => {
  if (!browser || !data?.hasToken) {
    return {};
  }

  if (get(auth).user) {
    return {};
  }

  try {
    const user = await profileApi.getProfile();
    return { user };
  } catch {
    return {};
  }
};
