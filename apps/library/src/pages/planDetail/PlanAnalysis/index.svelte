<script lang="ts">
  import { t } from '$stores'
  import type { IArticleDetail } from 'api/im/types'
  
  import TeamOdds from './components/TeamOdds.svelte'
  import UnlockPlan from './components/unlockPlan/index.svelte';
  
  import Lock from '$assets/lock.svg'

  export let data: IArticleDetail
  export let isLocked: boolean
</script>

<div data-cid='PlanAnalysis' class="bg-transparent px-3 pb-3">
  <div class="flex flex-col items-center rounded-[10px] bg-[#f7f8f9] px-3 pt-2">
    <div class="w-full flex space-x-2">
      <TeamOdds data={data} type='home' isLocked={isLocked} class='flex-1' />

      <TeamOdds data={data} type='away' isLocked={isLocked} class='flex-1' />
    </div>

    {#if isLocked}
      <div class="text-center mt-5">
        <p class="text-sm font-semibold text-[#333]">
          <Lock class='inline-block align-middle' width={20} height={20} />
          <span class='inline-block align-middle'> {$t('expert.planDetail.planStillLocked')} </span>
        </p>

        <span class='inline-block text-[12px] leading-[18px] text-[#666] mb-[15px]'> {$t('expert.planDetail.unlockDescription')} </span>
       <div class="mb-3">
          <UnlockPlan />
       </div>
      </div>
    {:else}
      <div class="mt-3">
        <span class='inline-block text-[12px] leading-[21px] text-[#666] mb-[12px]'> {data?.content} </span>
      </div>
    {/if}

  </div>
</div>