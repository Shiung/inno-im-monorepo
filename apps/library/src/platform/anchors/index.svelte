<script lang="ts" context="module">
  import { list } from '../store'

  import type { IPlatformAnchor } from './types'

  import { filterListByLang } from '$stores'

  export const setList = list.set
  export const updateList = list.update
  let onChangeCallback = (_anchor: IPlatformAnchor) => {}

  export let onChange = (callback: typeof onChangeCallback) => {
    onChangeCallback = callback
  }

  export const getFilterAnchorsByLang = filterListByLang.subscribe
</script>

<script lang="ts">
  import { debounce } from 'utils'
  import { get, type Writable } from 'svelte/store'

  import Empty from '$containers/Empty'

  import StreamingAnchor from './StreamingAnchor/index.svelte'
  import Anchor from './Anchor/index.svelte'

  import { streaming } from '../store'
  import { PREVIEW_BAR_WIDTH } from './previewConfig'
  import { StreamLiveStatus } from '$src/constant'

  let activeId: string
  let first: Writable<IPlatformAnchor>
  let second: Writable<IPlatformAnchor>
  let listDom: HTMLDivElement
  const houseIdList = list.list
  let _list: string[] = []
  let isInit = false
  let previewTopRatio: number = 0
  let folder: boolean = false

  const setActiveId = debounce((id: string) => {
    activeId = id
  }, 250)

  houseIdList.subscribe((value) => {
    _list = value
    if (value?.length > 0) {
      setActiveId(value[0])
      first = list.get(value?.[0])
      second = list.get(value?.[1])
    }

    previewTopRatio = getListDomTopRatio()
  })

  const onWindowScroll = () => {
    if (isInit && window.scrollY > 10) return
    if (window.scrollY > 10) {
      isInit = true
      if ($second && $second?.liveStatus === StreamLiveStatus.LIVE) setActiveId($second.houseId)
    } else {
      isInit = false
      if ($first && $first?.liveStatus === StreamLiveStatus.LIVE) setActiveId($first.houseId)
    }
  }

  const changeFirstTwoWhenStreamingChanged = (streaming: IPlatformAnchor) => {
    if (!streaming) return

    const idList = get(houseIdList)
    const firstTwo = []
    for (let i = 0; i < idList.length; i++) {
      const currentHouseId = idList[i]
      if (currentHouseId !== streaming.houseId) firstTwo.push(currentHouseId)
      if (firstTwo.length === 2) break
    }

    firstTwo[0] && (first = list.get(firstTwo[0]))
    firstTwo[1] && (second = list.get(firstTwo[1]))
  }

  function getListDomTopRatio(...listens: any[]) {
    const listOffsetTop = listDom?.offsetTop || 0
    const twoAnchorHeight = 1.5 * 85 + 8 - PREVIEW_BAR_WIDTH // 85 = block height, 8 = margin-top
    return Math.round(listOffsetTop + twoAnchorHeight) / window.innerHeight
  }

  $: whiteBlockHeight = window.innerHeight * (1 - previewTopRatio) - PREVIEW_BAR_WIDTH

  $: changeFirstTwoWhenStreamingChanged($streaming)

  $: if (listDom) previewTopRatio = getListDomTopRatio()

  $: setTimeout(() => {
    previewTopRatio = getListDomTopRatio($streaming, folder)
  }, 500)

  // debug
  // $: marginTop = previewTopRatio * 100
</script>

<svelte:window on:scroll={onWindowScroll} />

{#if !_list || _list?.length === 0}
  <Empty class="h-[300px]" />
{:else}
  <div data-cid="Platform_anchors">
    <StreamingAnchor bind:folder />

    <div class="px-[12px] mt-[12px]" bind:this={listDom}>
      {#each _list || [] as houseId}
        <Anchor
          {houseId}
          preview={activeId === houseId}
          {previewTopRatio}
          on:preview={(e) => setActiveId(e.detail)}
          on:change={(e) => onChangeCallback(e.detail)}
        />
      {/each}

      <div style:height={`${whiteBlockHeight}px`} />
    </div>

    <!-- debug -->
    <!-- <div class="bg-red-500 fixed left-0 right-0" style:top={`${marginTop}%`} style:height={`${PREVIEW_BAR_WIDTH}px`} /> -->
  </div>
{/if}
