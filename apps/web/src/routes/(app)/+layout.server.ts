import { redirect } from '@sveltejs/kit';

import { APP_ROUTES } from '$lib/navigation/index.js';

export const load = async ({ cookies }) => {
  const token = cookies.get('accessToken');

  if (!token) {
    throw redirect(302, APP_ROUTES.login);
  }

  return { hasToken: true };
};
