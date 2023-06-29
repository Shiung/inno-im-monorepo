<script lang="ts">
  import BetDetail from '$containers/BetDetail'
  import Loading from './Loading.svelte'
  import Empty from '$src/containers/Empty'

  import type { IFetchData, IBetOrder, ISelfOrder, IOtherOrder } from 'api/im/types'

  export let betData: IBetOrder
  export let fetchData: { loading: boolean; data: IFetchData }

  let uuid: string = ''

  const parseOtherData = (item: ISelfOrder | IOtherOrder) => {
    if ('uuid' in item) return item
    return { ...item, ...item.betOrder }
  }

  const handelActive = (event: CustomEvent) => {
    uuid = event.detail.uuid
    betData = event.detail
  }
</script>

{#if fetchData.loading}
  <Loading />
{:else}
  {@const list = fetchData?.data?.list || []}

  {#if list.length === 0}
    <Empty class="flex-1" />
  {:else}
    {#each list as item}
      {@const betItem = parseOtherData(item)}

      <BetDetail {uuid} {betItem} on:active={handelActive}>
        <slot {betItem} />
      </BetDetail>

    {/each}
  {/if}
{/if}
