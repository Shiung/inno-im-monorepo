<script lang="ts">
  import { FollowUserInfo, Win, Market, BetOn, Ante, Date } from '$containers/BetDetail'

  import type { IBetOrder } from 'api/im/types'

  export let betItem: IBetOrder
  
  const components = [FollowUserInfo, Win, Market, BetOn, Ante, Date]

</script>

{#each components as component}
  <svelte:component this={component} {betItem} />
{/each}
