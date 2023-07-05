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

  import bg0 from '../images/bg_style2_0.webp'
  import bg1 from '../images/bg_style2_1.webp'
  import bg2 from '../images/bg_style2_2.webp'
  import bg3 from '../images/bg_style2_3.webp'

  let keyWord = ''

  let pageIdx = 1
  let pageSize = 20

  let initLoading: boolean = false
  let data: Awaited<ReturnType<typeof im.webAnchors>>['data']['list'] = []
  let hasMoreData: boolean = false

  const anchorBgs = [bg0, bg1, bg2, bg3]

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

  const init = async ({
    keyWord,
    sid
  }: {
    keyWord: string
    sid: ReturnType<typeof convertSid>
  }) => {
    pageIdx = 1
    data = []

    try {
      initLoading = true
      await fetchAnchors({ keyWord, sid })
    } catch (error) {
      data = []
    } finally {
      initLoading = false
    }
  }

  $: sid = convertSid($params?.anchorSid)

  const initSearch = (e) => {
    keyWord = e.detail.keyWord
    init({ keyWord, sid })
  }

  $: {
    if (sid != null) {
      document.body.scrollTo(0, 0)
      window.scrollTo(0, 0)
    }
  }
</script>

<div data-cid="Anchor_AnchorList" class="bg-white mt-[8px] rouned-[20px] py-[8px] px-[12px]">
  <Search on:searchEvent={(e) => initSearch(e)} />

  <div class="space-y-[12px]">
    {#if initLoading}
      <Loading />
    {:else if !data?.length}
      <Empty class="h-[calc(100vh_-_170px)]" />
    {:else}
      <InfiniteScroll hasMore={hasMoreData} load={() => fetchAnchors({ keyWord, sid})}>
        {#each data || [] as anchor, idx}
          <Anchor {anchor} bg={anchorBgs[idx % anchorBgs.length]} />
        {/each}
      </InfiniteScroll>
    {/if}
  </div>
</div>
