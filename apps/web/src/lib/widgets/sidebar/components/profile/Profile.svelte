<script lang="ts">
</script>

<div class="profile">
  <div class="avatar">F</div>
  <span>Antelopest</span>
  <button type="button">Logout</button>
</div>

<style lang="scss">
  .profile {
    display: flex;
    gap: 0.5rem;
    border-top: 1px solid var(--border);
  }

  .avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: var(--bg-muted);
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
