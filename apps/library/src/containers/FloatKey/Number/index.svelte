<script lang="ts">
  export let remainCount: number
  export let totalCount: number

  const showCount = remainCount ? `${remainCount}/${totalCount}` : 0
</script>

<div
  class="absolute bottom-0 right-[-6px] shadow-[0_1px_2px_0_#18427599] flex justify-center items-center min-w-[16px] h-[16px] border border-white"
  style:border-radius={remainCount ? '10px' : '50%'}
  style:background={remainCount ? 'linear-gradient(90deg, #4C9EEA 0%, #50BDFF 100%)' : '#CB0202'}
>
  <span class="text-white text-[10px] scale-[0.83]">{showCount}</span>
</div>
