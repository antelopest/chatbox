<script lang="ts">
  export let value = '';
  export let label: string | undefined = undefined;
  export let hint: string | undefined = undefined;
  export let error: string | undefined = undefined;
  export let id: string | undefined = undefined;
  export let name: string | undefined = undefined;
  export let type = 'text';
  export let placeholder: string | undefined = undefined;
  export let disabled = false;
  export let readonly = false;
  export let required = false;
  export let autocomplete: string | undefined = undefined;
  export let inputmode:
    | 'text'
    | 'email'
    | 'tel'
    | 'url'
    | 'numeric'
    | 'decimal'
    | 'search'
    | undefined = undefined;

  const inputId = id ?? name;
  const hintId = inputId ? `${inputId}-hint` : undefined;
  const errorId = inputId ? `${inputId}-error` : undefined;
  const describedBy = [hint ? hintId : undefined, error ? errorId : undefined]
    .filter(Boolean)
    .join(' ');
</script>

<div class="field">
  {#if label}
    {#if inputId}
      <label class="label" for={inputId}>
        {label}
        {#if required}
          <span class="req" aria-hidden="true">*</span>
        {/if}
      </label>
    {:else}
      <!-- svelte-ignore a11y_label_has_associated_control -->
      <label class="label">
        {label}
        {#if required}
          <span class="req" aria-hidden="true">*</span>
        {/if}
      </label>
    {/if}
  {/if}

  <div class="control {error ? 'has-error' : ''}">
    <slot name="prefix" />
    <input
      class="input"
      bind:value
      {type}
      {name}
      {id}
      {placeholder}
      {disabled}
      {readonly}
      {required}
      {autocomplete}
      {inputmode}
      aria-invalid={error ? 'true' : 'false'}
      aria-describedby={describedBy || undefined}
      {...$$restProps}
    />
    <slot name="suffix" />
  </div>

  {#if hint}
    <div class="hint" id={hintId}>
      {hint}
    </div>
  {/if}
  {#if error}
    <div class="error" id={errorId}>
      {error}
    </div>
  {/if}
</div>

<style lang="scss">
  .field {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .label {
    font-size: 12px;
    font-weight: 600;
    color: var(--text-secondary, #64748b);
  }

  .req {
    margin-left: 4px;
    color: var(--red-500, #ef4444);
  }

  .control {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 12px;
    height: 44px;
    border-radius: 12px;
    border: 1px solid var(--border, #e2e8f0);
    background: var(--surface, #fff);
    transition: border-color 120ms ease, box-shadow 120ms ease;
  }

  .control:focus-within {
    border-color: var(--blue-500, #3b82f6);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
  }

  .control.has-error {
    border-color: var(--red-500, #ef4444);
  }

  .input {
    width: 100%;
    height: 100%;
    border: none;
    background: transparent;
    font-size: 14px;
    outline: none;
  }

  .input:disabled {
    color: var(--text-muted, #94a3b8);
    cursor: not-allowed;
  }

  .hint {
    font-size: 12px;
    color: var(--text-muted, #94a3b8);
  }

  .error {
    font-size: 12px;
    color: var(--red-500, #ef4444);
  }
</style>
