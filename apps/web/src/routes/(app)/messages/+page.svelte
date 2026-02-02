<!-- <script lang="ts">
  import ChatList from '$lib/widgets/chat/ChatList.svelte';
  import ChatRoom from '$lib/widgets/chat/ChatRoom.svelte';

  let selectedChatId: string | null = null;
</script>

<div class="messages-page">
  <section class="messages-page__list">
    <ChatList bind:selectedChatId />
  </section>

  <section class="messages-page__room">
    {#if selectedChatId}
      <ChatRoom chatId={selectedChatId} />
    {:else}
      <div class="placeholder muted">Select a chat</div>
    {/if}
  </section>
</div>

<style lang="scss">
  .messages-page {
    height: calc(100svh - 48px);
    display: grid;
    grid-template-columns: 360px 1fr;
    background: var(--bg-app);
    border-radius: 16px;
    overflow: hidden;
  }

  .messages-page__list {
    background: var(--bg-panel);
    border-right: 1px solid var(--border);
  }

  .messages-page__room {
    background: var(--bg-muted);
  }

  .placeholder {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-muted);
  }
</style> -->

<script>
  import { PageHeader } from '$lib/common';
</script>

<section class="messages-page">
  <PageHeader title="Messages"></PageHeader>

  <div class="messages-page__main"></div>
</section>

<style lang="scss">
  .messages-page__main {
    padding: 2rem 1.5rem;

    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .messages-page__card {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 350px;
  }
</style>
