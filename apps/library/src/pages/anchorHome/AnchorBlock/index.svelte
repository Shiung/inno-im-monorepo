<script lang="ts">
  import { Ripple } from 'ui'
  import { twMerge } from 'tailwind-merge'
  import { push } from 'svelte-spa-router'
  import type { IWebAnchor } from 'api/im/types'

  import { t } from '$stores'
  import Empty from '$containers/Empty'
  import AnchorCard from '$containers/AnchorCard'

  import Loading from './Loading.svelte'
  import Arrow from './images/arrow_right_small.svg'

  import { getAnchorStore } from '../store'

  const { anchorMatches } = getAnchorStore()

  export let data: IWebAnchor[] = []
  export let loading: boolean = false
</script>

<div data-cid="AnchorBlock" class={twMerge('bg-white rounded-[20px] lg:rounded-[10px] pt-[16px]', $$props.class)}>
  <div class="px-[16px] flex items-center justify-between">
    <div class="text-[18px] font-semibold">{$t('anchor.recommendation')}</div>

    <Ripple class="flex items-center space-x-[6px] text-[14px] pl-2 rounded-full" on:click={() => push(`/anchorList`)}>
      <span> {$t('anchor.all')} </span>
      <Arrow width={12} height={12} fill="#333333" />
    </Ripple>
  </div>

  {#if loading}
    <Loading />
  {:else if data.length === 0}
    <Empty class="h-[320px]" />
  {:else}
    <div class='grid grid-cols-2 gap-[12px] p-[16px] xl:grid-cols-4'>
      {#each data || [] as anchor}
        {@const match = $anchorMatches[anchor.houseId]}

        <AnchorCard {anchor} {match} />
      {/each}
    </div>
  {/if}
</div>
