<script lang="ts">
  import { Ripple } from 'ui'
  import { twMerge } from 'tailwind-merge'
  import { push, params } from 'svelte-spa-router'
  import { createEventDispatcher } from 'svelte'
  import type { IWebAnchor } from 'api/im/types'

  import { t } from '$stores'
  import Empty from '$containers/Empty'

  import Anchor from './Anchor'
  import Loading from './Loading.svelte'
  import Arrow from './images/arrow_right_small.svg'

  import bg0 from './images/bg_style1_0.webp'
  import bg1 from './images/bg_style1_1.webp'
  import bg2 from './images/bg_style1_2.webp'
  import bg3 from './images/bg_style1_3.webp'

  export let data: IWebAnchor[] = []
  export let loading: boolean = false

  const anchorBgs = [bg0, bg1, bg2, bg3]

  const dispatch = createEventDispatcher()

  const onAnchorClick = (anchor: IWebAnchor) => {
    dispatch('change', anchor)
  }
</script>

<div data-cid="AnchorList" class={twMerge('bg-white rounded-[20px] pt-[16px]', $$props.class)}>
  <div class="px-[16px] flex items-center justify-between">
    <div class="text-[18px] font-semibold">{$t('anchor.finding')}</div>

    <Ripple class="flex items-center space-x-[6px] text-[14px] pl-2 rounded-full" on:click={() => push(`/anchor/${$params.sid}`)}>
      <span> {$t('anchor.all')} </span>
      <Arrow width={12} height={12} fill="#333333" />
    </Ripple>
  </div>

  {#if loading}
    <Loading />
  {:else if data.length === 0}
    <Empty class="h-[320px]" />
  {:else}
    <div class="grid grid-cols-2 gap-[12px] p-[16px]">
      {#each data || [] as anchor, idx}
        <Anchor {anchor} bg={anchorBgs[idx % anchorBgs.length]} on:click={() => onAnchorClick(anchor)} />
      {/each}
    </div>
  {/if}
</div>
