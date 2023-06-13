<script lang="ts">
  import { t } from '$stores'
  import parseMarketName from './utils/parseMarketName'
  import sportMarketSummary from './sportMarketSummary.json'

  export let betItem

  const { marketType } = betItem

  const { sid, betOn, conditions, market, homeName, awayName, outright } = betItem.details[0]

  const { marketTitle } = parseMarketName({
    info: { sid, betOn, k: conditions, market, homeName, awayName, outright },
    sportMarketSummary
  })
</script>

<div class="flex justify-between">
  <span>{marketTitle}</span>
  <span>{marketType && $t(`chat.marketType_${marketType}`)}</span>
</div>
