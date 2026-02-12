<script lang="ts">
  import type { PrivateDialogResponse } from '@packages/contracts';
  import { formatDate } from '$lib/common';
  import { Avatar } from '@packages/ui';

  const {
    dialogs = [],
    selectedId = null,
    onSelect,
  } = $props<{
    dialogs?: PrivateDialogResponse[];
    selectedId?: string | null;
    onSelect?: (dialogId: string) => void;
  }>();
</script>

<aside class="messages-list">
  <div class="list-header">
    <div class="list-title">{dialogs.length} dialogs</div>
    <div class="list-actions"></div>
  </div>
  <div class="chat-items">
    {#if dialogs.length === 0}
      <div class="empty">No dialogs found</div>
    {:else}
      {#each dialogs as dialog}
        <button
          class="chat-card {selectedId === dialog.id ? 'active' : ''}"
          type="button"
          onclick={() => onSelect?.(dialog.id)}
        >
          <div class="chat-avatar">
            <Avatar label={dialog.participant.username} size={44} />
          </div>
          <div class="chat-body">
            <div class="chat-title">
              <span>{dialog.participant.username}</span>
              <span class="time">
                {dialog.lastMessage?.createdAt
                  ? formatDate(dialog.lastMessage.createdAt)
                  : ''}
              </span>
            </div>
            <div class="chat-meta">
              <span class="chat-preview">
                {dialog.lastMessage?.text ?? 'No messages yet'}
              </span>
            </div>
          </div>
        </button>
      {/each}
    {/if}
  </div>
</aside>

<style lang="scss">
  .messages-list {
    padding: 2rem 1.5rem;
    background: #ffffff;
    border-right: 1px solid var(--color-line);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    gap: 1rem;
  }

  .list-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .list-actions {
    display: flex;
    gap: 0.4rem;
  }

  .chat-items {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    overflow: auto;
  }

  .chat-card {
    display: grid;
    grid-template-columns: 44px 1fr;
    gap: 0.8rem;
    padding: 0.7rem;
    border-radius: 0.9rem;
    border: 1px solid transparent;
    background: #fff;
    cursor: pointer;
    text-align: left;
  }

  .chat-card:hover {
    border-color: #e6eaf0;
    background: #f8fafc;
  }

  .chat-card.active {
    border-color: #cbd5f5;
    background: #eff6ff;
  }

  .chat-avatar {
    height: 44px;
    width: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .chat-body {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }

  .chat-title {
    display: flex;
    justify-content: space-between;
    font-size: 0.9rem;
    font-weight: 600;
  }

  .chat-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.75rem;
    color: #94a3b8;
  }

  .empty {
    padding: 1rem;
    border: 1px dashed #e2e8f0;
    border-radius: 0.8rem;
    color: #94a3b8;
    font-size: 0.85rem;
  }
</style>
