<script lang="ts">
  import Logo from '$lib/components/Logo/Logo.svelte';
</script>

<div class="auth-page">
  <div class="auth-card">
    <div class="auth-left">
      <Logo></Logo>

      <h1 class="auth-card__title">Welcome Back</h1>
      <p class="auth-card__subtitle">
        Enter your email and password to access your account.
      </p>

      <div class="form">
        <label>
          <span>Email</span>
          <input type="email" placeholder="sellostore@company.com" />
        </label>

        <label>
          <span>Password</span>
          <input type="password" placeholder="••••••••" />
        </label>

        <div class="form-row">
          <label class="checkbox">
            <input type="checkbox" />
            <span>Remember me</span>
          </label>

          <a href="/login" class="link">Forgot Your Password?</a>
        </div>

        <button class="primary">Log In</button>

        <div class="oauth">
          <button class="oauth-btn">Google</button>
          <button class="oauth-btn">Apple</button>
        </div>

        <p class="footer">
          Don’t Have An Account?
          <a href="/join">Register Now.</a>
        </p>
      </div>
    </div>

    <!-- RIGHT -->
    <div class="auth-right">
      <div class="promo">
        <h2>
          Get the best experience when sending messages, because Chatbox is out
          of the box
        </h2>
        <p>Log in to access your CRM dashboard and manage your team.</p>

        <div class="mock">
          <!-- сюда позже можно вставить <img /> -->
        </div>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  .auth-page {
    min-height: 100vh;
    background: #eef0f4;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .auth-card {
    width: 100%;
    max-width: 1200px;
    background: white;
    border-radius: 24px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    overflow: hidden;
    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.08);
  }

  /* LEFT */

  .auth-left {
    padding: 48px;
    display: flex;
    flex-direction: column;
  }

  .logo {
    font-weight: 700;
    font-size: 18px;
    margin-bottom: 48px;
  }

  h1 {
    margin: 0;
    font-size: 32px;
  }

  .subtitle {
    margin: 8px 0 32px;
    color: #6b7280;
    font-size: 14px;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-size: 13px;
  }

  input[type='email'],
  input[type='password'] {
    height: 44px;
    padding: 0 14px;
    border-radius: 10px;
    border: 1px solid #e5e7eb;
    font-size: 14px;
  }

  .form-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .checkbox {
    display: flex;
    gap: 8px;
    font-size: 13px;
  }

  .link {
    font-size: 13px;
    color: #4f46e5;
    text-decoration: none;
  }

  .primary {
    height: 44px;
    border-radius: 12px;
    border: none;
    background: #4f46e5;
    color: white;
    font-weight: 500;
    cursor: pointer;
  }

  .divider {
    display: flex;
    align-items: center;
    gap: 12px;
    color: #9ca3af;
    font-size: 12px;
  }

  .divider::before,
  .divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #e5e7eb;
  }

  .oauth {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  .oauth-btn {
    height: 44px;
    border-radius: 12px;
    border: 1px solid #e5e7eb;
    background: white;
    cursor: pointer;
  }

  .footer {
    margin-top: 16px;
    font-size: 13px;
    text-align: center;
  }

  /* RIGHT */

  .auth-right {
    background: linear-gradient(135deg, #4f46e5, #4338ca);
    color: white;
    padding: 48px;
    display: flex;
    align-items: center;
  }

  .promo {
    max-width: 420px;
  }

  .promo h2 {
    font-size: 28px;
    margin-bottom: 12px;
  }

  .promo p {
    font-size: 14px;
    opacity: 0.9;
  }

  .mock {
    margin-top: 32px;
    height: 260px;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 16px;
  }

  /* RESPONSIVE */

  @media (max-width: 900px) {
    .auth-card {
      grid-template-columns: 1fr;
    }

    .auth-right {
      display: none;
    }
  }
</style>
