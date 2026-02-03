<script lang="ts">
  import IconBase from '../IconBase.svelte';

  const { size = 24, className = '' } = $props<{
    size?: number;
    className?: string;
  }>();
</script>

<IconBase {size} {className}>
  <path
    d="M21 5L2 12.5L9 13.5M21 5L18.5 20L9 13.5M21 5L9 13.5M9 13.5V19L12.2488 15.7229"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
  ></path>
</IconBase>
