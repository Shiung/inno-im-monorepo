<script lang="ts">
  import { onMount, /* createEventDispatcher */ } from 'svelte'
  import { slide } from 'svelte/transition'
  import { Ripple } from 'ui'
  import { t } from '$stores'
  import { twMerge } from 'tailwind-merge'
  import { Marquee } from 'ui'

  const AnchorTitle = () => import('./AnchorTitle/index.svelte')
  // import Close from '../images/close.svg'
  import Info from '../images/info.svg'
  
  import { getInfo } from '../context'
  import { headerRect } from '../store'

  export let fixed: boolean
  export let dom: HTMLDivElement
  export let isTransition: boolean

  // export let showClose: false

  const { height, chatId } = getInfo()

  const loadAnchorTitle = async () => {
    let comp = await AnchorTitle()

    return comp?.default
  }

  let promise: ReturnType<typeof loadAnchorTitle>
  $: if ($chatId) promise = loadAnchorTitle()

  // const dispatch = createEventDispatcher()

  let showRemind: boolean = false

  $: marqueeInfo = [$t('chat.remind')]

  onMount(() => {
    showRemind = true
  })
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
    {#if $chatId}
      {#await promise then AnchorTitle}
        <AnchorTitle anchorId={$chatId} />
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
          loop={false}
          count={2}
          on:complete={() => showRemind = false}
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