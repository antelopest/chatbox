<script lang="ts">
  import type { UserResponse } from '@packages/contracts';
  import { browser } from '$app/environment';
  import { ProfileCard } from '$lib/common/components';
  import { setUser } from '$lib/stores';

  const { data } = $props<{
    data: { user?: UserResponse };
  }>();

  $effect(() => {
    if (browser && data?.user) {
      setUser(data.user);
    }
  });
</script>

<section class="profile">
  <ProfileCard user={data?.user}></ProfileCard>
</section>

<style lang="scss">
  .profile {
    height: calc(100svh - 96px);
    display: grid;
    grid-template-columns: 350px;
    background: var(--color-second-bg);
  }
</style>
