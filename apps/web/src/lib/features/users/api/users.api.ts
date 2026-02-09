import type { UserResponse } from '@packages/contracts';

import { USERS_ROUTES } from './users.routes';

import { http } from '$lib/common/services/http';

export const usersApi = {
  search(username: string) {
    const params = new URLSearchParams({ username });
    return http<UserResponse[]>(`${USERS_ROUTES.search}?${params.toString()}`, {
      method: 'GET',
    });
  },
  getProfile() {
    return http<UserResponse>(USERS_ROUTES.profile, {
      method: 'GET',
    });
  },
};
