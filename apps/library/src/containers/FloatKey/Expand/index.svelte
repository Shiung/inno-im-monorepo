<script lang="ts">
  import { t, goVipCenterCallback } from '$stores'

  import Key from '../images/key.svg'
  import Arrow from '../images/arrow_right_small.svg'

  export let remainCount: number = 0
</script>

<div class="h-full flex justify-between items-center pr-[8px] overflow-hidden">
  <div class="w-[20px] h-[26px] flex items-center rounded-r-[5px] im-shadow">
    <Arrow width={18} height={18} fill="#BBB" />
  </div>
  <div>
    <Key width={33} height={36} />
  </div>
  <div class="text-[13px]">
    <div class="text-imprimary">{$t('user.unlockedKeyCount')} : { remainCount }</div>
    <div class="text-[#999] scale-[0.77] origin-left whitespace-nowrap">{$t('user.unlockedKeyRunOut')}</div>
  </div>
  <div
    class="flex justify-center items-center w-[84px] h-[36px] rounded-[12px] bg-imprimary text-white text-[12px]"
    on:click|stopPropagation={() => $goVipCenterCallback()}
    on:keypress
  >
    {$t('common.learnMore')}
  </div>
</div>
