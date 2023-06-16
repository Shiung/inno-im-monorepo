<script lang="ts">
  import { im } from 'api'
  import { t, locale } from '$stores'

  import Empty from '$containers/Empty'
  import Expert, { Loading as ExpertLoading } from '$containers/Expert'
  import Title from '$src/components/Title/index.svelte'
  
  export let mid: number
  export let vd: string

  let promise: ReturnType<typeof im.expertMatchArticle>

  $: if(mid && vd) {
    promise = im.expertMatchArticle({ query: { mid, vd }, headers: { 'Accept-Language': $locale }})
  }
</script>

{#if mid && vd}
  <div data-cid='OtherPredictions' class='rounded-t-[20px] bg-white'>
    <div class='px-4'>
      <Title>{$t('expert.planDetail.othersPrediction')}</Title>
    </div>

    {#await promise}
      <ExpertLoading length={5} />
    {:then response}
      {@const list = response?.data?.list || []}
      <div class='pl-[14px] pr-[20px] py-[20px] space-y-10'>
        {#if list.length === 0}
          <Empty class='h-[300px]'/>
        {:else}
          {#each list as prediction}
            <Expert prediction={prediction} /> 
          {/each}
        {/if}
      </div>
    {/await}
  </div>
{/if}