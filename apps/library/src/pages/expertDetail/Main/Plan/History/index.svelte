<script lang='ts'>
import { im } from 'api'
import { Ripple } from 'ui'
import { t } from '$stores'

import Title from '../../components/Title.svelte'
import Filter from '../../images/filter.svg'
import ExpertArticleLoading from '../../components/ExpertArticle/Loading.svelte'
import ExpertArticle from '../../components/ExpertArticle/index.svelte'

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
    <ExpertArticleLoading />
  {:then articles}
    <ExpertArticle data={articles?.data?.list} />
  {/await}
</div>
