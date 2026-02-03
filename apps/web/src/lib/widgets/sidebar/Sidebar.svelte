<script lang="ts">
  import { LogoApp } from '$lib/common';
  import { ProfileLogout } from '$lib/features/auth';
  import { SidebarNav } from '.';
</script>

<nav class="sidebar">
  <div class="sidebar__header">
    <LogoApp></LogoApp>
  </div>

  <div class="sidebar__main">
    <SidebarNav></SidebarNav>
  </div>

  <div class="sidebar__footer">
    <ProfileLogout></ProfileLogout>
  </div>
</nav>

<style lang="scss">
  .sidebar {
    height: 100%;
    display: flex;
    flex-direction: column;
    border-right: 1px solid var(--color-line);

    &__header {
      padding: 2rem 1.5rem;
      border-bottom: 1px solid var(--color-line);
    }

    &__main {
      padding: 2rem 1.5rem;
    }

    &__footer {
      margin-top: auto;
      padding: 2rem 1.5rem;
    }
  }
</style>
