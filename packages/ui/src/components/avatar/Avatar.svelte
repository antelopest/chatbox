<script lang="ts">
  const {
    label = '',
    size = 44,
    bg = '#e2e8f0',
  } = $props<{
    label?: string;
    size?: number;
    bg?: string;
  }>();

  const firstChar = $derived((label ?? '').trim().charAt(0).toUpperCase());
</script>

<div class="avatar" style="width:{size}px;height:{size}px;background:{bg}">
  {firstChar}
</div>

<style lang="scss">
  .avatar {
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    color: #1e293b;
    user-select: none;

    // background: #b5bcca;
    font-size: 1.2rem;
    font-weight: var(--font-weight-medium);
    color: var(--color-bg);
  }
</style>
