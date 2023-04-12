<script lang='ts'>
import { t } from '$stores'

import { Ripple } from 'ui'
import Anchor from './Anchor'
import Loading from './Loading.svelte'
import Arrow from './images/arrow_right_small.svg'

import bg0 from './images/bg_style1_0.webp'
import bg1 from './images/bg_style1_1.webp'
import bg2 from './images/bg_style1_2.webp'
import bg3 from './images/bg_style1_3.webp'

import { fetchArchors } from '../service'

const archorsPromise = fetchArchors({ query: { pageSize: '4' } })
const archorBgs = [ bg0, bg1, bg2, bg3 ]

</script>

<div data-cid='AnchorList' class='bg-white rounded-[20px] pt-[16px]'>
  <div class='px-[16px] flex items-center justify-between'>
    <div class='text-[18px] font-semibold'> {$t('anchor.finding')} </div>

    <Ripple class='flex items-center space-x-[6px] text-[14px] pl-2 rounded-full'>
      <span> {$t('anchor.all')} </span>
      <Arrow width={12} height={12} fill='#333333' />
    </Ripple>
  </div>

  <div class='grid grid-cols-2 gap-[12px] p-[16px]'>
    {#await archorsPromise}
      <Loading />
    {:then anchors}

      {#each anchors?.list as anchor, idx}
        <Anchor anchor={anchor} bg={archorBgs[idx % archorBgs.length]} />
      {/each}

    {/await}
  </div>
</div>
