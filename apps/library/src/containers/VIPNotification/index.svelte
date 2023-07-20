<script lang='ts'>
  import { convertDateAndTimestamp } from 'utils'
  import unlock_idle from './images/unlock_idle.png'
  import Modal from 'ui/components/Modal'
  import { t, userInfo, userAuth } from '$stores'

  let open: boolean = false

  const keyOfLocalStorage: string = 'imVIPNotify'
  const diffTime: number = 0
  let expertKey: number = 0

  const setExpiredStore = (ts: number) => localStorage.setItem(keyOfLocalStorage, JSON.stringify(ts))

  const checkExpired = () => {
    const expiredStorage = localStorage.getItem(keyOfLocalStorage)
    const currentTime = convertDateAndTimestamp.getLocalAlignTimestamp(diffTime)
    if (!expiredStorage || Number(expiredStorage) < currentTime) {
      const endTimets = convertDateAndTimestamp.getEndDate(convertDateAndTimestamp.transformUTCTime(currentTime)).valueOf()
      setExpiredStore(endTimets)
      open = true
    } else {
      // 今日顯示過 美東時區
    }
  }

  $: if (!$userAuth.userToken) checkExpired()

</script>


<Modal variant="clean" bind:show={open} closeOnDismiss>
  <div class='w-[345px] relative'>
    <img src={unlock_idle} alt='lock' class='w-full' />
    <div class='absolute top-0 left-0 flex flex-col items-center w-full pt-[76px]'>
      <div class='text-[26px] leading-[26px] text-white vip'>VIP{$userInfo.userVip}</div>
      <div class='text-[36px] leading-[36px] text-white font-bold mt-[15px] freeLock'>{$t('expert.unlockForFree')}</div>
      <div class='text-[20px] leading-[20px] text-white mt-[15px]'>{$t('user.dailyAmount', { count: expertKey })}</div>
      <div class='text-[21px] leading-[21px] text-white mt-[80px] goto'>{$t('common.checkOutNow')}</div>
    </div>
  </div>
</Modal>


<style lang='scss'>
  .vip {
    text-shadow: 0px 3px 1px rgba(145, 78, 1, 0.8);
  }
  .freeLock {
    text-shadow: 0px 3px 1px rgba(145, 78, 1, 0.8);
  }
  .goto {
    text-shadow: 0px 3px 1px rgba(145, 78, 1, 0.8);
  }
</style>
