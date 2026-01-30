<script lang="ts">
  import { authApi } from '$lib/features/auth/api/auth.api';
  import { goto } from '$app/navigation';
  import type { FieldErrors } from '$lib/utils';
  import { RegisterUserSchema } from '@packages/validators';
  import type { RegisterUser } from '@packages/contracts';
  import { Button, Input } from '@packages/ui';
  import { setAuth } from '$lib/stores';

  type FormErrors = FieldErrors<RegisterUser>;

  let registerUserForm: RegisterUser = {
    email: '',
    password: '',
    confirmPassword: '',
  };

  let errors: FormErrors = {};
  let submitError: string | null = null;
  let loading = false;

  function validate(): boolean {
    const result = RegisterUserSchema.safeParse(registerUserForm);

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
      const response = await authApi.register(registerUserForm);
      setAuth(response);
      await goto('/profile');
    } catch (e) {
      submitError = (e as Error).message;
    } finally {
      loading = false;
    }
  }
</script>

<form class="auth-card__form" on:submit|preventDefault={onSubmit} novalidate>
  <h2 class="auth-card__form-heading">Create an Account</h2>

  <Input
    label="Email"
    type="email"
    name="email"
    error={errors.email}
    bind:value={registerUserForm.email}
  />

  <Input
    label="Password"
    type="password"
    name="password"
    bind:value={registerUserForm.password}
    error={errors.password}
  />

  <Input
    label="Confirm password"
    type="password"
    name="confirmPassword"
    bind:value={registerUserForm.confirmPassword}
    error={errors.confirmPassword}
  />

  {#if submitError}
    <p class="submit-error">{submitError}</p>
  {/if}

  <Button type="submit" disabled={loading}>
    {loading ? 'Creating account...' : 'Register'}
  </Button>
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

  // TODO сделать конструктор форм
  .submit-error {
    font-size: 0.8rem;
    color: var(--red-500, #ef4444);
  }
</style>
