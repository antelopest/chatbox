<script lang="ts">
  import { ChatBubbleIcon } from '@packages/ui';
</script>

<div class="logo">
  <ChatBubbleIcon></ChatBubbleIcon>
  <h3 class="logo__title">Chatbox</h3>
</div>

<style lang="scss">
  .logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &__title {
      font-size: 1.4rem;
      font-weight: var(--font-weight-bold);
    }
  }
</style>
