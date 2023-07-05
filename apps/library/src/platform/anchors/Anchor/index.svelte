<script lang='ts'>
import { createEventDispatcher } from 'svelte'
import { Ripple } from 'ui'

import AnchorDetailSheet from '$containers/AnchorDetailSheet'

import Announcement from '../images/announcement.svg'
import { list, streaming } from '../store'
const dispatch = createEventDispatcher()

export let houseId: string
let openSheet: boolean = false

$: store = list.get(houseId)
$: isSteaming = $streaming?.houseId === houseId

</script>

<div class='relative ease-out duration-300 overflow-hidden' 
  style:height={isSteaming ? '0px' : '85px'} 
  style:margin-top={isSteaming ? '0px' : '8px'}
>
  <Ripple class='flex w-full px-[8px] py-[10px] bg-white rounded-[10px] h-full' ripple={false}
    on:click={() => {
      $streaming = $store
      dispatch('change', $store)
    }}
  >
    <img class='rounded-[10px] w-[110px] h-full object-cover' src={$store.houseImage} alt='' />

    <div class='flex flex-col overflow-hidden space-y-[8px] ml-[8px]'>
      <div class='flex items-center'>
        <img class='max-h-[20px] max-w-[20px] rounded-full' src={$store.userImage} alt='' />
        <span class='text-imprimary text-[16px]'> {$store.houseName} </span>
      </div>

      <div class='text-[11px] truncate text-left'> {$store.houseIntroduction} </div>
      <div class='flex'>
        <span class='items-center px-[5px] rounded-[5px] text-[#999999] text-[6px] bg-[rgba(238,238,238,0.5)]'> 
          {$store.anchorTypeName}
        </span>
      </div>
    </div>
  </Ripple>

  <Ripple class='absolute top-[10px] right-[8px] im-shadow flex items-center justify-center w-[20px] h-[20px] rounded-[5px]'
    on:click={() => openSheet = true}
  >
    <Announcement width={14} height={14} fill='rgb(var(--im-monorepo-primary))' />
  </Ripple>

  <AnchorDetailSheet bind:open={openSheet} houseId={houseId} />
</div>
