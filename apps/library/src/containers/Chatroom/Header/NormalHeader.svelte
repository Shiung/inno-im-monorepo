<script lang="ts">
  // import { createEventDispatcher } from 'svelte'
  import { slide } from 'svelte/transition'
  import { Ripple } from 'ui'
  import { t } from '$stores'
  import { twMerge } from 'tailwind-merge'
  import { Marquee } from 'ui'

  import type { IPlatformAnchor } from '$src/platform/anchors/types'

  const AnchorTitle = () => import('./AnchorTitle/index.svelte')
  // import Close from '../images/close.svg'
  import Info from '../images/info.svg'
  
  import { getInfo } from '../context'
  import { headerRect } from '../store'

  export let fixed: boolean
  export let dom: HTMLDivElement
  export let isTransition: boolean
  export let anchor: IPlatformAnchor

  // export let showClose: false

  const { height } = getInfo()

  const loadAnchorTitle = async () => {
    let comp = await AnchorTitle()

    return comp?.default
  }

  let promise: ReturnType<typeof loadAnchorTitle>
  $: if (anchor) promise = loadAnchorTitle()

  // const dispatch = createEventDispatcher()

  let showRemind: boolean = false

  $: marqueeInfo = [$t('chat.remind')]
</script>

<div
  class={twMerge(
    'w-full bg-white flex items-center justify-between min-h-[44px] px-[15px] z-[1] transition-[top] duration-300 ease-in-out',
    $$props.class,
    fixed ? 'fixed left-0' : 'sticky'
  )}
  style:top={fixed ? (!isTransition ? `${$height}px` : '') : '0'}
  bind:this={dom}
>
  <div class="flex items-center w-full">
    {#if anchor}
      {#await promise then AnchorTitle}
        <AnchorTitle {anchor} />
      {/await}
    {:else}
      <div class="text-[18px] font-semibold">{$t('chat.title')}</div>
    {/if}

    <Ripple class="flex-none rounded-full flex items-center justify-center w-[25px] h-[25px]" on:click={() => (showRemind = !showRemind)}>
      <Info width={20} height={20} fill={showRemind ? 'rgb(var(--im-monorepo-primary))' : '#999999'} />
    </Ripple>

    {#if showRemind}
      <div transition:slide={{ axis: 'x' }}>
        <Marquee
          infos={marqueeInfo}
          class="text-[12px] bg-[#eeeeee] rounded-[10px] py-[6px] px-[10px] whitespace-nowrap w-[200px] overflow-hidden"
        />
      </div>
    {/if}
  </div>

  <!-- {#if showClose}
    <Ripple class="rounded-full" on:click={() => dispatch('close')}>
      <Close width={20} height={20} fill="#333333" />
    </Ripple>
  {/if} -->
</div>

<div style:height={fixed ? `${$headerRect?.height}px` : 0} />