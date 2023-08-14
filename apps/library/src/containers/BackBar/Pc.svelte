<script lang="ts">
  import { pop } from 'svelte-spa-router'
  import { Ripple } from 'ui'
  import ArrowLeft from './images/arrow_left.svg'

  export let title: string = ''
</script>

<div class="bg-white w-full h-[56px] px-[16px] text-center rounded-[10px] mb-[12px] flex justify-between items-center">
  <div class="flex items-center">
    <Ripple on:click={pop}>
      <ArrowLeft width={20} height={20} />
    </Ripple>
    <div class="ml-[12px]">{title}</div>
  </div>

  <slot name="right" />
</div>
