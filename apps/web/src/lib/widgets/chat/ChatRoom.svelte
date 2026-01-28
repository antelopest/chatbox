<script lang="ts">
  import ChatHeader from './ChatHeader.svelte';
  import MessageBubble from './MessageBubble.svelte';
  import MessageInput from './MessageInput.svelte';

  // export let chatId: string;

  let messages = [
    { id: '1', text: 'Hello!', mine: false, time: '05:00' },
    { id: '2', text: 'Hi!', mine: true, time: '05:01' },
  ];

  function send(text: string) {
    messages = [
      ...messages,
      { id: crypto.randomUUID(), text, mine: true, time: 'now' },
    ];
  }
</script>

<div class="room">
  <ChatHeader />
  <div class="messages">
    {#each messages as m}
      <MessageBubble message={m} isMine={m.mine} />
    {/each}
  </div>
  <MessageInput on:send={(e) => send(e.detail)} />
</div>

<style lang="scss">
  .room {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .messages {
    flex: 1;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    overflow-y: auto;
  }
</style>
