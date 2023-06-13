<script lang="ts">
  import { onDestroy } from 'svelte'
  import { params, replace } from 'svelte-spa-router'
  import { im } from 'api'

  import Circle from 'ui/core/button/loading.svelte'
  import SubMenu from '$components/SubMenu/index.svelte'
  import Empty from '$containers/Empty'
  import Expert, { Loading as ExpertLoading } from '$containers/Expert'

  import type { SidType } from 'utils'
  import type { IExpertMenu } from '$components/SubMenu/type'
  import type { IExpertPrediction } from 'api/im/types'

  export let sid: SidType

  type MenuType = IExpertMenu['type']

  let type: MenuType = 0
  const menu: IExpertMenu[] = [
    {
      i18n: 'expert.hit',
      type: 0,
      onClick: () => console.log('expert.hit')
    },
    {
      i18n: 'expert.winningStreakKing',
      type: 1,
      onClick: () => console.log('expert.winningStreakKing')
    }
    // TODO
    // {
    //   i18n: 'expert.followUp',
    //   type: 2,
    //   onClick: () => console.log('expert.followUp')
    // },
  ]

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
    type,
    pageIdx,
    pageSize
  }: {
    sid: SidType
    type: MenuType
    pageIdx: number
    pageSize: number
  }) => {
    return im.expertPredictions({
      query: {
        ...(sid && { sid }),
        ...(type && { type }),
        pageIdx,
        pageSize
      }
    })
  }

  const init = async ({ sid, type }: { sid: SidType, type: MenuType }) => {
    pageIdx = 1
    moreData = []
    if(sid == null) return

    try {
      initLoading = true

      const response = await fetchPredictions({ sid, type, pageIdx, pageSize })

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
          const response = await fetchPredictions({ sid, type: type, pageIdx, pageSize })
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
    init({ sid, type })
  }

  $: if (dom) observer.observe(dom)

  onDestroy(() => {
    observer.disconnect()
    observer = null
  })
</script>

<div data-cid='ExpertList' class="bg-white">
  <SubMenu class="border-b divide-solid" {menu} bind:active={type} />

  {#if initLoading}
    <ExpertLoading length={5} />
  {:else}
    <div class="pl-[14px] pr-[20px] py-[20px] space-y-10">
      {#if initData.length === 0}
        <Empty class="h-[300px]" />
      {:else}
        {#each initData as prediction}
          <Expert {prediction} />
        {/each}

        {#each moreData as prediction}
          <Expert {prediction} />
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