import { get } from 'svelte/store';
import { redirect } from '@sveltejs/kit';

import { auth } from '$lib/stores';


export const load = () => {
  const { accessToken } = get(auth);

  if (!accessToken) {
    throw redirect(302, '/login');
  }
};
