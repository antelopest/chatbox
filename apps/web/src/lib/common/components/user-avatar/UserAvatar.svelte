<script lang="ts">
  import { auth } from '$lib/stores';

  $: firstChar = $auth.user?.username?.charAt(0).toUpperCase();
</script>

<div class="profile">
  {firstChar}
</div>

<style lang="scss">
  .profile {
    display: flex;
    justify-content: center;
    align-items: center;

    height: 2.8rem;
    width: 2.8rem;

    background: #b5bcca;
    font-size: 1.2rem;
    font-weight: var(--font-weight-medium);
    color: var(--color-bg);

    border-radius: 50%;
  }
</style>
