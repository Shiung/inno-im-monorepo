<script lang="ts">
  import BetDetail, { FollowUserInfo, Win, Market, BetOn, Ante, Date } from '$containers/BetDetail'
  import Loading from './Loading.svelte'
  import Empty from '$src/containers/Empty'

  import type { IChatroomOtherOrders } from 'api/im/types'

  export let betData: string
  export let other: { loading: boolean; data: IChatroomOtherOrders['res']['data'] }

  const components = [FollowUserInfo, Win, Market, BetOn, Ante, Date]

  const parseOtherData = (list: typeof other.data.list) =>
    list.map((item) => ({ ...item, ...item.betOrder }))

  let uuid: string = ''
  const handelActive = (event: CustomEvent) => {
    uuid = event.detail.uuid
    betData = event.detail
  }
</script>

{#if other.loading}
  <Loading />
{:else}
  {@const list = other?.data?.list || []}

  {#if list.length === 0}
    <Empty class="flex-1" />
  {:else}
    {#each parseOtherData(list) as item}
      <BetDetail {uuid} betItem={item} on:active={handelActive}>
        {#each components as component}
          <svelte:component this={component} betItem={item} />
        {/each}
      </BetDetail>
    {/each}
  {/if}
{/if}
