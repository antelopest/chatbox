<script lang="ts">
  import '$lib/common/styles/global.scss';

  const { children } = $props<{ children: import('svelte').Snippet }>();
</script>

{@render children()}
