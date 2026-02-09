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

<script lang="ts">
  import type { DialogResponse } from '@packages/contracts';
  import { formatDate } from '$lib/common';

  const { data } = $props<{
    data: { dialogs?: DialogResponse[] };
  }>();

  $effect(() => {
    console.log('dialogs data:', data?.dialogs);
  });

  type ChatPreview = {
    id: string;
    title: string;
    lastMessage: string;
    time: string;
    unread?: number;
    avatar?: string;
  };

  type ChatMessage = {
    id: string;
    author: string;
    text: string;
    time: string;
    mine?: boolean;
  };

  const chats = $derived.by(() =>
    (data?.dialogs ?? []).map<ChatPreview>((dialog) => {
      const title = dialog.title ?? 'Private chat';
      const time = formatDate(dialog.updatedAt) || '—';

      return {
        id: dialog.id,
        title,
        lastMessage: 'No messages yet',
        time,
        avatar: title.charAt(0).toUpperCase(),
      };
    }),
  );

  let selectedDialogId: string | null = null;

  const messages: ChatMessage[] = [
    {
      id: 'm1',
      author: 'Mas Happy',
      text: 'Can you share the updated mockups?',
      time: '05:00 PM',
    },
    {
      id: 'm2',
      author: 'Mas Happy',
      text: 'Need them before the client call.',
      time: '05:01 PM',
    },
    {
      id: 'm3',
      author: 'You',
      text: 'Sure. I will send the link in 10 minutes.',
      time: '05:02 PM',
      mine: true,
    },
    {
      id: 'm4',
      author: 'Mas Happy',
      text: 'Awesome, thanks!',
      time: '05:04 PM',
    },
    {
      id: 'm5',
      author: 'You',
      text: 'Here it is: figma.com/file/xyz',
      time: '05:05 PM',
      mine: true,
    },
  ];
</script>

<section class="messages-page">
  <div class="messages-shell">
    <aside class="messages-list">
      <div class="list-header">
        <div class="list-title">{data?.dialogs?.length ?? 0} dialogs</div>
        <div class="list-actions"></div>
      </div>
      <div class="chat-items">
        {#if chats.length === 0}
          <div class="empty">No dialogs found</div>
        {:else}
          {#each chats as chat}
            <button
              class="chat-card {selectedDialogId === chat.id ? 'active' : ''}"
              type="button"
              on:click={() => (selectedDialogId = chat.id)}
            >
              <div class="chat-avatar">{chat.avatar}</div>
              <div class="chat-body">
                <div class="chat-title">
                  <span>{chat.title}</span>
                  <span class="time">{chat.time}</span>
                </div>
                <div class="chat-meta">
                  <span class="chat-preview">{chat.lastMessage}</span>
                  {#if chat.unread}
                    <span class="badge">{chat.unread}</span>
                  {/if}
                </div>
              </div>
            </button>
          {/each}
        {/if}
      </div>
    </aside>

    <section class="messages-room">
      <header class="room-header">
        <div class="room-title">
          <div class="room-avatar">O</div>
          <div>
            <div class="room-name">Odama Studio</div>
            <div class="room-status">Mas Happy typing...</div>
          </div>
        </div>
        <div class="room-actions">
          <button class="icon-btn" aria-label="Search">🔍</button>
          <button class="icon-btn" aria-label="Call">📞</button>
          <button class="icon-btn" aria-label="More">⋯</button>
        </div>
      </header>

      <div class="room-body">
        <div class="day-separator">Today, Jan 30</div>
        <div class="message-list">
          {#each messages as message}
            <div class="message-row {message.mine ? 'mine' : ''}">
              <div class="message-bubble">
                <div class="message-author">{message.author}</div>
                <div class="message-text">{message.text}</div>
                <div class="message-time">{message.time}</div>
              </div>
            </div>
          {/each}
        </div>
      </div>

      <footer class="room-input">
        <input class="composer" placeholder="Type a message..." />
        <button class="send-btn">Send</button>
      </footer>
    </section>
  </div>
</section>

<style lang="scss">
  .messages-page {
  }

  .messages-shell {
    height: calc(100svh - 96px);
    display: grid;
    grid-template-columns: 400px 1fr;
  }

  .messages-list {
    background: #ffffff;
    border: 1px solid #edf0f5;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .list-header {
    padding: 1.2rem 1.2rem 0.8rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .list-title h2 {
    margin: 0;
    font-size: 1.2rem;
    font-weight: 700;
  }

  .list-subtitle {
    font-size: 0.75rem;
    color: #9aa4b2;
  }

  .list-actions {
    display: flex;
    gap: 0.4rem;
  }

  .icon-btn {
    width: 2rem;
    height: 2rem;
    border-radius: 0.6rem;
    border: 1px solid #e6eaf0;
    background: #fff;
    cursor: pointer;
  }

  .chat-items {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    padding: 0 0.8rem 1rem;
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
    border-radius: 14px;
    background: #f4b045;
    color: #1f2a37;
    font-weight: 700;
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

  .badge {
    background: #2563eb;
    color: #fff;
    border-radius: 999px;
    padding: 0.1rem 0.45rem;
    font-size: 0.7rem;
  }

  .empty {
    padding: 1rem;
    border: 1px dashed #e2e8f0;
    border-radius: 0.8rem;
    color: #94a3b8;
    font-size: 0.85rem;
  }

  .messages-room {
    background: #ffffff;
    border: 1px solid #edf0f5;
    display: grid;
    grid-template-rows: auto 1fr auto;
    overflow: hidden;
  }

  .room-header {
    padding: 1rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #f1f4f8;
  }

  .room-title {
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }

  .room-avatar {
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

  .room-name {
    font-weight: 600;
  }

  .room-status {
    font-size: 0.75rem;
    color: #94a3b8;
  }

  .room-actions {
    display: flex;
    gap: 0.4rem;
  }

  .room-body {
    padding: 1.2rem 1.5rem;
    background: #f8fafc;
    overflow: auto;
  }

  .day-separator {
    margin: 0 auto 1rem;
    width: fit-content;
    padding: 0.3rem 0.8rem;
    border-radius: 999px;
    font-size: 0.75rem;
    color: #64748b;
    background: #e2e8f0;
  }

  .message-list {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }

  .message-row {
    display: flex;
  }

  .message-row.mine {
    justify-content: flex-end;
  }

  .message-bubble {
    max-width: 60%;
    background: #fff;
    border-radius: 1rem;
    padding: 0.8rem 1rem;
    box-shadow: 0 8px 20px rgba(15, 23, 42, 0.06);
  }

  .message-row.mine .message-bubble {
    background: #2563eb;
    color: #fff;
  }

  .message-author {
    font-size: 0.75rem;
    font-weight: 600;
    margin-bottom: 0.2rem;
  }

  .message-time {
    font-size: 0.7rem;
    margin-top: 0.4rem;
    color: #94a3b8;
  }

  .message-row.mine .message-time {
    color: #cbd5f5;
  }

  .room-input {
    display: flex;
    gap: 0.6rem;
    padding: 0.8rem 1rem;
    border-top: 1px solid #f1f4f8;
  }

  .composer {
    flex: 1;
    border: 1px solid #edf0f5;
    border-radius: 0.8rem;
    padding: 0.6rem 0.8rem;
    background: #f8fafc;
  }

  .send-btn {
    background: #2563eb;
    color: #fff;
    border: none;
    padding: 0.6rem 1rem;
    border-radius: 0.8rem;
    cursor: pointer;
  }

  @media (max-width: 900px) {
    .messages-shell {
      grid-template-columns: 1fr;
      height: auto;
    }

    .messages-room {
      min-height: 60vh;
    }
  }
</style>
