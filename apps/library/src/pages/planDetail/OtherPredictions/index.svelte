<script lang="ts">
  import { im } from 'api'
  import { t } from '$stores'

  import ExpertList, { Loading } from '$containers/ExpertList'
  import Title from '$src/components/Title/index.svelte'
  
  export let mid: number
  export let vd: string

  let promise: ReturnType<typeof im.expertMatchArticle>

  $: if(mid && vd) {
    promise = im.expertMatchArticle({ query: { mid, vd }})
  }
</script>

{#if mid && vd}
  <div data-cid='OtherPredictions' class='rounded-t-[20px] bg-white'>
    <div class='px-4'>
      <Title>{$t('expert.planDetail.othersPrediction')}</Title>
    </div>

    {#await promise}
      <Loading />
    {:then response}
      <ExpertList list={response?.data?.list || []} />
    {/await}
  </div>
{/if}