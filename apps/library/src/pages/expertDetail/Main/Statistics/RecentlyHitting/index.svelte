<script lang="ts">
  import { params } from 'svelte-spa-router'
  import { onMount } from 'svelte'
  import { t, locale } from '$stores'
  import { im } from 'api'

  import InfiniteScroll from 'ui/components/InfiniteScroll'

  import Title from '$components/Title/index.svelte'
  import Empty from '$containers/Empty'
  import ExpertArticle from '$containers/ExpertArticle/index.svelte'

  import Loading from './components/Loading.svelte'

  let pageIdx: number = 1
  const pageSize: number = 10

  let initLoading: boolean = false
  let data: Awaited<ReturnType<typeof im.expertArticleHit>>['data']['list'] = []
  let hasMoreData: boolean = false

  const fetchHit = async () => {
    try {
      const response = await im.expertArticleHit({
        query: {
          expertId: $params?.expertId,
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

  const init = async () => {
    try {
      initLoading = true
      await fetchHit()
    } catch (error) {
      data = []
    } finally {
      initLoading = false
    }
  }

  onMount(() => {
    init()
  })
</script>

<div class="px-4">
  <Title>{$t('expert.statistics.recentHitRecord')}</Title>
</div>

<div class="px-3 mb-3">
  {#if initLoading}
    <Loading />
  {:else if data?.length === 0}
    <Empty class="h-[300px]" />
  {:else}
    <InfiniteScroll hasMore={hasMoreData} load={fetchHit}>
      {#each data as article}
        <ExpertArticle {article} class="mb-3" hideStamp expertId={$params.expertId} />
      {/each}
    </InfiniteScroll>
  {/if}
</div>
