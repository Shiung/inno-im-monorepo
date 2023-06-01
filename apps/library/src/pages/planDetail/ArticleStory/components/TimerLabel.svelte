<script lang="ts">
  import type { TimeInfo } from 'utils'
  import { time } from '../../store'

  const format = (timeInfo: TimeInfo) => {
    if(!timeInfo) return
    const { hour, minute, second } = timeInfo
    const formatHour = ('0' + hour).slice(-2)
    const formatMinute = ('0' + minute).slice(-2)
    const formatSecond = ('0' + second).slice(-2)
    return `${formatHour}:${formatMinute}:${formatSecond}`
  }

  $:formatTime = format($time)
</script>

{#if $time}  
  <div
    data-cid="TimerLabel"
    class="px-1 bg-[rgba(var(--im-monorepo-primary)_/_0.1)] rounded text-[rgba(var(--im-monorepo-primary))] text-[10px] leading-[15px]"
  >
    {formatTime}
  </div>
{/if}
