<script lang='ts'>
import MarketBadget from '$src/components/MarketBadget'

import type { IMarket } from 'api/im/types/common'
export let market: IMarket

</script>

<div>
  <MarketBadget status={market.status} />
</div>
