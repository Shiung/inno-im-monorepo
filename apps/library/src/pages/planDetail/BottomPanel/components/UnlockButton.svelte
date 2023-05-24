<script lang="ts">
  import { Button } from 'ui'
  import { t } from '$stores'

  import { amountThousandthTransformer } from 'utils/amount'
  import Lock from '../../images/lock.svg'

  export let coin: number
  export let onButtonClick

</script>

<Button
  data-cid='UnlockButton'
  class='w-[283px] bg-[rgba(var(--im-monorepo-primary))] rounded-[12px] h-[56px]'
  on:click={onButtonClick}
>
  <div class='space-y-1'>
    <div class='flex items-center space-x-1'>
      <Lock class='white-lock' width={18} height={18} />
      <span> {$t('expert.planDetail.unlockPrediction')} </span>
    </div>

    <div class='flex items-center space-x-1 text-white text-[12px] leading-[18px]'>
      <span> {$t('expert.planDetail.unlockPrediction')} </span>
      <span> {amountThousandthTransformer(coin)} </span>
    </div>
  </div>
</Button>