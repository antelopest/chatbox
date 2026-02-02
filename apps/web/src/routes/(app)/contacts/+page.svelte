<script>
  import { PageHeader } from '$lib/common';
</script>

<section class="contacts-page">
  <PageHeader title="Contacts"></PageHeader>

  <div class="contacts-page__main"></div>
</section>

<style lang="scss">
  .contacts-page__main {
    padding: 2rem 1.5rem;

    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .contacts-page__card {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 350px;
  }
</style>
