<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { Ripple } from 'ui'

  import AnchorDetailSheet from '$containers/AnchorDetailSheet'
  import AnchorPreviewer from '$containers/AnchorPreviewer'

  import Announcement from '../images/announcement.svg'
  import { list, streaming } from '../../store'
  import { PREVIEW_BAR_TOP_RATIO, PREVIEW_BAR_WIDTH } from '../previewConfig'

  const dispatch = createEventDispatcher()

  export let houseId: string
  export let preview: boolean = false

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
    class="flex w-full px-[8px] py-[10px] bg-white rounded-[10px] h-full"
    ripple={false}
    on:click={() => {
      dispatch('change', $store)
    }}
  >
    <AnchorPreviewer
      anchor={$store}
      {preview}
      previewableTopRatio={PREVIEW_BAR_TOP_RATIO}
      previewableWidth={PREVIEW_BAR_WIDTH}
      isMatchType
      previewClass='flex items-center'
      on:preview
    >
      <div class="flex flex-col overflow-hidden space-y-[8px] ml-[8px]">
        <div class="flex items-center">
          <img class="max-h-[20px] max-w-[20px] rounded-full" src={$store.userImage} alt="" />
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

  <Ripple
    class="absolute top-[10px] right-[8px] im-shadow flex items-center justify-center w-[20px] h-[20px] rounded-[5px]"
    on:click={() => (openSheet = true)}
  >
    <Announcement width={14} height={14} fill="rgb(var(--im-monorepo-primary))" />
  </Ripple>

  <AnchorDetailSheet bind:open={openSheet} {houseId} />
</div>
