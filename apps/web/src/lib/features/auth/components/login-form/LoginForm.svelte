<script lang="ts">
  import { authApi } from '$lib/features/auth';
  import { goto } from '$app/navigation';
  import type { FieldErrors } from '$lib/common/utils';
  import { LoginUserSchema } from '@packages/validators';
  import type { AuthResponse, LoginUser } from '@packages/contracts';
  import { Button, Input } from '@packages/ui';
  import { setAuth } from '$lib/stores';

  type FormErrors = FieldErrors<LoginUser>;

  let loginUserForm: LoginUser = {
    email: '',
    password: '',
  };

  let errors: FormErrors = {};

  let submitError: string | null = null;
  let loading = false;

  function validate(): boolean {
    const result = LoginUserSchema.safeParse(loginUserForm);

    if (!result.success) {
      errors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof FormErrors;
        errors[field] = issue.message;
      }
      return false;
    }

    errors = {};
    return true;
  }

  async function onSubmit() {
    submitError = null;

    if (!validate()) return;

    try {
      loading = true;

      const authResponse: AuthResponse = await authApi.login(loginUserForm);

      const { user } = authResponse;
      setAuth(user);

      await goto('/profile');
    } catch (e) {
      submitError = (e as Error).message;
    } finally {
      loading = false;
    }
  }
</script>

<form class="auth-card__form" on:submit|preventDefault={onSubmit} novalidate>
  <h2 class="auth-card__form-heading">Welcome Back</h2>

  <p class="auth-card__form-subtitle">
    Enter your email and password to access your account.
  </p>

  <Input
    label="Email"
    type="email"
    name="email"
    error={errors.email}
    bind:value={loginUserForm.email}
  />

  <Input
    label="Password"
    type="password"
    name="password"
    bind:value={loginUserForm.password}
    error={errors.password}
  />

  {#if submitError}
    <p class="submit-error">{submitError}</p>
  {/if}

  <Button type="submit" disabled={loading}>Log In</Button>
</form>

<style lang="scss">
  .auth-card__form {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
  }

  .auth-card__form-heading {
    font-size: 1.6rem;
    font-weight: var(--font-weight-bold);
  }

  .auth-card__form-subtitle {
    color: var(--color-text-muted);
    font-size: 1rem;
    font-weight: var(--font-regular-bold);
  }

  // TODO сделать конструктор форм
  .submit-error {
    font-size: 0.8rem;
    color: var(--red-500, #ef4444);
  }
</style>
