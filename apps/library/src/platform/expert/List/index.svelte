<script lang="ts">
  import { onDestroy } from 'svelte'
  import { im } from 'api'

  import { locale } from '$stores'

  import InfiniteScroll from 'ui/components/InfiniteScroll'

  import Empty from '$containers/Empty'
  import Expert, { Loading as ExpertLoading } from '$containers/Expert'

  import type { GoToExpertDetail, GoToPlanDetail } from '$containers/Expert/type'

  export let mid: number
  export let vd: string
  export let goToExpertDetail: GoToExpertDetail
  export let goToPlanDetail: GoToPlanDetail

  let pageIdx: number = 1
  const pageSize: number = 10

  let initLoading: boolean = false
  let data: Awaited<ReturnType<typeof im.expertMatchArticle>>['data']['list'] = []
  let hasMoreData: boolean = false

  const fetchPredictions = async ({ mid, vd }: { mid: number, vd: string }) => {
    try {
      const response = await im.expertMatchArticle({
        query: {
          ...(mid && { mid }),
          ...(vd && { vd }),
          pageIdx,
          pageSize
        },
        headers: { 'Accept-Language': $locale }
      })

      const { list, pager } = response?.data || {}

      if (list?.length) data = [...data, ...list]

      const { totalPage } = pager || {}
      hasMoreData = totalPage > pageIdx
      if(hasMoreData) pageIdx++
    } catch (error) {
      hasMoreData = false
    }
  }

  const init = async ({ mid, vd }: { mid: number, vd: string }) => {
    pageIdx = 1
    data = []
    if(mid == null || vd == null) return

    try {
      initLoading = true
      await fetchPredictions({ mid, vd })
    } catch (error) {
      data = []
    } finally {
      initLoading = false
    }
  }

  $: {
    window.scrollTo(0, 0)
    init({ mid, vd })
  }
</script>

<div data-cid='PlatformExpertList' class="bg-white">
  {#if initLoading}
    <ExpertLoading length={5} />
  {:else}
    <div class="pl-[14px] pr-[20px] py-[20px] space-y-10">
      {#if data.length === 0}
        <Empty class="h-[300px]" />
      {:else}
        <InfiniteScroll hasMore={hasMoreData} load={() => fetchPredictions({ mid, vd })}>
          {#each data as prediction}
            <Expert
              {prediction}
              goToExpertDetailCallback={goToExpertDetail}
              goToPlanDetailCallback={goToPlanDetail}
            />
          {/each}
        </InfiniteScroll>
      {/if}
    </div>
  {/if}
</div>