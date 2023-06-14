<script lang='ts'>
import { im } from 'api'
import { Ripple } from 'ui'
import { t } from '$stores'
import { params } from 'svelte-spa-router'

import Title from '$src/components/Title/index.svelte'
import Empty from '$src/containers/Empty'

import List from './components/List.svelte'
import Loading from './components/Loading.svelte'

import Filter from '../../images/filter.svg'

const promise = im.expertArticleHistory({ query: { expertId: $params.expertId, pageIdx: 1, pageSize: 10 }})
</script>

<div>
  <div class='flex items-center justify-between'>
    <Title> {$t('expert.plan.history')} </Title>
    <Ripple class='flex items-center justify-center w-[32px] h-[32px] rounded-full'
      on:click={() => console.log('Filter')}
    >
      <Filter width={20} height={20} fill='#333333' />
    </Ripple>
  </div>

  {#await promise}
    <Loading />
  {:then response}
    {#if !response?.data?.list?.length}
      <Empty class='h-[200px]' />
    {:else}
      <List articles={response.data.list} />
    {/if}
  {:catch}
    <Empty class='h-[200px]' />
  {/await}
</div>
