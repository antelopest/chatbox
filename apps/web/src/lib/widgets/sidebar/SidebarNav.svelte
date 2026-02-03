<script lang="ts">
  import { page } from '$app/state';

  import { sidebarItems, type NavItem } from '.';

  const items = sidebarItems;

  const isActive = (item: NavItem) => {
    const pathname = page.url.pathname;

    return pathname === item.href || pathname.startsWith(item.href + '/');
  };
</script>

<ul class="nav">
  {#each items as item (item.href)}
    <li class="nav__item">
      <a
        class="nav__link"
        href={item.href}
        aria-current={isActive(item) ? 'page' : undefined}
        class:active={isActive(item)}
      >
        {#if item.icon}
          <span class="nav__icon">
            <svelte:component this={item.icon} size={24} />
          </span>
        {/if}
        {item.title}
      </a>
    </li>
  {/each}
</ul>

<style lang="scss">
  .nav {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.5rem;

    &__icon {
      display: flex;
      color: var(--color-text-muted);
    }

    &__link {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 1.5rem;
      padding: 1rem 1rem;
      border-radius: 1.2rem;
      text-decoration: none;
      font-weight: var(--font-weight-regular, 400);
      font-size: var(--font-size, 16px);
      color: var(--color-text);

      &:hover {
        background: var(--color-primary-hover);
        color: var(--color-bg);
      }

      &.active {
        background: var(--color-primary);
        color: var(--color-bg);
      }
    }

    &__link.active &__icon {
      color: var(--color-bg);
    }

    &__link:hover &__icon {
      color: var(--color-bg);
    }
  }
</style>
