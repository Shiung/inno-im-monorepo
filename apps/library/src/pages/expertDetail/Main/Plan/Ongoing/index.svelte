<script lang='ts'>
import { im } from 'api'
import { t, locale, userAuth } from '$stores'
import { params } from 'svelte-spa-router'

import Empty from '$src/containers/Empty'
import Title from '$src/components/Title/index.svelte'

import Loading from './components/Loading.svelte'
import List from './components/List.svelte'

let promise: ReturnType<typeof im.expertArticleNow>

$: if ($userAuth.userToken) {
  promise = im.expertArticleNow({
    query: { expertId: $params.expertId },
    headers: { 'Accept-Language': $locale }
  })
}
</script>

<div>
  <Title> {$t('expert.plan.ongoing')} </Title>

  {#await promise}
    <Loading />

  {:then now}
    {#if !now?.data?.list?.length}
      <Empty class='h-[200px]' />
    {:else}
      <List articles={now?.data?.list} />
    {/if}
  {:catch}
    <Empty class='h-[200px]' />
  {/await}
</div>
