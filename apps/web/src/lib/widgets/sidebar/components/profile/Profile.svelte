<script lang="ts">
  import { Avatar } from '$lib/components';
  import { auth, clearAuth } from '$lib/stores';
  import { authApi } from '$lib/features/auth/api/auth.api';
  import { goto } from '$app/navigation';

  $: username = $auth.user?.username
    ? $auth.user.username.charAt(0).toUpperCase() + $auth.user.username.slice(1)
    : '';

  const logout = async () => {
    try {
      await authApi.logout();
    } finally {
      clearAuth();
      await goto('/login');
    }
  };
</script>

<div class="profile">
  <Avatar></Avatar>
  <div class="profile__info">
    <span class="profile__info-username">{username}</span>
    <button
      class="profile__info-logout"
      type="button"
      aria-label="Logout"
      on:click={logout}>Logout</button
    >
  </div>
</div>

<style lang="scss">
  .profile {
    display: flex;
    gap: 1rem;
  }

  .profile__info {
    display: flex;
    flex-direction: column;

    &-username {
      font-size: 1rem;
      font-weight: var(--font-weight-bold);
      color: var(--color-text);
      letter-spacing: 0.4px;
    }

    &-logout {
      background: transparent;
      border: none;
      text-align: left;
      font-size: 0.9rem;
      font-weight: var(--font-weight-regular);
      color: var(--color-text-muted);
      cursor: pointer;

      &:hover {
        font-weight: var(--font-weight-medium);
      }
    }
  }
</style>
