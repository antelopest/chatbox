<script lang="ts">
  import { Logo } from '$lib/components';
</script>

<div class="auth-page">
  <div class="auth-card">
    <div class="auth-card__header">
      <Logo></Logo>

      <p class="auth-card__description">
        Get the best experience when sending messages, because{' '}
        <strong class="auth-card__brand">Chatbox</strong> is out of the box.
      </p>
    </div>

    <slot></slot>
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
  }
</style>
