<!-- packages/ui/src/icons/IconBase.svelte -->
<script lang="ts">
  export let size = 32;
</script>

<svg
  width={size}
  height={size}
  fill="transparent"
  viewBox="0 0 24 24"
  aria-hidden="true"
>
  <slot />
</svg>
