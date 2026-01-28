<script lang="ts">
  export let selectedChatId: string | null = null;

  const chats = [
    {
      id: '1',
      name: 'Odama Studio',
      message: 'Typing...',
      time: '05:11',
      unread: 2,
    },
    {
      id: '2',
      name: 'Hatypo Studio',
      message: 'Lahh gas!',
      time: '04:01',
      unread: 0,
    },
  ];
</script>

<div class="chat-list">
  <h3>Messages</h3>

  {#each chats as chat}
    <button
      type="button"
      class="item"
      class:selected={chat.id === selectedChatId}
      on:click={() => (selectedChatId = chat.id)}
    >
      <div class="avatar">{chat.name[0]}</div>

      <div class="content">
        <div class="top">
          <span>{chat.name}</span>
          <span>{chat.time}</span>
        </div>

        <div class="bottom">
          <span>{chat.message}</span>
          {#if chat.unread}
            <span class="badge">{chat.unread}</span>
          {/if}
        </div>
      </div>
    </button>
  {/each}
</div>

<style lang="scss">
  .chat-list {
    padding: 16px;
  }

  .item {
    all: unset;
    display: flex;
    gap: 12px;
    padding: 12px;
    border-radius: 12px;
    cursor: pointer;
    width: 100%;

    &:hover {
      background: var(--bg-muted);
    }

    &.selected {
      background: var(--bg-muted);
    }
  }

  .avatar {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: #e2e8f0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .badge {
    background: #ef4444;
    color: white;
    border-radius: 999px;
    padding: 2px 8px;
    font-size: 12px;
  }
</style>
