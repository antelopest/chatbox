<script lang="ts">
  import { browser } from '$app/environment';
  import type { AppData } from '$lib/common/types';
  import { setUser } from '$lib/stores';

  import { Sidebar } from '$lib/widgets/sidebar';

  export let data: AppData;

  $: if (browser && data?.user) {
    setUser(data.user);
  }
</script>

<div class="app-page">
  <aside class="app-page__sidebar">
    <Sidebar />
  </aside>

  <main class="app-page__content">
    <slot />
  </main>
</div>

<style lang="scss">
  .app-page {
    min-height: 100svh;
    display: grid;
    grid-template-columns: 280px 1fr;
    background: var(--color-second-bg);
  }
</style>
