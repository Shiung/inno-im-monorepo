<script lang='ts'>
import { im } from 'api'
import { t, locale, userAuth, showErrorMsgModal } from '$stores'
import { params } from 'svelte-spa-router'
import  { onMount } from 'svelte'

import Empty from '$src/containers/Empty'
import Title from '$src/components/Title/index.svelte'

import Loading from './components/Loading.svelte'
import List from './components/List.svelte'

import { CODE_STATUS_OK } from '$src/constant'

let promise: ReturnType<typeof im.expertArticleNow>

onMount(() => {
  if ($userAuth.userToken) {
    promise = im.expertArticleNow({
      query: { expertId: $params.expertId },
      headers: { 'Accept-Language': $locale }
    })

    promise.then((res) => {
      if (res?.code !== CODE_STATUS_OK) showErrorMsgModal.set(true)
    })
  }
})
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
