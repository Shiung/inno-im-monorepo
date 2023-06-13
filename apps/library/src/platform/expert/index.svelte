<script lang="ts" context="module">
  import { writable } from 'svelte/store'
  import type { GoToExpertDetail, GoToPlanDetail } from '$containers/Expert/type'

  let sid = writable(null)
  export const setSid = (sidValue: number) => {
    if (typeof sidValue !== 'number') return console.warn('setSid parameter MUST be type of number')

    sid.set(sidValue)
  }

  let goToExpertDetail = writable<GoToExpertDetail>(null)
  export const setGoToExpertDetail = (callback: GoToExpertDetail) =>
    goToExpertDetail.update((_) => callback)

  let goToPlanDetail = writable<GoToPlanDetail>(null)
  export const setGoToPlanDetail = (callback: GoToPlanDetail) =>
    goToPlanDetail.update((_) => callback)
</script>

<script lang="ts">
  import { im } from 'api'

  import Expert, { Loading as ExpertLoading } from '$containers/Expert'
  import Empty from '$src/containers/Empty'

  let predictionsPromise: ReturnType<typeof im.expertPredictions>

  const fetchPredictions = (sid: number) => {
    if (sid == null) return
    predictionsPromise = im.expertPredictions({
      query: {
        ...(sid && { sid }),
        type: 0,
        pageIdx: 1,
        pageSize: 10
      }
    })
  }

  $: fetchPredictions($sid)
</script>

<div class="bg-white">
  {#await predictionsPromise}
    <ExpertLoading length={5} />
  {:then response}
    {@const list = response?.data?.list || []}

    <div class="pl-[14px] pr-[20px] py-[20px] space-y-10">
      {#if list.length === 0}
        <Empty class="h-[300px]" />
      {:else}
        {#each list as prediction}
          <Expert
            {prediction}
            goToExpertDetailCallback={$goToExpertDetail}
            goToPlanDetailCallback={$goToPlanDetail}
          />
        {/each}
      {/if}
    </div>
  {:catch}
    <Empty class="h-[300px]" />
  {/await}
</div>
