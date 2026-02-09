import { browser } from '$app/environment';
import type { UserResponse } from '@packages/contracts';
import { usersApi } from '$lib/features/users';

export const load = async ({ parent }): Promise<{ user?: UserResponse }> => {
  const parentData = await parent();

  if (parentData?.user) {
    return { user: parentData.user };
  }

  if (!browser) {
    return {};
  }

  try {
    const user = await usersApi.getProfile();
    return { user };
  } catch {
    return {};
  }
};
