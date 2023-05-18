<script lang='ts'>
import { im } from 'api'
import { Ripple } from 'ui'
import { t } from '$stores'

import List from './components/List.svelte'
import Loading from './components/Loading.svelte'

import Title from '$src/components/Title/index.svelte'
import Filter from '../../images/filter.svg'

export let expertId: string
const promise = im.expertArticleHistory({ query: { expertId, pageIdx: 1, pageSize: 10 }})
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
  {:then articles}
    <List articles={articles.data.list} />
  {/await}

</div>
