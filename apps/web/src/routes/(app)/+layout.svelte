<script lang="ts">
  import { browser } from '$app/environment';
  import Sidebar from '$lib/widgets/sidebar/components/sidebar/Sidebar.svelte';
  import { setUser } from '$lib/stores';
  import type { UserProfileResponse } from '@packages/contracts';

  export let data: { user: UserProfileResponse };

  $: if (browser && data?.user) {
    setUser(data.user);
  }
</script>

<div class="app-layout">
  <aside class="app-layout__sidebar">
    <Sidebar />
  </aside>

  <main class="app-layout__content">
    <slot />
  </main>
</div>

<style lang="scss">
  .app-layout {
    min-height: 100svh;
    display: grid;
    grid-template-columns: 280px 1fr;
    background: var(--color-second-bg);
  }

  // .app-layout__sidebar {
  //   background: var(--bg-panel);
  //   border-right: 1px solid var(--border);
  // }

  // .app-layout__content {
  //   background: var(--bg-muted);
  //   padding: 24px;
  // }
</style>
