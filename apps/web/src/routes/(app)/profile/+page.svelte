<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  import type { UserProfileResponse } from '@packages/contracts';
  import ProfileCard from '$lib/features/profile/components/ProfileCard.svelte';
  import { auth, setUser } from '$lib/stores';
  import { http } from '$lib/services/http';

  let user: UserProfileResponse | null = null;
  $: user = $auth.user as UserProfileResponse | null;

  onMount(async () => {
    try {
      const data = await http<UserProfileResponse>('/api/users/profile');
      setUser(data);
    } catch {
      goto('/login');
    }

  });
</script>

<section class="profile">
  <h1 class="profile__title">Profile</h1>
  <ProfileCard {user} />
</section>

<style lang="scss">
  .profile {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .profile__title {
    margin: 0;
    font-size: 22px;
  }
</style>
