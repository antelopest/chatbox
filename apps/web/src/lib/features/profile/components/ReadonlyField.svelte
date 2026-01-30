<script lang="ts">
  export let label: string;
  export let value: string | null | undefined;
</script>

<div class="field">
  <label class="field__label">{label}</label>
  <input class="field__input" readonly value={value ?? ''} />
</div>

<style lang="scss">
  .field {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .field__label {
    font-size: 12px;
    font-weight: 600;
    color: var(--text-muted);
  }

  .field__input {
    height: 44px;
    padding: 0 14px;
    border-radius: 12px;
    border: 1px solid var(--border);
    background: var(--bg-panel);
    font-size: 14px;
    color: var(--text-primary);
  }
</style>
