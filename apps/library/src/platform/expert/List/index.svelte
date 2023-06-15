<script lang="ts">
  import { onDestroy } from 'svelte'
  import { im } from 'api'

  import { locale } from '$stores'

  import Circle from 'ui/core/button/loading.svelte'
  import Empty from '$containers/Empty'
  import Expert, { Loading as ExpertLoading } from '$containers/Expert'

  import type { SidType } from 'utils'
  import type { IExpertPrediction } from 'api/im/types'
  import type { GoToExpertDetail, GoToPlanDetail } from '$containers/Expert/type'

  export let sid: SidType
  export let goToExpertDetail: GoToExpertDetail
  export let goToPlanDetail: GoToPlanDetail

  let pageIdx: number = 1
  const pageSize: number = 10

  let initLoading: boolean = false
  let initData: Awaited<ReturnType<typeof im.expertPredictions>>['data']['list'] = []

  let hasMoreData: boolean = false
  let moreLoading: boolean = false
  let moreData: IExpertPrediction[] = []

  let dom: HTMLDivElement

  const fetchPredictions = ({
    sid,
    pageIdx,
    pageSize
  }: {
    sid: SidType
    pageIdx: number
    pageSize: number
  }) => {
    return im.expertPredictions({
      query: {
        ...(sid && { sid }),
        pageIdx,
        pageSize
      },
      headers: { 'Accept-Language': $locale }
    })
  }

  const init = async ({ sid }: { sid: SidType }) => {
    pageIdx = 1
    moreData = []
    if(sid == null) return

    try {
      initLoading = true

      const response = await fetchPredictions({ sid, pageIdx, pageSize })

      const { list, pager } = response?.data || {}

      if (list?.length) initData = list

      const { totalPage } = pager || {}
      hasMoreData = totalPage > pageIdx
      if(hasMoreData) pageIdx++
    } catch (error) {
      initData = []
      hasMoreData = false
    } finally {
      initLoading = false
    }
  }

  let observer = new IntersectionObserver(async (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        try {
          moreLoading = true
          const response = await fetchPredictions({ sid, pageIdx, pageSize })
          const { list, pager } = response?.data || {}
          
          if(list?.length) moreData = [...moreData, ...list]

          const { totalPage } = pager || {}
          hasMoreData = totalPage > pageIdx
          if(hasMoreData) pageIdx++
        } catch (error) {
          hasMoreData = false
        } finally {
          moreLoading = false
        }
      }
    }
  })

  $: {
    window.scrollTo(0, 0)
    init({ sid })
  }

  $: if (dom) observer.observe(dom)

  onDestroy(() => {
    observer.disconnect()
    observer = null
  })
</script>

<div data-cid='PlatformExpertList' class="bg-white">
  {#if initLoading}
    <ExpertLoading length={5} />
  {:else}
    <div class="pl-[14px] pr-[20px] py-[20px] space-y-10">
      {#if initData.length === 0}
        <Empty class="h-[300px]" />
      {:else}
        {#each initData as prediction}
          <Expert
            {prediction}
            goToExpertDetailCallback={goToExpertDetail}
            goToPlanDetailCallback={goToPlanDetail}
          />
        {/each}

        {#each moreData as prediction}
          <Expert
            {prediction}
            goToExpertDetailCallback={goToExpertDetail}
            goToPlanDetailCallback={goToPlanDetail}
          />
        {/each}
      {/if}

      {#if hasMoreData}
        <div bind:this={dom}>
          {#if moreLoading}
            <div class='relative h-[30px] overflow-hidden'>
              <Circle stroke="rgba(var(--im-monorepo-primary))" />
            </div>
          {/if}
        </div>
      {/if}
    </div>
  {/if}
</div>