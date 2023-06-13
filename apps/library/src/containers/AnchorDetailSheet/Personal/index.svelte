<script lang='ts'>
import { im } from 'api'
import { t, locale } from '$stores'

import PhotoLoading from './PhotoLoading.svelte'

import type { IWebAnchorInfo } from 'api/im/types'

export let personal: { loading: boolean, data: IWebAnchorInfo['res']['data'] }
export let houseId: string

const photosPromise = im.webAnchorPhotos({
  query: { houseId, pageIdx: 1, pageSize: 10 },
  headers: { 'Accept-Language': $locale }
})

const stateTrans = (state: typeof personal.data.state): string => {
  switch (state) {
    case 1: return 'anchor.state.single' 
    case 2: return 'anchor.state.inRelationship'
    case 3: return 'anchor.state.secret'
  }
}

$: info = [
  { i18n: 'anchor.country', value: personal?.data?.country || '' },
  { i18n: 'anchor.height', value: personal?.data?.height || '' },
  { i18n: 'anchor.weight', value: personal?.data?.weight || '' },
  { i18n: 'anchor.birthday', value: personal?.data?.birthday || '' },
  { i18n: 'anchor.favorite', value: personal?.data?.favorite || '' },
  { i18n: 'anchor.state', value: $t(stateTrans(personal?.data?.state)) || '' }
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
      {#await photosPromise} 
        <PhotoLoading />
      {:then photos}

        {#each photos?.data?.list as photo } 
          <img class='w-[120px] min-w-[120px] h-[120px] min-h-[120px] rounded-[20px]' src={photo.image} alt='' />
        {/each}

      {/await}
    </div>
  </div>
</div>
