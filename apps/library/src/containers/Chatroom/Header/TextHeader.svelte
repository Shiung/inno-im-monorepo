<script lang='ts'>
  import { t } from '$stores'

  export let dom
</script>

<div
  bind:this={dom}
  class="flex justify-center items-center w-full min-h-[30px] text-[#bbb] text-xs"
>
  {$t('chat.remind')}
</div>