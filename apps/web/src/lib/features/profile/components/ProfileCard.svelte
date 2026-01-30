<script lang="ts">
  import type { UserProfileResponse } from '@packages/contracts';
  import { Avatar } from '@packages/ui';
  import ReadonlyField from './ReadonlyField.svelte';

  export let user: UserProfileResponse | null = null;
</script>

<div class="profile-card">
  <div class="profile-card__header">
    <!-- <Avatar /> -->
    <div class="profile-card__title">
      <h2>{user?.username ?? 'User'}</h2>
      <p>{user?.displayName ?? '—'}</p>
    </div>
  </div>

  <div class="profile-card__fields">
    <ReadonlyField label="Username" value={user?.username} />
    <ReadonlyField label="Email" value={user?.email} />
    <ReadonlyField label="Display name" value={user?.displayName} />
  </div>
</div>

<style lang="scss">
  .profile-card {
    max-width: 520px;
    background: var(--bg-panel);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .profile-card__header {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .profile-card__title h2 {
    margin: 0;
    font-size: 20px;
  }

  .profile-card__title p {
    margin: 4px 0 0;
    color: var(--text-muted);
  }

  .profile-card__fields {
    display: grid;
    gap: 14px;
  }
</style>
