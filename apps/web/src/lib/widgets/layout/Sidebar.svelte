<script lang="ts">
  const items = [
    'Dashboard',
    'Analytics',
    'Files',
    'Call',
    'Messages',
    'Community',
    'Settings',
  ];

  let active = 'Messages';
</script>

<nav class="sidebar">
  <div class="logo">💬 Chatbox</div>

  <ul>
    {#each items as item}
      <li>
        <button
          type="button"
          class:active={item === active}
          on:click={() => (active = item)}
        >
          {item}
        </button>
      </li>
    {/each}
  </ul>

  <div class="user">
    <div class="avatar">F</div>
    <span>Fazaaa</span>
  </div>
</nav>

<style lang="scss">
  .sidebar {
    padding: 24px;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .logo {
    font-weight: 600;
    margin-bottom: 32px;
  }

  ul {
    list-style: none;
    padding: 0;
    flex: 1;
  }

  li {
    padding: 10px 14px;
    border-radius: 10px;
    cursor: pointer;
    margin-bottom: 8px;
    color: var(--text-muted);

    // &.active {
    //   background: var(--blue-500);
    //   color: white;
    // }
  }

  button.active {
    background: var(--blue-500);
    color: white;
  }

  .user {
    display: flex;
    gap: 12px;
    padding-top: 16px;
    border-top: 1px solid var(--border);
  }

  .avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: var(--bg-muted);
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
