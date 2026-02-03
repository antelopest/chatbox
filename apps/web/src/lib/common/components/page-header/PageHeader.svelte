<script lang="ts">
  const { title = '' } = $props<{ title?: string }>();
</script>

<div class="header">
  <div class="header__title">{title}</div>
</div>

<style lang="scss">
  .header {
    padding: 2rem 1.5rem;

    border-bottom: 1px solid var(--color-line);

    &__title {
      font-size: 1.4rem;
      font-weight: var(--font-weight-bold);
      color: var(--color-primary);
    }
  }
</style>
