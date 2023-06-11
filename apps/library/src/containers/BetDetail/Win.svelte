<script lang="ts">
  import { t } from '$stores'
  import { toThousandths } from 'utils/amount'
  import { getInfo } from '../Chatroom/context'

  import CurrencyIcon from '$components/CurrencyIcon/index.svelte'

  export let betItem

  const { userCurrency } = getInfo()
</script>

<div class="flex items-center">
  <div class="text-[#999]">{$t('chat.toWin')}</div>
  <div class="mx-[5px]"><CurrencyIcon currency={$userCurrency} size="20px" /></div>
  <div class="text-[18px]">{toThousandths(betItem.mayWinAmount)}</div>
</div>
