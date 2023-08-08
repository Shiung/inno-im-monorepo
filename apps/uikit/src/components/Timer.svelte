<script lang="ts">
  import Timer, { type TimeInfo } from 'utils/timer'

  let time1: TimeInfo
  let time2: TimeInfo
  let time3: TimeInfo

  const timer1 = new Timer({ start: Date.now(), type: 'countUp', tickCallback: (timeInfo) => (time1 = timeInfo) })
  const timer2 = new Timer({ start: '2022-12-31 00:00:00', end: '2022-12-31 00:00:10', type: 'countDown', tickCallback: (timeInfo) => (time2 = timeInfo) })
  const timer3 = new Timer({ start: Date.now(), end: Date.now() + 7 * 1000, type: 'countDown', tickCallback: (timeInfo) => (time3 = timeInfo), paddedNum: true })
  // setTimeout(() => {
  //   console.time('long settimeout')
  //   for(let i = 0; i < 2000000000; i++) {}
  //   console.timeEnd('long settimeout')
  // }, 2000)
  time1 = timer1.currentTime
  time2 = timer2.currentTime
  time3 = timer3.currentTime

  timer1.start()
  timer2.start()
  timer3.start()

  const start = (timer: Timer) => {
    timer.start()
  }
  const stop = (timer: Timer) => {
    timer.stop()
  }
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

  <div class='space-x-3'>
    <button class='border rounded-md' on:click={() => start(timer1)}>start</button>
    <button class='border rounded-md' on:click={() => stop(timer1)}>stop</button>
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

  <div class='space-x-3'>
    <button class='border rounded-md' on:click={() => start(timer2)}>start</button>
    <button class='border rounded-md' on:click={() => stop(timer2)}>stop</button>
  </div>
</div>

<div class='border rounded-xl px-5 py-4 mt-3 ml-4 w-fit'>
  <strong class='text-[30px]'>countDown timer paddedNum</strong>

  <div class='space-x-3'>
    <span>{time3.year}y</span>
    <span>:</span>
    <span>{time3.month}m</span>
    <span>:</span>
    <span>{time3.day}d</span>
    <span>:</span>
    <span>{time3.hour}h</span>
    <span>:</span>
    <span>{time3.minute}m</span>
    <span>:</span>
    <span>{time3.second}s</span>
  </div>

  <div class='space-x-3'>
    <button class='border rounded-md' on:click={() => start(timer3)}>start</button>
    <button class='border rounded-md' on:click={() => stop(timer3)}>stop</button>
  </div>
</div>