<script lang="ts">
  import { t } from '$stores'
  import { amountThousandthTransformer } from 'utils/amount'

  import CurrencyIcon from '$components/CurrencyIcon/index.svelte'

  export let betItem

  const { currency, details, cashOut, mayWinAmount, netWin } = betItem
  const settle = details[0].settle !== 0 || cashOut
</script>

<div class="flex items-center font-semibold">
  {#if settle}
    <CurrencyIcon class="w-[15px] h-[15px] mr-[5px]" {currency} />

    <div class="text-[18px] text-[#cb0202]">
      {amountThousandthTransformer(netWin, {
        format: { prefix: netWin > 0 ? '+' : '' },
        decimal: 0
      })}
    </div>
  {:else}
    <div class="text-[#999]">{$t('chat.toWin')}</div>

    <CurrencyIcon class="w-[20px] h-[20px] mx-[5px]" {currency} />

    <div class="text-[18px]">{amountThousandthTransformer(mayWinAmount)}</div>
  {/if}
</div>
