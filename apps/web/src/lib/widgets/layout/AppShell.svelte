<script lang="ts">
  import Sidebar from './Sidebar.svelte';
  import ChatList from '../chat/ChatList.svelte';
  import ChatRoom from '../chat/ChatRoom.svelte';

  let selectedChatId: string | null = null;
</script>

<div class="app-shell">
  <aside class="sidebar">
    <Sidebar />
  </aside>

  <main class="main">
    <section class="chat-list">
      <ChatList bind:selectedChatId />
    </section>

    <section class="chat-room">
      {#if selectedChatId}
        <ChatRoom chatId={selectedChatId} />
      {:else}
        <div class="placeholder muted">Select a chat</div>
      {/if}
    </section>
  </main>
</div>

<style lang="scss">
.app-shell {
  height: 100vh;
  display: grid;
  grid-template-columns: 280px 1fr;
  background: var(--bg-app);
}

.sidebar {
  background: var(--bg-panel);
  border-right: 1px solid var(--border);
}

.main {
  display: grid;
  grid-template-columns: 360px 1fr;
}

.chat-list {
  border-right: 1px solid var(--border);
  background: var(--bg-panel);
}

.chat-room {
  background: var(--bg-muted);
}

.placeholder {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
}
</style>
