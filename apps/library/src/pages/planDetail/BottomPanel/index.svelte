<script lang="ts">
  import { Button } from 'ui'
  import { t } from '$stores'

  import { amountThousandthTransformer } from 'utils/amount'
  import Lock from '../PlanAnalysis/images/lock.svg'

  export let coin: number
  export let onButtonClick

  let dom: HTMLDivElement
  $: height = dom?.getBoundingClientRect() && `${dom?.getBoundingClientRect()?.height}px` || `0px`
</script>

<div data-cid='UnlockBottomPanel'>
  <div bind:this={dom} class='fixed z-10 bottom-0 left-0 right-0'>
    <div class='p-4 rounded-t-[20px] shadow-[0_0_10px_0_rgba(0,0,0,0.1)] bg-white'>
      <Button class='w-[283px] bg-[rgba(var(--im-monorepo-primary))] rounded-[12px] h-[56px]' on:click={onButtonClick}>
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
    </div>
  </div>
  <div style:height={height}></div>
</div>

<style lang='scss'>
  :global(.white-lock > use) {
    fill: white;
  }
</style>