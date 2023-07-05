<script lang="ts">
  import { Win, ResultIcon, Market, BetOn, Ante, CashOut, Date } from '$containers/BetDetail'

  import type { IBetOrder } from 'api/im/types'

  export let betItem: IBetOrder

  const components = [Win, ResultIcon, Market, BetOn, Ante, CashOut, Date]
</script>

{#each components as component}
  <svelte:component this={component} {betItem} />
{/each}
