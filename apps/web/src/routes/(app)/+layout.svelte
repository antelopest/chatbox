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

<div class="app-page">
  <aside class="app-page__sidebar">
    <Sidebar />
  </aside>

  <main class="app-page__content">
    <PageHeader title={activeNav?.title ?? '...'}></PageHeader>

    {@render children()}
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
