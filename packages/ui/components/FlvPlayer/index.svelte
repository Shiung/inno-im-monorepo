<script lang='ts' context='module'>
let onReadyCallback: () => void = () => {}
let onLostDataCallback: () => void = () => {}
let onErrorCallback: (e: string) => void = () => {} 
let onPausedCallback: (p: boolean) => void = () => {}
let onMutedCallback: (p: boolean) => void = () => {}
let muteHandler: () => void
let pauseHandler: (l: boolean) => void

export const onReady = (callback: typeof onReadyCallback) => {
  onReadyCallback = callback
}
export const onLostData = (callback: typeof onLostDataCallback) => {
  onLostDataCallback = callback
}
export const onError = (callback: typeof onErrorCallback) => {
  onErrorCallback = callback
}

export const onPaused = (callback: typeof onPausedCallback) => {
  onPausedCallback = callback
}

export const onMuted = (callback: typeof onMutedCallback) => {
  onMutedCallback = callback
}

export const setMuteHandler = () => typeof muteHandler === 'function' && muteHandler()

export const setPauseHandler = (isLive: boolean = false) => typeof pauseHandler === 'function' && pauseHandler(isLive)


</script>

<script lang='ts'>
import flvjs from 'flv.js'
import { onMount, onDestroy } from 'svelte'
import { twMerge } from 'tailwind-merge'

let flvPlayer: ReturnType<typeof flvjs.createPlayer>
let paused: boolean = true
let muted: boolean = false

export let url: string = ''
let video: HTMLVideoElement
let noDataCount: number = 0

$: if (noDataCount >= 30) {
  onLostDataCallback()
  noDataCount = 0
}

const playFlv = (url: string) => {
  if (!url) return
  if (!flvjs.isSupported()) return
  if (!video) return
  if (flvPlayer) flvPlayer.destroy()
  noDataCount = 0

  flvPlayer = flvjs.createPlayer({
    type: 'flv',
    isLive: true,
    url
  })

  flvPlayer.attachMediaElement(video)
  flvPlayer.load()


  flvPlayer.on(flvjs.Events.MEDIA_INFO, onReadyCallback)

  flvPlayer.on(flvjs.Events.STATISTICS_INFO, (e) => {
    if (e.speed === 0) noDataCount += 1
    else noDataCount = 0
  })

  flvPlayer.on(flvjs.Events.ERROR, onErrorCallback)
}

$: onPausedCallback(paused)

$: onMutedCallback(muted)

$: playFlv(url)

pauseHandler = (isLive: boolean) => {
  if (!url || !flvPlayer) return
  if (isLive) {
    if (paused) playFlv(url)
    else {
      flvPlayer.pause()
      flvPlayer.unload()
    }
    return
  }
  if (!paused) flvPlayer.pause()
  else flvPlayer.play()
}

muteHandler = () => {
  if (!flvPlayer) return
  flvPlayer.muted = !muted
}

onMount(() => {
  playFlv(url)
})

onDestroy(() => {
  if (flvPlayer) flvPlayer.destroy() 
})

</script>

<video  class={twMerge('w-full h-full', !url && 'h-0', $$props.class)} autoplay bind:this={video} bind:paused bind:muted>
  <track kind='captions' />
  Your browser is too old which doesn't support HTML5 video.
</video>
