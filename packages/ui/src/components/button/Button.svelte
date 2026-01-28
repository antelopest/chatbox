<script lang="ts">
  export let variant: 'primary' | 'ghost' = 'primary';
  export let disabled = false;
</script>

<button
  class="btn {variant}"
  {disabled}
>
  <slot />
</button>

<style lang="scss">
.btn {
  height: 44px;
  padding: 0 16px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: background 0.15s ease;

  &.primary {
    background: var(--blue-500);
    color: white;

    &:hover:not(:disabled) {
      background: #1d4ed8;
    }
  }

  &.ghost {
    background: transparent;
    color: var(--text-primary);

    &:hover:not(:disabled) {
      background: var(--bg-muted);
    }
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}
</style>
