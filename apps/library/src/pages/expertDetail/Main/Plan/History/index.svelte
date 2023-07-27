<script lang="ts">
  import { im } from 'api'
  import { Ripple } from 'ui'
  import { t, locale, userAuth, showErrorMsgModal } from '$stores'
  import { params } from 'svelte-spa-router'
  import { onMount } from 'svelte'

  import InfiniteScroll from 'ui/components/InfiniteScroll'

  import Title from '$src/components/Title/index.svelte'
  import Empty from '$src/containers/Empty'

  import List from './components/List.svelte'
  import Loading from './components/Loading.svelte'

  import Filter from '../../images/filter.svg'

  import { CODE_STATUS_OK } from '$src/constant'

  let pageIdx: number = 1
  const pageSize: number = 10

  let data: Awaited<ReturnType<typeof im.expertArticleHistory>>['data']['list'] = []
  let hasMoreData: boolean = false
  let initLoading: boolean = false

  const fetchHistory = async (token) => {
    if (!token) return

    try {
      const response = await im.expertArticleHistory({
        query: { expertId: $params.expertId, pageIdx, pageSize },
        headers: { 'Accept-Language': $locale }
      })

      if (response.code !== CODE_STATUS_OK) return showErrorMsgModal.set(true)

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
      await fetchHistory($userAuth.userToken)
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

<div>
  <div class="flex items-center justify-between">
    <Title>{$t('expert.plan.history')}</Title>
    <Ripple
      class="flex items-center justify-center w-[32px] h-[32px] rounded-full"
      on:click={() => console.log('Filter')}
    >
      <Filter width={20} height={20} fill="#333333" />
    </Ripple>
  </div>

  {#if initLoading}
    <Loading />
  {:else }
    {#if !data.length}
      <Empty class="h-[200px]" />
    {:else}
      <InfiniteScroll hasMore={hasMoreData} load={fetchHistory}>
        <List articles={data} />
      </InfiniteScroll>
    {/if}
  {/if}
</div>
