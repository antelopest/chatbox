<script lang="ts">
  import type { UserResponse } from '@packages/contracts';
  import { Avatar, SearchInput } from '@packages/ui';
  import { useUserSearch } from '$lib/features/users/components/search-contacts';

  let { selectedUser = $bindable<UserResponse | undefined>() } = $props<{
    selectedUser?: UserResponse;
  }>();

  const MIN_QUERY_LENGTH = 3;

  let query = $state('');
  let debouncedQuery = $state('');

  const {
    results: resultsStore,
    state: stateStore,
    error: errorStore,
    search,
    reset,
  } = useUserSearch();

  const normalizedQuery = $derived.by(() => debouncedQuery.trim());
  const isQueryValid = $derived.by(
    () => normalizedQuery.length >= MIN_QUERY_LENGTH,
  );

  $effect(() => {
    if (isQueryValid) {
      void search(normalizedQuery);
    } else {
      reset();
    }
  });

  function selectUser(user: UserResponse): void {
    selectedUser = user;
  }

  function clear(): void {
    query = '';
    selectedUser = undefined;
    reset();
  }
</script>

<div class="contacts-search">
  <SearchInput
    name="search"
    placeholder="Search users..."
    bind:value={query}
    bind:debouncedValue={debouncedQuery}
    debounceMs={300}
  />

  <div class="contacts-search__meta">
    {#if $stateStore === 'loading'}
      <span class="is-loading">Searching…</span>
    {:else if $stateStore === 'error'}
      <span class="is-error">{$errorStore}</span>
    {:else if isQueryValid}
      <span>{$resultsStore.length} result(s)</span>
    {/if}
  </div>

  <div class="contacts-search__list">
    {#if $resultsStore.length === 0 && isQueryValid && $stateStore === 'success'}
      <div class="contacts-search__empty">No users found</div>
    {:else}
      {#each $resultsStore as user}
        <button
          type="button"
          class="contacts-search__item {selectedUser?.id === user.id
            ? 'is-active'
            : ''}"
          onclick={() => selectUser(user)}
        >
          <Avatar label={user.username}></Avatar>

          <div class="user-info">
            <div class="user-info__name">
              {user.username}
            </div>
            <div class="user-info__username">@{user.username}</div>
          </div>
        </button>
      {/each}
    {/if}
  </div>

  {#if selectedUser}
    <button class="contacts-search__clear" onclick={clear}>
      Clear selection
    </button>
  {/if}
</div>

<style lang="scss">
  .contacts-search {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }

  .contacts-search__meta {
    font-size: 0.75rem;
    color: var(--color-text-muted);
    min-height: 1.1rem;
  }

  .contacts-search__list {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    max-height: calc(100svh - 260px);
    overflow: auto;
    padding-right: 0.2rem;
  }

  .contacts-search__item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.6rem 0.7rem;
    border-radius: 0.9rem;
    border: 1px solid transparent;
    background: transparent;
    text-align: left;
    cursor: pointer;
    transition:
      border-color 120ms ease,
      background 120ms ease;
  }

  .contacts-search__item:hover {
    background: rgba(59, 130, 246, 0.08);
  }

  .contacts-search__item.is-active {
    border-color: rgba(59, 130, 246, 0.35);
    background: rgba(59, 130, 246, 0.12);
  }

  .contacts-search__empty {
    padding: 0.8rem;
    border: 1px dashed var(--border);
    border-radius: 0.8rem;
    color: var(--color-text-muted);
    font-size: 0.85rem;
  }

  .contacts-search__clear {
    align-self: flex-start;
    background: transparent;
    border: 1px solid var(--border);
    color: var(--color-text-muted);
    padding: 0.4rem 0.7rem;
    border-radius: 0.6rem;
    font-size: 0.8rem;
    cursor: pointer;
  }

  .contacts-search__clear:hover {
    border-color: var(--color-primary);
    color: var(--color-primary);
  }

  .user-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #cbd5f5;
    color: #1e293b;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 0.85rem;
  }

  .user-info {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
  }

  .user-info__name {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--color-text);
  }

  .user-info__username {
    font-size: 0.75rem;
    color: var(--color-text-muted);
  }

  .is-loading {
    color: var(--color-primary);
  }

  .is-error {
    color: var(--color-red);
  }
</style>
