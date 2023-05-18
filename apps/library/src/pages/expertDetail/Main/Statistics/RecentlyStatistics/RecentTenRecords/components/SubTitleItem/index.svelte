<script lang="ts">
  export let title: string = ''

  export let color: string = ''
</script>

<div class="flex items-center justify-between space-x-1">
  {#if color}
    <div class="w-2 h-2 rounded-sm" style:background-color="{color}"></div>
  {/if}

  {#if title}
    <span class="text-[10px] leading-[15px] text-[#666]">{title}</span>
  {/if}
</div>