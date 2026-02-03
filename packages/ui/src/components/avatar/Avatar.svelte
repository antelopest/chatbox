<script lang="ts">
  const { label = '', size = 44, bg = '#e2e8f0' } = $props<{
    label?: string;
    size?: number;
    bg?: string;
  }>();
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
