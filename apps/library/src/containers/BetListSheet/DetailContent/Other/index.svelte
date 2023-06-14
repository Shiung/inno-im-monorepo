<script lang="ts">
  import BetDetail, { FollowUserInfo, Win, Market, BetOn, Ante, Date } from '$containers/BetDetail'
  import data from './data.json'
  import Empty from '$src/containers/Empty'

  const components = [FollowUserInfo, Win, Market, BetOn, Ante, Date]
  let uuid: string = ''
  const Data = data.map((item) => ({ ...item, ...item.betOrder }))
</script>

<!-- <Empty class="flex-1" />  -->

{#each Data as item}
  <BetDetail {uuid} betItem={item} on:active={(event) => (uuid = event.detail)}>
    {#each components as component}
      <svelte:component this={component} betItem={item} />
    {/each}
  </BetDetail>
{/each}
