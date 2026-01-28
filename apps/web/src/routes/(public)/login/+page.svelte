<script lang="ts">
  import { goto } from '$app/navigation';
  import { auth } from '$lib/stores';
  import { Button, Input } from '@packages/ui';

  let email = '';
  let password = '';
  let error = '';

  function submit() {
    error = '';

    if (!email || !password) {
      error = 'Email and password are required';
      return;
    }

    auth.set({
      accessToken: 'fake-access-token',
      user: {
        id: '1',
        email,
        profile: {
          displayName: 'Hello MY display name',
        },
        username: null,
      },
    });

    goto('/messages');
  }
</script>

<div class="login-page">
  <form class="card" on:submit|preventDefault={submit}>
    <h1>Sign in</h1>

    <Input bind:value={email} type="email" placeholder="Email" />

    <Input bind:value={password} type="password" placeholder="Password" />

    {#if error}
      <div class="error">{error}</div>
    {/if}

    <Button type="submit">Login</Button>
  </form>
</div>

<style lang="scss">
  .login-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bg-app);
  }

  .card {
    width: 360px;
    padding: 32px;
    border-radius: 16px;
    background: var(--bg-panel);
    display: flex;
    flex-direction: column;
    gap: 16px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  }

  h1 {
    margin: 0 0 8px;
    text-align: center;
  }

  .error {
    font-size: 13px;
    color: #ef4444;
    text-align: center;
  }
</style>
