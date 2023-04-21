<script lang='ts'>
import { t } from '$stores'

import type { IWebAnchorDetail } from 'api/im/types'

export let detail: IWebAnchorDetail

const stateTrans = (state: typeof detail.userInfo.state): string => {
  switch (state) {
    case 1: return 'anchor.state.single' 
    case 2: return 'anchor.state.inRelationship'
    case 3: return 'anchor.state.secret'
  }
}

$: info = [
  { i18n: 'anchor.country', value: detail?.userInfo?.country },
  { i18n: 'anchor.height', value: detail?.userInfo?.height },
  { i18n: 'anchor.weight', value: detail?.userInfo?.weight },
  { i18n: 'anchor.birthday', value: detail?.userInfo?.birthday },
  { i18n: 'anchor.favorite', value: detail?.userInfo?.favorite },
  { i18n: 'anchor.state', value: $t(stateTrans(detail?.userInfo?.state)) }
]


</script>

<div class='px-[24px]'>

  {#each info as item }
    <div class='flex items-center justify-between text-[14px] h-[44px]'>
      <span> {$t(item.i18n)} </span>
      <span class='text-[#999999]'> {item.value} </span>
    </div>
  {/each}


  <div>
    <div class='mt-[16px] text-[18px] font-semibold'> {$t('anchor.photoWall')} </div>
    <div class='flex overflow-y-scroll space-x-[12px] my-[12px]'>
      {#each detail?.userInfo?.photos as photo } 
        <img class='w-[120px] h-[120px] rounded-[20px]' src={photo.image} alt='' />
      {/each}

    </div>
  </div>
</div>
