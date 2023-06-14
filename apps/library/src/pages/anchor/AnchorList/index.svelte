<script lang="ts">
  import { onDestroy } from 'svelte'
  import Circle from 'ui/core/button/loading.svelte'
  import { im } from 'api'
  import convertSid from 'utils/convertSid'

  import Empty from '$src/containers/Empty'

  import { params } from 'svelte-spa-router'
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
  let initData: Awaited<ReturnType<typeof im.webAnchors>>['data']['list']

  let hasMoreData: boolean = false
  let moreAnchors = []
  let moreLoading = false

  const anchorBgs = [bg0, bg1, bg2, bg3]

  const fetchAnchors = (props: {
    pageIdx: number
    keyWord: string
    sid: ReturnType<typeof convertSid>
  }) => {
    const { pageIdx, keyWord, sid } = props

    return im.webAnchors({
      query: {
        ...(sid && { sid }),
        ...(keyWord && { keyWord }),
        pageIdx,
        pageSize
      }
    })
  }

  const init = async ({
    keyWord,
    sid
  }: {
    keyWord: string
    sid: ReturnType<typeof convertSid>
  }) => {
    pageIdx = 1
    moreAnchors = []
    initData = []

    try {
      initLoading = true
      const response = await fetchAnchors({ pageIdx, keyWord, sid })
      const { list, pager } = response?.data || {}

      if (list?.length) initData = list

      const { totalPage } = pager || {}
      hasMoreData = totalPage > pageIdx
      if (hasMoreData) pageIdx++
    } catch (error) {
      initData = []
    } finally {
      initLoading = false
    }
  }

  $: {
    if ($params?.anchorSid) {
      document.body.scrollTo(0, 0)
      window.scrollTo(0, 0)
      init({ keyWord, sid: convertSid($params?.anchorSid) })
    }
  }

  let domOfLoading: HTMLDivElement
  let intersectionObserver = new IntersectionObserver(async (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        moreLoading = true
        const res = await fetchAnchors({ pageIdx, keyWord, sid: convertSid($params?.anchorSid) })
        const { list, pager } = res?.data || {}

        if (list?.length) moreAnchors = [...moreAnchors, ...res.data.list]

        const { totalPage } = pager || {}
        hasMoreData = totalPage > pageIdx
        if (hasMoreData) pageIdx++

        moreLoading = false
      }
    }
  })

  $: if (domOfLoading) intersectionObserver.observe(domOfLoading)

  onDestroy(() => {
    intersectionObserver.disconnect()
    intersectionObserver = null
  })
</script>

<div data-cid="Anchor_AnchorList" class="bg-white mt-[8px] rouned-[20px] py-[8px] px-[12px]">
  <Search on:searchEvent={(e) => (keyWord = e.detail.keyWord)} />

  <div class="space-y-[12px]">
    {#if initLoading}
      <Loading />
    {:else if !initData?.length}
      <Empty class="h-[300px]" />
    {:else}
      {#each initData || [] as anchor, idx}
        <Anchor {anchor} bg={anchorBgs[idx % anchorBgs.length]} />
      {/each}

      {#each moreAnchors as anchor, idx}
        <Anchor {anchor} bg={anchorBgs[(initData.length + idx) % anchorBgs.length]} />
      {/each}

      <!-- if init fetch data less then pageSize that meaning no more data. -->
      {#if hasMoreData}
        <div bind:this={domOfLoading}>
          {#if moreLoading}
            <div class="relative h-[30px] overflow-hidden">
              <Circle stroke="rgb(var(--im-monorepo-primary))" />
            </div>
          {:else}
            <div />
          {/if}
        </div>
      {/if}
    {/if}
  </div>
</div>
