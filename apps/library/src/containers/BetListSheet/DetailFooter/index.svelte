<script lang="ts">
  import { getInfo } from '$containers/Chatroom/context'
  import { CurrencyMap } from '../constant'
  import { t } from '$stores'

  const { userCurrency } = getInfo()

  $: ({ minBet, displayName } = CurrencyMap[$userCurrency])
</script>

<div
  class="flex justify-between items-center h-[83px] text-[12px] shadow-[0_0_6px_0_rgba(0,0,0,.1)] pl-[20px] pr-[16px]"
>
  <div>{$t('chat.greaterThanBets', { currency: displayName, minBet })}</div>
  <div class="rounded-[22px] px-[16px] bg-[#ddd] text-white leading-[30px]">
    {$t('chat.betList')}
  </div>
</div>
