<script lang="ts">
  import BetDetail, { Win, Market, BetOn, Ante, Date } from '$containers/BetDetail'
  import data from './data.json'
  import Empty from '$src/containers/Empty'
  export let betData: string

  const components = [Win, Market, BetOn, Ante, Date]
  let uuid: string = ''
  const handelActive = (event: CustomEvent) => {
    uuid = event.detail.uuid
    betData = event.detail
  }
</script>

<!-- <Empty class="flex-1" />  -->

{#each data as item}
  <BetDetail {uuid} betItem={item} on:active={handelActive}>
    {#each components as component}
      <svelte:component this={component} betItem={item} />
    {/each}
  </BetDetail>
{/each}
