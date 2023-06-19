<script lang="ts">
  import { im } from 'api'
  import { locale } from '$stores'

  import InfiniteScroll from 'ui/components/InfiniteScroll'

  import SubMenu from '$components/SubMenu/index.svelte'
  import Empty from '$containers/Empty'
  import Expert, { Loading as ExpertLoading } from '$containers/Expert'

  import type { SidType } from 'utils'
  import type { IExpertMenu } from '$components/SubMenu/type'

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
  let data: Awaited<ReturnType<typeof im.expertPredictions>>['data']['list'] = []
  let hasMoreData: boolean = false

  const fetchPredictions = async ({ sid, type }: { sid: SidType, type: MenuType }) => {
    try {
      const response = await im.expertPredictions({
        query: {
          ...(sid && { sid }),
          ...(type && { type }),
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

  const init = async ({ sid, type }: { sid: SidType, type: MenuType }) => {
    pageIdx = 1
    data = []

    try {
      initLoading = true
      await fetchPredictions({ sid, type })
    } catch (error) {
      data = []
      hasMoreData = false
    } finally {
      initLoading = false
    }
  }

  $: {
    window.scrollTo(0, 0)
    init({ sid, type })
  }
</script>

<div data-cid='ExpertList' class="bg-white">
  <SubMenu class="border-b divide-solid" {menu} bind:active={type} />

  {#if initLoading}
    <ExpertLoading length={5} />
  {:else}
    <div class="pl-[14px] pr-[20px] py-[20px] space-y-10">
      {#if data.length === 0}
        <Empty class="h-[300px]" />
      {:else}
        <InfiniteScroll hasMore={hasMoreData} load={() => fetchPredictions({ sid, type })}>
          {#each data as prediction}
            <Expert {prediction} />
          {/each}
        </InfiniteScroll>
      {/if}
    </div>
  {/if}
</div>