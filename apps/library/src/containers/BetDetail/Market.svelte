<script lang="ts">
  import { t } from '$stores'
  import parseMarketName from './utils/parseMarketName'
  import { getOrdersInfo } from '$containers/Chatroom/context'

  export let betItem
  export let showMarketType: boolean = true

  const { sportMarketSummary } = getOrdersInfo()

  const { marketType } = betItem

  const { sid, betOn, conditions, market, homeName, awayName, outright } = betItem.details[0]

  const { marketTitle } = parseMarketName({
    info: { sid, betOn, k: conditions, market, homeName, awayName, outright },
    sportMarketSummary: $sportMarketSummary
  })
</script>

<div class="flex justify-between">
  <span>{marketTitle}</span>
  {#if showMarketType}
    <span>{marketType && $t(`chat.marketType_${marketType}`)}</span>
  {/if}
</div>
