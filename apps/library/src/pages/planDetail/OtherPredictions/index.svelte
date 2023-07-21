<script lang="ts">
  import { im } from 'api'
  import { params } from 'svelte-spa-router'
  import { t, locale } from '$stores'

  import InfiniteScroll from 'ui/components/InfiniteScroll'

  import Empty from '$containers/Empty'
  import Expert, { Loading as ExpertLoading } from '$containers/Expert'
  import Title from '$src/components/Title/index.svelte'
  
  export let mid: number
  export let vd: string

  let pageIdx: number = 1
  const pageSize: number = 10

  let initLoading: boolean = false
  let data: Awaited<ReturnType<typeof im.expertMatchArticle>>['data']['list'] = []
  let hasMoreData: boolean = false

  const fetchArticle = async ({ mid, vd }: { mid: number; vd: string }) => {
    try {
      const response = await im.expertMatchArticle({
        query: {
          mid,
          vd,
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

  const init = async ({ mid, vd}: { mid: number; vd: string }) => {
    try {
      initLoading = true
      await fetchArticle({ mid, vd })
    } catch (error) {
      data = []    
    } finally {
      initLoading = false
    }
  }

  $: if(mid && vd) init({ mid, vd })

</script>

{#if mid && vd}
  <div data-cid='OtherPredictions' class='rounded-t-[20px] bg-white'>
    <div class='px-4'>
      <Title>{$t('expert.planDetail.othersPrediction')}</Title>
    </div>

    {#if initLoading}
      <ExpertLoading length={5} />
    {:else}
      {@const filtered = data?.filter(item => item.expertId !== $params.expertId) || []}
      <div class='pl-[14px] pr-[20px] py-[20px] space-y-10'>
        {#if !filtered?.length}
          <Empty class='h-[300px]'/>
        {:else}
          <InfiniteScroll hasMore={hasMoreData} load={() => fetchArticle({ mid, vd })}>
            {#each filtered as prediction}
              <Expert prediction={prediction} /> 
            {/each}
          </InfiniteScroll>
        {/if}
      </div>
    {/if}
  </div>
{/if}