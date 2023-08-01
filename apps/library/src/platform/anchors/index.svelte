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
  import Empty from '$containers/Empty'
  import type { Writable } from 'svelte/store'

  import StreamingAnchor from './StreamingAnchor/index.svelte'
  import Anchor from './Anchor/index.svelte'
  import { PREVIEW_BAR_TOP_RATIO, PREVIEW_BAR_WIDTH } from './previewConfig'
  import { debounce } from 'utils'

  let activeId: string
  let first: Writable<IPlatformAnchor>
  let second: Writable<IPlatformAnchor>

  const setActiveId = debounce((id: string) => {
    activeId = id
  }, 250)

  let _list: string[] = []
  list.list.subscribe((value) => {
    _list = value
    if (value?.length > 0) {
      setActiveId(value[0])
      first = list.get(value?.[0])
      second = list.get(value?.[1])
    }
  })

  let whiteBlockHeight = window.innerHeight * (1 - PREVIEW_BAR_TOP_RATIO) - PREVIEW_BAR_WIDTH

  let isInit = false

  const onWindowScroll = () => {
    if (isInit && window.scrollY > 10) return
    if (window.scrollY > 10) {
      isInit = true
      if ($second && $second?.liveStatus === 2) setActiveId($second.houseId)
    } else {
      isInit = false
      if ($first && $first?.liveStatus === 2) setActiveId($first.houseId)
    }
  }

  // debug
  let marginTop = PREVIEW_BAR_TOP_RATIO * 100
</script>

<svelte:window on:scroll={onWindowScroll} />

{#if !_list || _list?.length === 0}
  <Empty class="h-[300px]" />
{:else}
  <div>
    <StreamingAnchor />

    <div class="px-[12px] mt-[12px]">
      {#each _list || [] as houseId}
        <Anchor
          {houseId}
          preview={activeId === houseId}
          on:preview={(e) => setActiveId(e.detail)}
          on:change={(e) => onChangeCallback(e.detail)}
        />
      {/each}
    </div>

    <div style:height={`${whiteBlockHeight}px`} />

    <!-- debug -->
    <div class="bg-red-500 fixed left-0 right-0" style:top={`${marginTop}%`} style:height={`${PREVIEW_BAR_WIDTH}px`} />
  </div>
{/if}
