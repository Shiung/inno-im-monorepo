<script lang="ts">
  import BetDetail, { Win, Market, BetOn, Ante, Date } from '$containers/BetDetail'
  import Loading from './Loading.svelte'
  import Empty from '$src/containers/Empty'

  import type { IChatroomSelfOrders } from 'api/im/types'

  export let betData: string
  export let self: { loading: boolean; data: IChatroomSelfOrders['res']['data'] }

  const components = [Win, Market, BetOn, Ante, Date]

  let uuid: string = ''
  const handelActive = (event: CustomEvent) => {
    uuid = event.detail.uuid
    betData = event.detail
  }
</script>

{#if self.loading}
  <Loading />
{:else if self?.data?.list.length === 0}
  <Empty class="flex-1" />
{:else}

  {#each self?.data?.list as item}
    <BetDetail {uuid} betItem={item} on:active={handelActive}>
      {#each components as component}
        <svelte:component this={component} betItem={item} />
      {/each}
    </BetDetail>
  {/each}

{/if}
