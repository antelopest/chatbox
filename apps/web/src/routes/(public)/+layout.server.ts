import { redirect } from '@sveltejs/kit';

export const load = ({ cookies }) => {
  const token = cookies.get('accessToken');
  
  if (token) {
    throw redirect(302, '/profile');
  }
};
