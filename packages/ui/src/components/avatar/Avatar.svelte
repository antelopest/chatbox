<script lang="ts">
  export let label: string;
  export let size: number = 44;
  export let bg: string = '#e2e8f0';
</script>

<div
  class="avatar"
  style="width:{size}px;height:{size}px;background:{bg}"
>
  {label[0]}
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
}
</style>
