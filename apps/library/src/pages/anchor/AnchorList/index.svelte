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
  }, 800)

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

  let marginTop = window.innerHeight * 0.3
  let marginBottom = window.innerHeight - marginTop - 10
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

  <div class='w-full' style:height={`${marginBottom - 75.5}px`}></div>

  <div class='bg-red-500 fixed left-0 right-0' style:top={`30%`} style:height={`${10}px`} ></div>
</div>
