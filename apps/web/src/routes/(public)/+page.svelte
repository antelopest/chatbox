<script lang="ts">
  import { RegisterForm } from '$lib/features/auth';
</script>

<div class="auth-card__main">
  <RegisterForm></RegisterForm>
</div>

<div class="auth-card__footer">
  <p class="auth-card__alternative">
    Already Have an Account? {` `}<a class="auth-card__sign-in" href="/login"
      >Sign in</a
    >
  </p>
</div>

<style lang="scss">
  .auth-card__main {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .auth-card__footer {
    display: flex;
    flex-direction: column;
  }

  .auth-card__alternative {
    font-size: 1rem;
    font-weight: var(--font-weight-regular);
  }

  .auth-card__sign-in {
    text-decoration: none;
    cursor: pointer;
    color: var(--color-primary);
    font-weight: var(--font-weight-medium);

    &:hover {
      color: var(--color-primary-hover);
    }
  }
</style>
