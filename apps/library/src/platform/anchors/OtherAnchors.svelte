<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { twMerge } from 'tailwind-merge'
  import type { IPager, IWebAnchor } from 'api/im/types'
  import { getUseLang, isLg } from '$stores'
  import { AbortControllers } from 'utils'

  import RetryInfiniteScroll from '$components/RetryInfiniteScroll'
  import Anchor from './Anchor.svelte'
  import { NO_LANG } from '$src/constant'
  import { list, matchSid } from '../store'

  import { fetchAnchorsApi } from '$src/pages/anchor/AnchorList/utils'
  import Loading from '$src/pages/anchor/AnchorList/Loading.svelte'

  let pageIdx = 1
  $: ANCHOR_MIN_COUNT = $isLg ? 9 : 6
  const ANCHOR_MAX_COUNT = 12
  $: pageSize = 50

  let initLoading: boolean = false
  let data: IWebAnchor[] = []
  let hasMoreData: boolean = false

  const abortControllers = new AbortControllers()

  const dispatch = createEventDispatcher()

  const loadAnchors = async () => {
    try {
      const { list, pager } = await fetchAnchorsApi({ sid, lang: useLang, pageIdx, pageSize })

      if (list?.length) {
        const filteredResData = filterAnchorsByMatchCountAndCurrentMatchAnchors(list)
        data = [...data, ...filteredResData]
      }

      setHasMoreData(pager, data.length)

    } catch (error) {
      console.error(error)
      setHasMoreData()
    }
  }

  const setHasMoreData = (pager?: IPager, currentLength?: number) => {
    if (!pager) return (hasMoreData = false)
    const { totalPage } = pager || {}
    hasMoreData = currentLength < ANCHOR_MAX_COUNT && totalPage > pageIdx
    if (hasMoreData) pageIdx++
  }

  const fetchInit = async (sid, lang) => {
    if (!sid || lang === NO_LANG) return

    pageIdx = 1
    data = []
    hasMoreData = false

    abortControllers.abortControllers('platform-fetch-im.webAnchors')
    const controller = {
      ctl: new AbortController(),
      isAborted: false,
      key: 'platform-fetch-im.webAnchors'
    }
    abortControllers.addController(controller)

    try {
      initLoading = true
      const { list, pager } = await fetchAnchorsApi(
        { sid, lang: useLang, pageIdx, pageSize },
        { signal: controller.ctl.signal }
      )
      if (list?.length) {
        data = filterAnchorsByMatchCountAndCurrentMatchAnchors(list)

        setHasMoreData(pager, data.length)

        while (data.length < ANCHOR_MIN_COUNT && hasMoreData) {
          await loadAnchors()
        }
      }
    } catch (error) {
      console.error(error)
      setHasMoreData()
    } finally {
      if (!controller.isAborted) {
        initLoading = false
        dispatch('nodata', !data?.length)
      }

      abortControllers.spliceController(controller)
    }
  }

  const filterAnchorsByMatchCountAndCurrentMatchAnchors = (data: IWebAnchor[]) => {
    return data.filter(item => item.matchList?.length > 0 && !list.get(item.houseId))
  }

  $: sid = $matchSid

  $: useLang = $getUseLang()

  $: fetchInit(sid, useLang)

  $: displayedData = data.slice(0, ANCHOR_MAX_COUNT)
</script>

<div data-cid='Platform_anchors_OtherAnchors' class={twMerge('px-4', $$props.class)}>
  {#if initLoading}
    <Loading size={ANCHOR_MIN_COUNT} />
  {:else if displayedData?.length}
    <RetryInfiniteScroll
      hasMore={hasMoreData}
      load={() => loadAnchors()}
    >
      <div class='grid grid-cols-2 lg:grid-cols-3 gap-3'>
        {#each displayedData || [] as anchor}
          <Anchor
            class='items-stretch'
            {anchor}
            matchInfo={{ data: anchor?.matchList[0] }}
          />
        {/each}
      </div>
    </RetryInfiniteScroll>
  {:else}
    <div class='h-[200px]'></div>
  {/if}
</div>