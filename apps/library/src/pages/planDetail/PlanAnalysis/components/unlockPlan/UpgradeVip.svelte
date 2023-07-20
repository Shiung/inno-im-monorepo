<script lang="ts">
  import { t } from '$stores'
  import { userKeyInfo } from '$stores/user'
  import { onDestroy, onMount } from 'svelte'

  import { Button } from 'ui'
  import Modal, { Header, Mark } from 'ui/components/Modal'

  import { getTimeWithSeconds, getTimeDifference } from 'utils/convertDateAndTimestamp'

  let show = false
  let time: string

  const setTime = () => {
    time = getTimeWithSeconds(getTimeDifference($userKeyInfo.keyCdList[0]))
  }

  const interval = setInterval(setTime, 1000)

  onMount(() => {
    setTime()
  })

  onDestroy(() => {
    clearInterval(interval)
  })
</script>

<div>
  <Button class="w-full min-h-[56px] rounded-[12px] text-sm" on:click={() => (show = true)}>
    <p>{$t('user.unlockedKeyCount')}: <span class="w-[60px] inline-block">{time}</span></p>
    {$t('user.upgradeVipGetKey')}
  </Button>
</div>
