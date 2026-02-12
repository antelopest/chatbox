<script lang="ts">
  import type { PrivateDialogResponse } from '@packages/contracts';
  import DialogList from '$lib/features/dialogs/components/dialog-list/DialogList.svelte';
  import ChatWidget from '$lib/features/dialogs/components/chat-widget/ChatWidget.svelte';

  const { data } = $props<{
    data: { dialogs?: PrivateDialogResponse[] };
  }>();

  let selectedDialogId = $state<string | null>(null);

  const selectedDialog = $derived.by(
    () =>
      (data?.dialogs ?? []).find((dialog) => dialog.id === selectedDialogId) ??
      null,
  );
</script>

<section class="messages">
  <DialogList
    dialogs={data?.dialogs ?? []}
    selectedId={selectedDialogId}
    onSelect={(dialogId) => (selectedDialogId = dialogId)}
  />
  <ChatWidget dialog={selectedDialog} />
</section>

<style lang="scss">
  .messages {
    height: calc(100svh - 96px);
    display: grid;
    grid-template-columns: 350px 1fr;
  }
</style>
