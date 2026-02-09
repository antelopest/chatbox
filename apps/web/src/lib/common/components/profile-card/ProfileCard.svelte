<script lang="ts">
  import type { UserResponse } from '@packages/contracts';
  import { Input } from '@packages/ui';
  import { formatDate, UserAvatar } from '$lib/common';

  let { user } = $props<{
    user?: UserResponse;
  }>();

  const username = $derived(user?.username ?? '');
  const email = $derived(user?.email ?? '');
  const createdAt = $derived(formatDate(user?.createdAt) ?? '');
</script>

<div class="card">
  <UserAvatar></UserAvatar>

  <div class="fields">
    <Input label="Username" readonly value={username}></Input>
    <Input label="Email" readonly value={email}></Input>
    <Input label="Created" readonly value={createdAt}></Input>
  </div>
</div>

<style lang="scss">
  .card {
    padding: 2rem 1.5rem;

    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .fields {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
