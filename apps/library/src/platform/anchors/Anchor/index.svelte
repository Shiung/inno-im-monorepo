<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { Ripple } from 'ui'

  import AnchorDetailSheet from '$containers/AnchorDetailSheet'
  import AnchorPreviewer from '$containers/AnchorPreviewer'
  import AnchorImage from '$containers/AnchorImage'
  import { list, streaming } from '../../store'
  import { PREVIEW_BAR_WIDTH } from '../previewConfig'

  const dispatch = createEventDispatcher()

  export let houseId: string
  export let preview: boolean = false
  export let previewTopRatio: number

  let openSheet: boolean = false

  $: store = list.get(houseId)
  $: isStreaming = $streaming?.houseId === houseId
</script>

<div
  class="relative ease-out duration-300 overflow-hidden"
  style:height={isStreaming ? '0px' : '85px'}
  style:margin-top={isStreaming ? '0px' : '8px'}
>
  <Ripple
    class="flex w-full py-[10px] bg-white rounded-[10px] h-full p-0"
    ripple={false}
    on:click={() => {
      dispatch('change', $store)
    }}
  >
    <AnchorPreviewer
      anchor={$store}
      {preview}
      previewableTopRatio={previewTopRatio}
      previewableWidth={PREVIEW_BAR_WIDTH}
      isMatchType
      previewClass='flex items-center w-[108px]'
      class='px-2 py-2.5'
      on:preview
    >
      <div class="flex flex-col overflow-hidden space-y-[8px]">
        <div class="flex items-center space-x-1">
          <Ripple on:click={() => openSheet = true} class="w-[19px] h-[19px] border border-imprimary rounded-full p-[1px] flex-none">
            <AnchorImage
              src={$store.userImage}
              class='block w-full h-auto rounded-full'
            />
          </Ripple>

          <span class="text-imprimary text-[16px]"> {$store.houseName} </span>
        </div>
  
        <div class="text-[11px] truncate text-left">{$store.houseIntroduction}</div>
        <div class="flex">
          <span class="items-center px-[5px] rounded-[5px] text-[#999999] text-[6px] bg-[rgba(238,238,238,0.5)]">
            {$store.anchorTypeName}
          </span>
        </div>
      </div>
    </AnchorPreviewer>
  </Ripple>

  <AnchorDetailSheet bind:open={openSheet} {houseId} />
</div>
