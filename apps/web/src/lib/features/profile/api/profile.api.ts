import type { UserResponse } from '@packages/contracts';

import { PROFILE_ROUTES } from './profile.routes';

import { http } from '$lib/common/services/http';

export const profileApi = {
  getProfile() {
    return http<UserResponse>(PROFILE_ROUTES.profile, {
      method: 'GET',
    });
  },
};
