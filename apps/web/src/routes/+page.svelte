<script lang="ts">
  import { ChatBubbleIcon, Input } from '@packages/ui';

  let form = {
    email: '',
    password: '',
  };

  let errors = {
    password: '',
  };

  import { RegisterForm } from '$lib/features/auth';
</script>

<div class="auth-page">
  <div class="auth-card">
    <RegisterForm></RegisterForm>

    <Input
      label="Email"
      type="email"
      name="email"
      bind:value={form.email}
      hint="Мы не передаём почту третьим лицам"
    />

    <Input
      label="Password"
      type="password"
      name="password"
      bind:value={form.password}
      error={errors.password}
    />

    <div class="auth-card__header">
      <div class="auth-card__logo">
        <ChatBubbleIcon></ChatBubbleIcon>
        <h3 class="auth-card__logo-title">Chatbox</h3>
      </div>

      <p class="auth-card__description">
        Get the best experience when sending messages, because{' '}
        <strong class="auth-card__brand">Chatbox</strong> is out of the box.
      </p>
    </div>

    <div class="auth-card__main">
      <form class="auth-card__form">
        <h2 class="auth-card__form-heading">Create an Account</h2>

        <div class="auth-card__form-group">
          <label class="auth-card__form-label" for="email">Email</label>
          <input
            class="auth-card__form-input"
            id="email"
            type="email"
            placeholder="username@wisebits.com"
          />
        </div>

        <div class="auth-card__form-group">
          <label class="auth-card__form-label" for="password">Password</label>
          <input
            id="password"
            class="auth-card__form-input"
            type="password"
            placeholder="••••••••"
          />
        </div>

        <div class="auth-card__form-group">
          <label class="auth-card__form-label" for="confirmPassword">
            Confirm password
          </label>
          <input
            id="confirmPassword"
            class="auth-card__form-input"
            type="password"
            placeholder="••••••••"
          />
        </div>

        <button class="primary">Register</button>
      </form>
    </div>

    <div class="auth-card__footer">
      <p class="auth-card__alternative">
        Already Have an Account? <a class="auth-card__sign-in" href="/login"
          >Sign in</a
        >
      </p>
    </div>
  </div>
</div>

<style lang="scss">
  .auth-page {
    width: 100%;
    min-height: 100svh;
    background: var(--color-second-bg);
    display: grid;
    place-items: center;
    padding: 1.5rem;
  }

  .auth-card {
    width: 100%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }

  .auth-card__header {
    display: flex;
    gap: 3rem;
    flex-direction: column;
  }

  .auth-card__description {
    font-size: 1.2rem;
    font-weight: var(--font-weight-regular);
  }

  .auth-card__brand {
    font-size: 1.2rem;
    font-weight: var(--font-weight-medium);
    color: var(--color-primary);
  }

  .auth-card__logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &-title {
      font-size: 1.4rem;
      font-weight: var(--font-weight-bold);
    }
  }

  .auth-card__main {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .auth-card__form {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
  }

  .auth-card__form-heading {
    font-size: 1.6rem;
    font-weight: var(--font-weight-bold);
  }

  .auth-card__form-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .auth-card__form-label {
    font-size: 0.8rem;
  }

  .auth-card__form-input[type='email'],
  .auth-card__form-input[type='password'] {
    height: 3rem;
    padding: 0 0.8rem;
    border-radius: 0.8rem;
    border: 1px solid #e5e7eb;
    font-size: 0.95rem;
  }

  .primary {
    padding: 0.8rem;
    border-radius: 1rem;
    font-size: 1rem;
    border: none;
    background: var(--color-primary);
    color: var(--color-bg);
    letter-spacing: 0.6px;
    font-weight: var(--font-weight-medium);
    cursor: pointer;

    transition:
      background-color 0.2s ease,
      transform 0.15s ease,
      box-shadow 0.15s ease;
  }

  .primary:hover {
    background-color: var(--color-primary-hover);
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  }

  .primary:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 3px;
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
  }

  @media (min-width: 480px) {
  }

  @media (min-width: 768px) {
  }

  @media (min-width: 1024px) {
  }

  @media (min-width: 1280px) {
  }

  @media (min-width: 1536px) {
  }

  @media (hover: hover) {
    .primary:hover {
      background-color: var(--color-primary-hover);
      transform: translateY(-1px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
    }
  }
</style>
