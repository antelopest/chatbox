<script lang="ts">
  import { page } from '$app/stores';
  import { Logo } from '$lib/components';
  import { ProfileCircleIcon } from '@packages/ui';
  import Profile from '../profile/Profile.svelte';

  const items = [
    { label: 'Profile', href: '/profile' },
    { label: 'Contacts', href: '/contacts' },
    { label: 'Messages', href: '/messages' },
    { label: 'Stories', href: '/stories' },
  ];

  $: pathname = $page.url.pathname;
</script>

<nav class="sidebar">
  <div class="sidebar__header">
    <Logo></Logo>
  </div>

  <div class="sidebar__main">
    <ul class="nav">
      {#each items as item}
        <li class="nav__item">
          <a class:active={pathname === item.href} href={item.href}>
            {item.label}
          </a>
        </li>
      {/each}
    </ul>
  </div>

  <div class="sidebar__footer">
    <Profile></Profile>
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
      border-top: 1px solid var(--color-line);
    }
  }

  .nav {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.5rem;

    &__item a {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 0.8rem;
      padding: 1rem 1.5rem;
      border-radius: 1.4rem;
      text-decoration: none;
      font-weight: var(--font-weight-regular, 400);
      font-size: var(--font-size, 16px);
      color: var(--color-text);
    }
  }

  a:hover {
    background: var(--color-primary-hover);
    color: var(--color-bg);
  }

  a.active {
    background: var(--color-primary);
    color: var(--color-bg);
  }
</style>
