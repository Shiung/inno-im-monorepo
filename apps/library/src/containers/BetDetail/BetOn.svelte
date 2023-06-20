<script lang="ts">
  import parseMarketName from './utils/parseMarketName'
  import CornerKickImg from './images/corner-kick.png'
  import { getOrdersInfo } from '$containers/Chatroom/context'
  import { amountThousandthTransformer } from 'utils/amount'

  export let betItem

  const { sportMarketSummary } = getOrdersInfo()

  const {
    sid,
    betOn,
    conditions,
    odds,
    market,
    homeName,
    awayName,
    homeScore,
    awayScore,
    outright
  } = betItem.details[0]

  const { betOnName } = parseMarketName({
    info: { sid, betOn, k: conditions, market, homeName, awayName, outright },
    sportMarketSummary: $sportMarketSummary
  })

  const cornerKick = market.includes('cr')
</script>

<div class="flex font-semibold">
  <span class="mr-[3px]">{betOnName}</span>
  <span class="mr-[3px]">{`@${amountThousandthTransformer(odds, { decimal: 2 })}`}</span>

  {#if cornerKick}
    <img class="w-[20px] h-[20px] mx-[5px]" src={CornerKickImg} alt="" />
  {/if}

  <span class="ml-[6px] text-[rgb(var(--im-monorepo-primary))]">
    {`(${homeScore}-${awayScore})`}
  </span>
</div>
