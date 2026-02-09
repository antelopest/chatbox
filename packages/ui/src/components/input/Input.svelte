<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    value = $bindable(''),
    label,
    hint,
    error,
    id,
    name,
    type = 'text',
    placeholder,
    disabled = false,
    readonly = false,
    required = false,
    autocomplete,
    inputmode,
    prefix,
    suffix,
    ...rest
  } = $props<{
    value?: string;
    label?: string;
    hint?: string;
    error?: string;
    id?: string;
    name?: string;
    type?: string;
    placeholder?: string;
    disabled?: boolean;
    readonly?: boolean;
    required?: boolean;
    autocomplete?: string;
    inputmode?:
      | 'text'
      | 'email'
      | 'tel'
      | 'url'
      | 'numeric'
      | 'decimal'
      | 'search';
    prefix?: Snippet;
    suffix?: Snippet;
  }>();

  const inputId = $derived(id ?? name);
  const hintId = $derived(inputId ? `${inputId}-hint` : undefined);
  const errorId = $derived(inputId ? `${inputId}-error` : undefined);
  const describedBy = $derived(
    [hint ? hintId : undefined, error ? errorId : undefined]
      .filter(Boolean)
      .join(' '),
  );
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
    {@render prefix?.()}
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
      {...rest}
    />
    {@render suffix?.()}
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
    font-size: 0.8rem;
    font-weight: var(--font-weight-regular, 400);
    color: var(--color-text, #64748b);
  }

  .req {
    margin-left: 0.1rem;
    color: var(--color-red, #ef4444);
  }

  .control {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0 0.8rem;
    height: 3rem;
    border-radius: 0.8rem;
    border: 1px solid var(--border, #e2e8f0);
    background: var(--surface, #fff);
    transition:
      border-color 120ms ease,
      box-shadow 120ms ease;
  }

  .control:focus-within {
    border-color: var(--color-primary, #3b82f6);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
  }

  .control.has-error {
    border-color: var(--color-red, #ef4444);
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
    color: var(--color-text-muted, #94a3b8);
    cursor: not-allowed;
  }

  .hint {
    font-size: 12px;
    color: var(--color-text-muted, #94a3b8);
  }

  .error {
    font-size: 12px;
    color: var(--color-red, #ef4444);
  }
</style>
