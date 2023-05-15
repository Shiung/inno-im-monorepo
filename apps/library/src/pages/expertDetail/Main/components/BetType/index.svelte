<script lang='ts'>
import MarketBadget from '$src/components/MarketBadget'

import type { IPredictionMarket } from 'api/im/types/common'
export let market: IPredictionMarket

</script>

<div>
  <MarketBadget marketType={market.marketType} />
</div>
