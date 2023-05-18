<script lang="ts">
  import type { IArticleDetail } from 'api/im/types'
  import { t } from '$stores'
  import Lock from './images/lock.svg'
  import TeamOdds from './components/TeamOdds.svelte'
  export let data: IArticleDetail
</script>

<div class="bg-transparent px-3 pb-3">
  <div class="flex flex-col items-center rounded-[10px] bg-[#f7f8f9] px-3 pt-2 space-y-5">
    <div class="w-full flex space-x-2">
      <TeamOdds data={data} type='home' class='flex-1' />

      <TeamOdds data={data} type='away' class='flex-1' />
    </div>

    <div class="text-center">
      <p class="text-sm font-semibold text-[#333]">
        <Lock class='inline-block align-middle' width={20} height={20} />
        <span class='inline-block align-middle'> {$t('expert.planDetail.planStillLocked')} </span>
      </p>

      <span class='inline-block text-[12px] leading-[18px] text-[#666] mb-[30px]'> {$t('expert.planDetail.unlockDescription')} </span>
    </div>
  </div>
</div>