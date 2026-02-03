<script lang="ts">
  const { message, isMine = false } = $props<{
    message: { text: string };
    isMine?: boolean;
  }>();
</script>

<div class="bubble" class:mine={isMine}>
  {message.text}
</div>

<style>
.bubble {
  max-width: 60%;
  padding: 12px 16px;
  border-radius: 16px;
  background: white;
}
.mine {
  background: var(--blue-500);
  color: white;
  align-self: flex-end;
}
</style>
