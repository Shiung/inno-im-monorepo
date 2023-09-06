<script lang="ts">
  import { twMerge } from 'tailwind-merge'
  import { t } from '$stores'
  import { amountThousandthTransformer } from 'utils/amount'

  import CurrencyIcon from '$components/CurrencyIcon/index.svelte'
  import { CurrencyMap } from '$containers/BetListSheet/constant'

  export let betItem
  export let chatMessage = false

  const { currency, details, cashOut, mayWinAmount, netWin } = betItem
  const settle = details[0].settle !== 0 || cashOut
</script>

<div class={twMerge('flex items-center font-semibold', $$props.class)}>
  {#if settle}
    <CurrencyIcon class="w-[15px] h-[15px] mr-[5px]" {currency} />

    <div class="text-[18px] text-[#cb0202]">
      {amountThousandthTransformer(netWin, {
        decimal: CurrencyMap[currency].decimal,
        trimZero: true,
        format: {
          prefix: netWin > 0 ? '+' : '',
          decimalSeparator: '.',
          groupSeparator: ',',
          groupSize: 3
        }
      })}
    </div>
  {:else}
    <div class={chatMessage ? 'rgb(var(--im-monorepo-primary))' : 'text-[#999]'}>
      {$t('chat.toWin')}
    </div>

    <CurrencyIcon class="w-[20px] h-[20px] mx-[5px]" {currency} />

    <div class={chatMessage ? 'text-[22px]' : 'text-[18px]'}>
      {amountThousandthTransformer(mayWinAmount, { decimal: CurrencyMap[currency].decimal, trimZero: true })}
    </div>
  {/if}
</div>
