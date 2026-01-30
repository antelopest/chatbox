<script lang="ts">
  import Sidebar from '$lib/widgets/sidebar/components/sidebar/Sidebar.svelte';
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
    grid-template-columns: 260px 1fr;
    background: var(--bg-app);
  }

  .app-layout__sidebar {
    background: var(--bg-panel);
    border-right: 1px solid var(--border);
  }

  .app-layout__content {
    background: var(--bg-muted);
    padding: 24px;
  }
</style>
