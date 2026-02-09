<script lang="ts">
  import type { UserResponse } from '@packages/contracts';
  import { goto } from '$app/navigation';
  import { formatDate } from '$lib/common';
  import { dialogsApi } from '$lib/features/dialogs';
  import { SearchContacts } from '$lib/features/users';

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
          <div class="user-profile__avatar">
            {(selectedUser.username ?? '?').charAt(0).toUpperCase()}
          </div>

          <div>
            <div class="user-profile__name">
              {selectedUser.profile?.displayName ?? selectedUser.username}
            </div>
            <div class="user-profile__username">
              @{selectedUser.username}
            </div>
          </div>
        </header>

        <div class="user-profile__details">
          <div class="user-profile__row">
            <span>Email</span>
            <span>{selectedUser.email}</span>
          </div>
          <div class="user-profile__row">
            <span>Created</span>
            <span>{formatDate(selectedUser.createdAt)}</span>
          </div>
        </div>

        <div class="user-profile__actions">
          <button
            class="btn btn--primary"
            disabled={creatingDialog}
            on:click={startDialog}
          >
            {creatingDialog ? 'Creating…' : 'Start chat'}
          </button>
        </div>

        {#if dialogError}
          <div class="user-profile__error">{dialogError}</div>
        {/if}
      </div>
    {:else}
      <div class="contacts__placeholder">Select a user to view details</div>
    {/if}
  </div>
</section>

<style lang="scss">
  .contacts {
    min-height: calc(100svh - 96px);
    display: grid;
    grid-template-columns: 320px 1fr;
    background: var(--color-bg);
  }

  .contacts__sidebar {
    padding: 1.5rem 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border-right: 1px solid var(--color-line);
    background: var(--surface);
  }

  .contacts__meta {
    font-size: 0.8rem;
    color: var(--color-text-muted);
  }

  .is-error {
    color: var(--color-red);
  }

  .is-loading {
    color: var(--color-primary);
  }

  .contacts__list {
    display: grid;
    gap: 0.8rem;
  }

  .contacts__user {
    display: flex;
    gap: 0.8rem;
    padding: 0.8rem 1rem;
    border: 1px solid var(--border);
    border-radius: 0.8rem;
    background: var(--surface);
    cursor: pointer;
    transition: 0.15s ease;
  }

  .contacts__user:hover {
    transform: translateY(-1px);
  }

  .contacts__user.is-active {
    border-color: var(--color-primary);
    box-shadow: 0 6px 16px rgba(59, 130, 246, 0.15);
  }

  .contacts__details {
    padding: 2rem 2.5rem;
    display: flex;
    align-items: flex-start;
  }

  .contacts__placeholder {
    color: var(--color-text-muted);
    font-size: 0.95rem;
  }

  .user-avatar,
  .user-profile__avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #cbd5f5;
    color: #1e293b;
    font-weight: 600;
  }

  .user-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }

  .user-profile__avatar {
    width: 48px;
    height: 48px;
    border-radius: 16px;
  }

  .user-profile {
    width: min(520px, 100%);
    border: 1px solid var(--border);
    border-radius: 1.2rem;
    padding: 1.6rem;
    background: var(--surface);
    box-shadow: 0 12px 30px rgba(15, 23, 42, 0.04);
  }

  .user-profile__header {
    display: flex;
    align-items: center;
    gap: 0.9rem;
    margin-bottom: 1.2rem;
  }

  .user-profile__name {
    font-weight: 600;
    font-size: 1.05rem;
  }

  .user-profile__username {
    color: var(--color-text-muted);
    font-size: 0.85rem;
  }

  .user-profile__details {
    display: grid;
    gap: 0.6rem;
    margin-bottom: 1.4rem;
    font-size: 0.9rem;
  }

  .user-profile__row {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    color: var(--color-text);
  }

  .btn {
    padding: 0.6rem 1rem;
    border-radius: 0.6rem;
    font-size: 0.85rem;
    cursor: pointer;
  }

  .btn--primary {
    background: var(--color-primary);
    color: #fff;
    border: none;
  }

  .btn--ghost {
    background: transparent;
    border: 1px solid var(--border);
    color: var(--color-text-muted);
  }
</style>
