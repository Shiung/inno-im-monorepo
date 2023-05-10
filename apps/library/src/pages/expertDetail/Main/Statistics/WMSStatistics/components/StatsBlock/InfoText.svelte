<script lang="ts">
  export let data: string
  export let type: string
</script>

<div class="flex flex-col items-center">
  <span class="text-[#333] text-[20px] leading-[24px] font-semibold">{data}</span>
  <span class="text-[#333] text-[10px] leading-[15px]">{type}</span>
</div>