<script lang="ts">
  import { t } from '$stores'
  import { toThousandths } from 'utils/amount'
  import { getInfo } from '../Chatroom/context'

  import CurrencyIcon from '$components/CurrencyIcon/index.svelte'

  export let betItem

  const { userCurrency } = getInfo()
</script>

<div class="flex items-center">
  <div class="text-[#999]">{$t('chat.bet')}</div>
  <CurrencyIcon currency={$userCurrency} size="15px" />
  <div class="text-[rgb(var(--im-monorepo-primary))] text-[14px]">
    {toThousandths(betItem.totalAnte)}
  </div>
</div>
