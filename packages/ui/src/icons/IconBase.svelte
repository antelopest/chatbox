<script lang="ts">
  import type { Snippet } from 'svelte';

  const { size = 32, className = '', children, ...rest } = $props<{
    size?: number;
    className?: string;
    children?: Snippet;
  }>();
</script>

<svg
  class={className}
  width={size}
  height={size}
  fill="transparent"
  viewBox="0 0 24 24"
  aria-hidden="true"
  {...rest}
>
  {@render children?.()}
</svg>
