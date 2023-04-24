<script lang='ts'>
import { im } from 'api'
import { Ripple } from 'ui'
import { twMerge } from 'tailwind-merge'
import { push, params } from 'svelte-spa-router'

import { t } from '$stores'
import Empty from '$containers/Empty'
import convertSid from 'utils/convertSid'

import Anchor from './Anchor'
import Loading from './Loading.svelte'
import Arrow from './images/arrow_right_small.svg'

import bg0 from './images/bg_style1_0.webp'
import bg1 from './images/bg_style1_1.webp'
import bg2 from './images/bg_style1_2.webp'
import bg3 from './images/bg_style1_3.webp'

let anchorsPromise: ReturnType<typeof im.webAnchors>
const anchorBgs = [ bg0, bg1, bg2, bg3 ]

$: {
  if ($params?.sid && $params.sid !== '0') anchorsPromise = im.webAnchors({
    query: { sid: convertSid($params?.sid), pageIdx: 1, pageSize: 4 }
  })
}

</script>

<div data-cid='AnchorList' class={twMerge('bg-white rounded-[20px] pt-[16px]', $$props.class)}>
  <div class='px-[16px] flex items-center justify-between'>
    <div class='text-[18px] font-semibold'> {$t('anchor.finding')} </div>

    <Ripple class='flex items-center space-x-[6px] text-[14px] pl-2 rounded-full'
      on:click={() => push(`/anchor/${$params.sid}`)}
    >
      <span> {$t('anchor.all')} </span>
      <Arrow width={12} height={12} fill='#333333' />
    </Ripple>
  </div>

  {#await anchorsPromise}
    <Loading />
  {:then anchors}

    {#if anchors?.data?.list?.length === 0}
      <Empty class='h-[320px]' />

    {:else}
      <div class='grid grid-cols-2 gap-[12px] p-[16px]'>
        {#each anchors?.data?.list || [] as anchor, idx}
          <Anchor anchor={anchor} bg={anchorBgs[idx % anchorBgs.length]} />
        {/each}
      </div>
    {/if}

  {/await}
</div>
