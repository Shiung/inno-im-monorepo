<script lang="ts">
  import { t } from '$stores'
  import { amountThousandthTransformer } from 'utils/amount'

  import CurrencyIcon from '$components/CurrencyIcon/index.svelte'

  export let betItem

  const { currency } = betItem
</script>

<div class="flex items-center">
  <div class="text-[#999]">{$t('chat.toWin')}</div>

  <CurrencyIcon class="w-[20px] h-[20px] mx-[5px]" {currency} />

  <div class="text-[18px]">{amountThousandthTransformer(betItem.mayWinAmount)}</div>
</div>
