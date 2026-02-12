<script lang="ts">
  import type { UserResponse } from '@packages/contracts';
  import { goto } from '$app/navigation';
  import { formatDate } from '$lib/common';
  import { dialogsApi } from '$lib/features/dialogs';
  import { SearchContacts } from '$lib/features/users';
  import { Button, Avatar } from '@packages/ui';

  let selectedUser: UserResponse | undefined;

  let creatingDialog = false;
  let dialogError: string | undefined;

  async function startDialog(): Promise<void> {
    if (!selectedUser) return;

    creatingDialog = true;
    dialogError = undefined;

    try {
      await dialogsApi.createPrivate([selectedUser.id]);
      await goto('/messages');
    } catch (e) {
      dialogError = e instanceof Error ? e.message : 'Failed to create dialog';
    } finally {
      creatingDialog = false;
    }
  }
</script>

<section class="contacts">
  <aside class="contacts__sidebar">
    <SearchContacts bind:selectedUser />
  </aside>

  <div class="contacts__details">
    {#if selectedUser}
      <div class="user-profile">
        <header class="user-profile__header">
          <Avatar label={selectedUser.username ?? ''} />

          <div>
            <div class="user-profile__name">
              {selectedUser.profile?.displayName ?? selectedUser.username}
            </div>
            <div class="user-profile__username">
              @{selectedUser.username}
            </div>
          </div>
        </header>

        <div class="user-profile__actions">
          <Button
            type="button"
            variant="primary"
            size="sm"
            disabled={creatingDialog}
            onclick={startDialog}
          >
            {creatingDialog ? 'Creating…' : 'Create chat'}
          </Button>

          {#if dialogError}
            <div class="user-profile__error">{dialogError}</div>
          {/if}
        </div>

        <div class="user-profile__details">
          <div class="user-profile__row">
            <span>Username</span>
            <span>{selectedUser.username}</span>
          </div>
          <div class="user-profile__row">
            <span>Email</span>
            <span>{selectedUser.email}</span>
          </div>
          <div class="user-profile__row">
            <span>Created</span>
            <span>{formatDate(selectedUser.createdAt)}</span>
          </div>
        </div>
      </div>
    {/if}
  </div>
</section>

<style lang="scss">
  .contacts {
    min-height: calc(100svh - 96px);
    display: grid;
    grid-template-columns: 350px 1fr;
    background: var(--color-bg);
  }

  .contacts__sidebar {
    padding: 2rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border-right: 1px solid var(--color-line);
    background: var(--surface);
  }

  .contacts__details {
    display: flex;
    align-items: flex-start;
    background: var(--color-second-bg);
  }

  .user-profile {
    width: min(520px, 100%);
    padding: 1.6rem;
    display: flex;
    gap: 2rem;
    flex-direction: column;
  }

  .user-profile__header {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .user-profile__name {
    font-weight: var(--font-weight-bold);
    font-size: 1.05rem;
  }

  .user-profile__username {
    font-weight: var(--font-weight-medium);
    color: var(--color-text-muted);
    font-size: 0.85rem;
  }

  .user-profile__details {
    display: grid;
    gap: 1rem;
    font-size: 0.9rem;
  }

  .user-profile__row {
    display: flex;
    justify-content: space-between;
    color: var(--color-text);
  }

  .user-profile__error {
    color: red;
  }
</style>
