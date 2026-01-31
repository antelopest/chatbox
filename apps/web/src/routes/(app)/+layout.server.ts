import { redirect } from '@sveltejs/kit';
import type { UserProfileResponse } from '@packages/contracts';

export const load = async ({ cookies, fetch }) => {
  const token = cookies.get('accessToken');
  if (!token) {
    throw redirect(302, '/login');
  }

  const res = await fetch('/api/users/profile');
  if (!res.ok) {
    throw redirect(302, '/login');
  }

  const user = (await res.json()) as UserProfileResponse;
  return { user };
};
