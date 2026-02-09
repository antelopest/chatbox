<script lang="ts">
  import { browser } from '$app/environment';
  import { PageHeader } from '$lib/common';
  import type { AppData } from '$lib/common/types';
  import { setUser } from '$lib/stores';
  import { Sidebar } from '$lib/widgets/sidebar';
  import { page } from '$app/state';
  import { getActiveNavItem } from '$lib/widgets/sidebar';

  const { data, children } = $props<{
    data: AppData;
    children: import('svelte').Snippet;
  }>();

  const activeNav = $derived(getActiveNavItem(page.url.pathname));

  $effect(() => {
    if (browser && data?.user) {
      setUser(data.user);
    }
  });
</script>

<div class="app">
  <aside class="app__sidebar">
    <Sidebar />
  </aside>

  <main class="app__content">
    <PageHeader title={activeNav?.title ?? '...'}></PageHeader>

    {@render children()}
  </main>
</div>

<style lang="scss">
  .app {
    min-height: 100svh;
    display: grid;
    grid-template-columns: 280px 1fr;
    background: var(--color-bg);
  }
</style>
