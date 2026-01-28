<script lang="ts">
  import { authApi } from '$lib/features/auth/api/auth.api';
  import type { FieldErrors } from '$lib/utils';
  import { RegisterUserSchema } from '@packages/validators';
  import type { RegisterUser } from '@packages/contracts';

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
      await authApi.register(registerUserForm);

      // TODO:
      // - update auth.store
      // - redirect to /profile
    } catch (e) {
      submitError = (e as Error).message;
    } finally {
      loading = false;
    }
  }
</script>

<form on:submit|preventDefault={onSubmit} novalidate>
  <!-- Email -->
  <div class="field">
    <label>Email</label>
    <input
      type="email"
      bind:value={registerUserForm.email}
      class:error={errors.email}
    />
    {#if errors.email}
      <span class="error">{errors.email}</span>
    {/if}
  </div>

  <!-- Password -->
  <div class="field">
    <label>Password</label>
    <input
      type="password"
      bind:value={registerUserForm.password}
      class:error={errors.password}
    />
    {#if errors.password}
      <span class="error">{errors.password}</span>
    {/if}
  </div>

  <!-- Password -->
  <div class="field">
    <label>confirmPassword</label>
    <input
      type="password"
      bind:value={registerUserForm.confirmPassword}
      class:error={errors.confirmPassword}
    />
    {#if errors.confirmPassword}
      <span class="error">{errors.confirmPassword}</span>
    {/if}
  </div>

  {#if submitError}
    <p class="submit-error">{submitError}</p>
  {/if}

  <button type="submit" disabled={loading}>
    {loading ? 'Creating account…' : 'Register'}
  </button>
</form>

<style>
  .field {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-bottom: 12px;
  }

  input.error {
    border-color: red;
  }

  .error {
    font-size: 12px;
    color: red;
  }

  .submit-error {
    margin: 8px 0;
    color: red;
  }
</style>
