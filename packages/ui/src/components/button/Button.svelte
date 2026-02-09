<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';
  const {
    type = 'button',
    disabled = false,
    variant = 'primary',
    size = 'md',
    children,
    ...rest
  } = $props<
    {
      type?: 'button' | 'submit' | 'reset';
      disabled?: boolean;
      variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
      size?: 'sm' | 'md' | 'lg';
      children?: Snippet;
    } & Omit<HTMLButtonAttributes, 'size'>
  >();

  const sizeClasses: Record<'sm' | 'md' | 'lg', string> = {
    sm: 'size-sm',
    md: 'size-md',
    lg: 'size-lg',
  };
  const sizeClass = $derived(
    sizeClasses[size as keyof typeof sizeClasses],
  );

  const variantClasses: Record<
    'primary' | 'secondary' | 'ghost' | 'danger',
    string
  > = {
    primary: 'variant-primary',
    secondary: 'variant-secondary',
    ghost: 'variant-ghost',
    danger: 'variant-danger',
  };
  
  const variantClass = $derived(
    variantClasses[variant as keyof typeof variantClasses],
  );
</script>

<button
  class={`btn ${variantClass} ${sizeClass}`}
  {type}
  {disabled}
  {...rest}
>
  {@render children?.()}
</button>

<style lang="scss">
  .btn {
    border-radius: 1rem;
    border: none;
    letter-spacing: 0.6px;
    font-weight: var(--font-weight-medium, 500);
    cursor: pointer;

    transition:
      background-color 0.2s ease,
      color 0.2s ease,
      transform 0.15s ease,
      box-shadow 0.15s ease;
  }

  .btn:focus-visible {
    outline: 2px solid var(--color-primary, #2563eb);
    outline-offset: 3px;
  }

  .btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .size-sm {
    padding: 0.45rem 0.8rem;
    font-size: 0.85rem;
    border-radius: 0.7rem;
  }

  .size-md {
    padding: 0.8rem 1rem;
    font-size: 1rem;
  }

  .size-lg {
    padding: 1rem 1.25rem;
    font-size: 1.1rem;
    border-radius: 1.1rem;
  }

  .variant-primary {
    background: var(--color-primary, #2563eb);
    color: var(--color-bg, #ffffff);
  }

  .variant-primary:hover:not(:disabled) {
    background-color: var(--color-primary-hover, #1d4ed8);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  }

  .variant-secondary {
    background: var(--surface, #f1f5f9);
    color: var(--color-text, #0f172a);
    border: 1px solid var(--border, #e2e8f0);
  }

  .variant-secondary:hover:not(:disabled) {
    box-shadow: 0 6px 16px rgba(15, 23, 42, 0.08);
  }

  .variant-ghost {
    background: transparent;
    color: var(--color-text, #0f172a);
  }

  .variant-ghost:hover:not(:disabled) {
    background: rgba(15, 23, 42, 0.06);
  }

  .variant-danger {
    background: var(--color-red, #ef4444);
    color: var(--color-bg, #ffffff);
  }

  .variant-danger:hover:not(:disabled) {
    background: #dc2626;
    box-shadow: 0 6px 16px rgba(239, 68, 68, 0.25);
  }
</style>
