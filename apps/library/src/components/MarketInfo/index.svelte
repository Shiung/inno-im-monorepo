<script lang="ts">
import type { IPredictionMarket } from 'api/im/types/common'
import MarketBadget from '$src/components/MarketBadget'
export let market: IPredictionMarket

// const mlType = (_type: IMarket['type']) => {
//   if (_type === 'h')
// }

// const betTypeGenerator = (_market: IMarket) => {
//   switch (_market.status) {
//     case '11':
//     case '21':
//       mlType(_market.type)
//   }
// }

// $: betType = betTypeGenerator(market)

</script>

<div>
  <MarketBadget marketType={'11'} />
  <div> {'betType'} </div>
 </div>