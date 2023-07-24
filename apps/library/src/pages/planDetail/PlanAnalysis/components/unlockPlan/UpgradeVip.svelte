<script lang="ts">
  import { t } from '$stores'
  import { userKeyInfo, userVipList, userInfo } from '$stores/user'
  import { diffTime } from '$stores/common'
  import { onDestroy } from 'svelte'
  import { twMerge } from 'tailwind-merge'

  import { fetchUserKeyInfo } from '$api/index'

  import { Button } from 'ui'
  import Modal, { Header } from 'ui/components/Modal'

  import { getLocalAlignTimestamp } from 'utils/convertDateAndTimestamp'
  import Timer, { type TimeInfo } from 'utils/timer'
  import type { VipGiftItem } from './type'

  import PopClose from '$assets/modal/pop_close_dark.svg'
  import vip from './images/vip.png'
  import diamond from './images/diamond.png'
  import envelope from './images/envelope.png'
  import gift from './images/gift.png'
  import key from './images/key.png'
  import treasure from './images/treasure.png'

  let show = false

  let vipGiftItem: VipGiftItem[] = []
  $: vipGiftItemLength = vipGiftItem.length

  $: {
    const vipList = $userVipList.find(({ level }) => level === $userInfo.userVip + 1)
    const { expertKey, levelUpgradeGift, monthlyGift, birthdayGift, luxuryGiftType } = vipList || {}

    if (vipList) {
      vipGiftItem = [
        {
          img: key,
          title: $t('user.expertKey'),
          content: expertKey
        },
        {
          img: treasure,
          title: $t('user.promotionBonus'),
          content: levelUpgradeGift
        },
        {
          img: envelope,
          title: $t('user.vipEnvelop'),
          content: monthlyGift
        },
        {
          img: gift,
          title: $t('user.birthdayBonus'),
          content: birthdayGift
        },
        {
          img: diamond,
          title: $t('user.exclusiveGift'),
          content: luxuryGiftType
        }
      ]
    }
  }

  let time: TimeInfo
  let isFinish: boolean = false

  const timer = new Timer({
    start: getLocalAlignTimestamp($diffTime),
    end: $userKeyInfo.keyCdList[0],
    type: 'countDown',
    tickCallback: (timeInfo) => {
      time = timeInfo
      isFinish = Object.values(timeInfo).every((val) => Number(val) === 0)
    },
    paddedNum: true
  })

  time = timer.currentTime
  timer.start()

  $: if (isFinish) fetchUserKeyInfo();

  onDestroy(() => {
    timer.stop()
  })
</script>

<div>
  <Button
    disabled={!vipGiftItemLength}
    class={twMerge('w-full min-h-[56px] rounded-[12px] text-sm', !vipGiftItemLength && '!bg-[#BBBBBB]')}
    on:click={() => (show = true)}
  >
    <p>
      {$t('user.unlockedKeyCount')}:
      <span class="w-[60px] inline-block">{time.hour}:{time.minute}:{time.second}</span>
    </p>
    {#if vipGiftItemLength}
      <p>{$t('user.upgradeVipGetKey')}</p>
    {/if}
  </Button>

  <Modal bind:show class="relative px-6 pb-5">
    <div on:click={() => (show = false)} on:keypress>
      <PopClose class="absolute right-0 -top-1 z-[1]" width={30} height={30} />
    </div>
    <img class="absolute right-0 -top-7 w-[168px] h-[84px]" src={vip} alt="" />
    <Header variant="mark" class="text-2xl text-left w-full mb-2">{$t('common.prompt')}</Header>
    <p class="text-[#666666] text-left w-full mb-5">{$t('user.upgradeVIPContent')}</p>
    <ul class="grid grid-cols-2 gap-4 w-full mb-10">
      {#each vipGiftItem as item}
        {@const { img, title, content } = item}

        <li class="flex">
          <div class="bg-[rgba(76,158,234,0.1)] w-[40px] h-[40px] relative rounded-full">
            <img class="w-[26px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" src={img} alt="" />
          </div>
          <div class="ml-[10px] mt-1">
            <p class="text-xs font-bold mb-1">{title}</p>
            <p class="text-xs text-[rgb(var(--im-monorepo-primary))]">{content}</p>
          </div>
        </li>
      {/each}
    </ul>
    <Button class="h-[44px] w-full text-base rounded-xl" on:click={() => (show = false)}>{$t('user.goUpgradeVIP')}</Button>
  </Modal>
</div>
