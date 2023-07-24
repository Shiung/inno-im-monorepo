<script lang="ts">
  import { im } from 'api'
  import convertSid from 'utils/convertSid'
  import { locale } from '$stores'
  import { params } from 'svelte-spa-router'

  import InfiniteScroll from 'ui/components/InfiniteScroll'

  import Empty from '$src/containers/Empty'

  import Loading from './Loading.svelte'
  import Anchor from './Anchor/index.svelte'
  import Search from './Search/index.svelte'
  import debounce from '$src/utils/debounce'

  import { PREVIEW_BAR_TOP_RATIO, PREVIEW_BAR_WIDTH } from './config'

  let keyWord = ''

  let pageIdx = 1
  let pageSize = 20

  let initLoading: boolean = false
  let data: Awaited<ReturnType<typeof im.webAnchors>>['data']['list'] = []
  let hasMoreData: boolean = false

  const fetchAnchors = async (props: { keyWord: string; sid: ReturnType<typeof convertSid> }) => {
    const { keyWord, sid } = props

    try {
      const response = await im.webAnchors({
        query: {
          ...(sid && { sid }),
          ...(keyWord && { keyWord }),
          pageIdx,
          pageSize
        },
        headers: { 'Accept-Language': $locale }
      })

      const { list, pager } = response?.data || {}

      if (list?.length) data = [...data, ...list]

      const { totalPage } = pager || {}
      hasMoreData = totalPage > pageIdx
      if (hasMoreData) pageIdx++
    } catch (error) {
      hasMoreData = false
    }
  }

  const init = async ({ sid }: { sid: ReturnType<typeof convertSid> }) => {
    pageIdx = 1
    data = []

    try {
      initLoading = true
      await fetchAnchors({ keyWord, sid })
      setActiveId(data[0].houseId)
    } catch (error) {
      data = []
    } finally {
      initLoading = false
    }
  }

  $: sid = convertSid($params?.anchorSid)

  $: if (sid != null) {
    document.body.scrollTo(0, 0)
    window.scrollTo(0, 0)
    init({ sid })
  }
  
  let activeId: string
  const setActiveId = debounce((id: string) => {
    activeId = id
  }, 250)

  let isInit = false
  const onScroll = () => {
    if (isInit && window.scrollY > 10) return

    if (window.scrollY > 10) {
      isInit = true
      setActiveId(data?.[1]?.houseId)
    } else {
      isInit = false
      setActiveId(data?.[0]?.houseId)
    }
  }

  // debug
  // let marginTop = PREVIEW_BAR_TOP_RATIO * 100
  // 44 = header, 75.5 = bottomNavigation
  let whiteBlockHeight = window.innerHeight * (1 - PREVIEW_BAR_TOP_RATIO) - 44 - 75.5
</script>

<svelte:window on:scroll={onScroll} />
<div data-cid="Anchor_AnchorList" class="bg-white mt-[8px] rouned-[20px] py-[8px] px-[12px]">
  <Search bind:value={keyWord} on:searchEvent={() => init({ sid })} />

  <div class="space-y-[12px]">
    {#if initLoading}
      <Loading />
    {:else if !data?.length}
      <Empty class="h-[calc(100vh_-_170px)]" />
    {:else}
      <InfiniteScroll hasMore={hasMoreData} load={() => fetchAnchors({ keyWord, sid})}>
        {#each data || [] as anchor}
          <Anchor {anchor} preview={activeId === anchor.houseId} on:preview={(e) => setActiveId(e.detail)} />
        {/each}
      </InfiniteScroll>
    {/if}
  </div>

  <div class='flex justify-center items-center' style:height={`${whiteBlockHeight}px`}></div>

  <!-- debug -->
  <!-- <div class='bg-red-500 fixed left-0 right-0' style:top={`${marginTop}%`} style:height={`${PREVIEW_BAR_WIDTH}px`} ></div> -->
</div>
