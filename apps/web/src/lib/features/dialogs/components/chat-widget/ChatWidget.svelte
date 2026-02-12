<script lang="ts">
  import type { PrivateDialogResponse } from '@packages/contracts';

  const { dialog = null } = $props<{
    dialog?: PrivateDialogResponse | null;
  }>();

  const username = $derived(dialog?.participant.username ?? '');
  const avatar = $derived(
    (dialog?.participant.username ?? '').trim().charAt(0).toUpperCase() || '?',
  );
</script>

<section class="chat-widget">
  {#if dialog}
    <header class="chat-widget__header">
      <div class="chat-widget__avatar">{avatar}</div>
      <div class="chat-widget__title">
        <div class="chat-widget__name">{username}</div>
        <div class="chat-widget__subtitle">Private chat</div>
      </div>
    </header>

    <div class="chat-widget__body">
      <div class="chat-widget__placeholder">Messages will appear here.</div>
    </div>

    <footer class="chat-widget__input">
      <input class="chat-widget__composer" placeholder="Type a message..." />
      <button class="chat-widget__send" type="button">Send</button>
    </footer>
  {:else}
    <div class="chat-widget__empty">Select a dialog</div>
  {/if}
</section>

<style lang="scss">
  .chat-widget {
    background: var(--color-bg);
    display: grid;
    grid-template-rows: auto 1fr auto;
    min-height: 60vh;
  }

  .chat-widget__empty {
    grid-row: 1 / -1;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #94a3b8;
    font-size: 0.95rem;
  }

  .chat-widget__header {
    padding: 1rem 1.25rem;
    display: flex;
    align-items: center;
    gap: 0.8rem;
    border-bottom: 1px solid #f1f4f8;
  }

  .chat-widget__avatar {
    height: 42px;
    width: 42px;
    border-radius: 14px;
    background: #f97316;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
  }

  .chat-widget__name {
    font-weight: 600;
  }

  .chat-widget__subtitle {
    font-size: 0.75rem;
    color: #94a3b8;
  }

  .chat-widget__body {
    padding: 1.2rem 1.5rem;
    background: #f8fafc;
    overflow: auto;
  }

  .chat-widget__placeholder {
    color: #94a3b8;
    font-size: 0.9rem;
  }

  .chat-widget__input {
    display: flex;
    gap: 0.6rem;
    padding: 0.8rem 1rem;
    border-top: 1px solid #f1f4f8;
  }

  .chat-widget__composer {
    flex: 1;
    border: 1px solid #edf0f5;
    border-radius: 0.8rem;
    padding: 0.6rem 0.8rem;
    background: #f8fafc;
  }

  .chat-widget__send {
    background: #2563eb;
    color: #fff;
    border: none;
    padding: 0.6rem 1rem;
    border-radius: 0.8rem;
    cursor: pointer;
  }
</style>
