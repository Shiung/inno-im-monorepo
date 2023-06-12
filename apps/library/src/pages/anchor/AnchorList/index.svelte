<script lang='ts'>
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

let keyWork = ''
let currentPage = 1
let pageSize = 20
let initLoading: boolean = false
let initData: Awaited<ReturnType<typeof im.webAnchors>>['data']['list']
let hasMoreData: boolean = false

const anchorBgs = [ bg0, bg1, bg2, bg3 ]

const fetchAnchors = (props: { pageIdx: number, keyWork: string, sid: ReturnType<typeof convertSid> }) => {
  const { pageIdx, keyWork, sid } = props
  currentPage = pageIdx

  return im.webAnchors({
    query: {
      ...(sid && { sid }),
      ...(keyWork && { keyWork }),
      pageIdx,
      pageSize
    }
  })
}

const init = async () => {
  try {
    initLoading = true
    const response = await fetchAnchors({ pageIdx: currentPage, keyWork, sid: convertSid($params?.anchorSid) })
    initData = response?.data?.list

    hasMoreData = response?.data?.list?.length >= pageSize
    if (response?.data?.pager?.totalPage >= currentPage) currentPage++
  } catch (error) {
    initData = []
  } finally {
    initLoading = false
  }
}

$: if ($params?.anchorSid) init()

let moreAnchors = []
let fetchingMore = false

$: if (initData) {
  document.body.scrollTo(0, 0)  
  window.scrollTo(0, 0)
  moreAnchors = []
}

let domOfLoading: HTMLDivElement
const intersectionObserver = new IntersectionObserver(async entries => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      fetchingMore = true
      const res = await fetchAnchors({ pageIdx: currentPage, keyWork, sid: convertSid($params?.anchorSid) })

      hasMoreData = res?.data?.list?.length >= pageSize

      if(res?.data?.pager?.totalPage >= currentPage) currentPage++
      if (res?.data?.list) moreAnchors = [...moreAnchors, ...res.data.list]

      fetchingMore = false
    }
  }
})

$: if (domOfLoading) intersectionObserver.observe(domOfLoading)

</script>

<div data-cid='Anchor_AnchorList' class='bg-white mt-[8px] rouned-[20px] py-[8px] px-[12px]'>
<Search on:searchEvent={e => keyWork = e.detail.keyWork} />

  <div class='space-y-[12px]'>
    {#if initLoading}
      <Loading />

    {:else}
      {#if !initData?.length}
        <Empty class='h-[300px]' />
      {:else}
        {#each initData || [] as anchor, idx}
          <Anchor anchor={anchor} bg={anchorBgs[idx % anchorBgs.length]} />
        {/each}

        {#each moreAnchors as anchor, idx}
          <Anchor anchor={anchor} bg={anchorBgs[(initData.length + idx) % anchorBgs.length]} />
        {/each}

        
        <!-- if init fetch data less then pageSize that meaning no more data. -->
        {#if hasMoreData }

          <div bind:this={domOfLoading}>
            {#if fetchingMore} 
              <div class='relative h-[30px] overflow-hidden'>
                <Circle stroke='rgb(var(--im-monorepo-primary))' />
              </div>
            {:else}
              <div />
            {/if}
          </div>

        {/if}
      {/if}
    {/if}

  </div>

</div>

