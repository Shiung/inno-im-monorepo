<script lang='ts'>
  import { t } from '$stores'
  import { twMerge } from 'tailwind-merge'

  import { getInfo } from '../context'
  import { headerRect } from '../store'

  const { height } = getInfo()

  export let fixed: boolean
  export let dom: HTMLDivElement
  export let isTransition: boolean
</script>

<div
  bind:this={dom}
  class={twMerge(
    "flex justify-center items-center w-full min-h-[30px] bg-white z-[1] text-[#bbb] text-xs transition-[top] duration-300 ease-in-out",
    $$props.class,
    fixed ? 'fixed left-0' : 'sticky'
  )}
  style:top={fixed ? (!isTransition ? `${$height}px` : '') : '0'}
>
  {$t('chat.remind')}
</div>

<div style:height={fixed ? `${$headerRect?.height}px` : 0} />