<script lang="ts">
  import { twMerge } from 'tailwind-merge'
  import { t } from '$stores'
  import { amountThousandthTransformer } from 'utils/amount'

  import CurrencyIcon from '$components/CurrencyIcon/index.svelte'

  export let betItem
  export let amountSize: string = '18px'
  export let textColor: string = '#999'

  const { currency, details, cashOut, mayWinAmount, netWin } = betItem
  const settle = details[0].settle !== 0 || cashOut
</script>

<div class={twMerge('flex items-center font-semibold', $$props.class)}>
  {#if settle}
    <CurrencyIcon class="w-[15px] h-[15px] mr-[5px]" {currency} />

    <div class="text-[18px] text-[#cb0202]">
      {amountThousandthTransformer(netWin, {
        format: { prefix: netWin > 0 ? '+' : '' },
        decimal: 0
      })}
    </div>
  {:else}
    <div style:color={textColor}>{$t('chat.toWin')}</div>

    <CurrencyIcon class="w-[20px] h-[20px] mx-[5px]" {currency} />

    <div style:font-size={amountSize}>
      {amountThousandthTransformer(mayWinAmount)}
    </div>
  {/if}
</div>
