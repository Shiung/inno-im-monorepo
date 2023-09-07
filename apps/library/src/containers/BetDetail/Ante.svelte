<script lang="ts">
  import { t } from '$stores'
  import { amountThousandthTransformer } from 'utils/amount'

  import CurrencyIcon from '$components/CurrencyIcon/index.svelte'
  import { CurrencyMap } from '$containers/BetListSheet/constant'

  export let betItem
  export let color: string = 'rgb(var(--im-monorepo-primary))'

  const { currency, totalAnte } = betItem
</script>

<div class="flex items-center">
  <div class="text-[#999]">{$t('chat.bet')}</div>

  <CurrencyIcon class="w-[15px] h-[15px] mx-[5px]" {currency} />

  <div class="text-[14px]" style:color>
    {amountThousandthTransformer(totalAnte, { decimal: CurrencyMap[currency]?.decimal, trimZero: true })}
  </div>
</div>
