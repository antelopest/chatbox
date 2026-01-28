<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  let value = '';
</script>

<div class="input">
  <input bind:value placeholder="Type a message" />
  <button on:click={() => dispatch('send', value)}>➤</button>
</div>

<style>
.input {
  display: flex;
  gap: 12px;
  padding: 16px;
  border-top: 1px solid var(--border);
}
</style>
