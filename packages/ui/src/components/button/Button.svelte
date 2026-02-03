<script lang="ts">
  import type { Snippet } from 'svelte';

  const { type = 'button', disabled = false, children, ...rest } = $props<{
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    children?: Snippet;
  }>();
</script>

<button class="primary" {type} {disabled} {...rest}>
  {@render children?.()}
</button>

<style lang="scss">
  .primary {
    padding: 0.8rem;
    border-radius: 1rem;
    font-size: 1rem;
    border: none;
    background: var(--color-primary, #2563eb);
    color: var(--color-bg, #ffffff);
    letter-spacing: 0.6px;
    font-weight: var(--font-weight-medium, 500);
    cursor: pointer;

    transition:
      background-color 0.2s ease,
      transform 0.15s ease,
      box-shadow 0.15s ease;
  }

  .primary:hover:not(:disabled) {
    background-color: var(--color-primary-hover, #1d4ed8);
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  }

  .primary:focus-visible {
    outline: 2px solid var(--color-primary, #2563eb);
    outline-offset: 3px;
  }

  .primary:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
</style>
