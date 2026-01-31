<script lang="ts">
  import { Avatar } from '$lib/components';
  import { Input } from '@packages/ui';

  import { auth } from '$lib/stores';
  import { formatDate } from '$lib/utils';
  import { PageHeader } from '$lib/components';

  let username = $auth.user?.username ?? '';
  let email = $auth.user?.email ?? '';
  let createdAt = formatDate($auth.user?.createdAt) ?? '';
</script>

<section class="profile-page">
  <PageHeader title="Profile"></PageHeader>

  <div class="profile-page__main">
    <Avatar></Avatar>

    <div class="profile-page__card">
      <Input label="Username" readonly bind:value={username}></Input>
      <Input label="Email" readonly bind:value={email}></Input>
      <Input label="Created" readonly bind:value={createdAt}></Input>
    </div>
  </div>
</section>

<style lang="scss">
  .profile-page__main {
    padding: 2rem 1.5rem;

    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .profile-page__card {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 350px;
  }
</style>
