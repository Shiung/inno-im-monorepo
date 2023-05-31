<script lang="ts">
  import { onMount } from 'svelte'
  import Timer, { type TimerOptions, type TimeInfo } from 'utils/timer'

  let time1: TimeInfo
  let time2: TimeInfo

  const timer1 = new Timer({ start: Date.now(), type: 'countUp', tickCallback: (timeInfo) => (time1 = timeInfo) })
  const timer2 = new Timer({ start: Date.now(), end: Date.now() + 50 * 1000, type: 'countDown', tickCallback: (timeInfo) => (time2 = timeInfo) })

  time1 = timer1.currentTime
  time2 = timer2.currentTime
</script>

<div class='border rounded-xl px-5 py-4 mt-3 ml-4 w-fit'>
  <strong class='text-[30px]'>countUp timer</strong>

  <div class='space-x-3'>
    <span>{time1.year}y</span>
    <span>:</span>
    <span>{time1.month}m</span>
    <span>:</span>
    <span>{time1.day}d</span>
    <span>:</span>
    <span>{time1.hour}h</span>
    <span>:</span>
    <span>{time1.minute}m</span>
    <span>:</span>
    <span>{time1.second}s</span>
  </div>
</div>

<div class='border rounded-xl px-5 py-4 mt-3 ml-4 w-fit'>
  <strong class='text-[30px]'>countDown timer</strong>

  <div class='space-x-3'>
    <span>{time2.year}y</span>
    <span>:</span>
    <span>{time2.month}m</span>
    <span>:</span>
    <span>{time2.day}d</span>
    <span>:</span>
    <span>{time2.hour}h</span>
    <span>:</span>
    <span>{time2.minute}m</span>
    <span>:</span>
    <span>{time2.second}s</span>
  </div>
</div>