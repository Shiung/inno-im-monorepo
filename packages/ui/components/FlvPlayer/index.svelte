<script lang='ts' context='module'>
import flvjs from 'flv.js'
import UAParser from 'ua-parser-js'

const ua = new UAParser()
const isIOS = ua.getOS().name === 'iOS'

let onReadyCallback: () => void = () => {}
let onLostDataCallback: () => void = () => {}
let onErrorCallback: (e: string) => void = () => {} 
let onPausedCallback: (p: boolean) => void = () => {}
let onMutedCallback: (p: boolean) => void = () => {}
let muteHandler: () => void
let pauseHandler: (l: boolean) => void
let fullScreenHandler: () => void

export const onReady = (callback: typeof onReadyCallback) => {
  if (typeof callback !== 'function') return console.warn('onReady callback MUST be function')
  onReadyCallback = callback
}
export const onLostData = (callback: typeof onLostDataCallback) => {
  if (typeof callback !== 'function') return console.warn('onLostData callback MUST be function')  
  onLostDataCallback = callback
}
export const onError = (callback: typeof onErrorCallback) => {
  if (typeof callback !== 'function') return console.warn('onError callback MUST be function') 
  onErrorCallback = callback
}

export const onPaused = (callback: typeof onPausedCallback) => {
  if (typeof callback !== 'function') return console.warn('onPaused callback MUST be function') 
   onPausedCallback = callback
}

export const onMuted = (callback: typeof onMutedCallback) => {
  if (typeof callback !== 'function') return console.warn('onMuted callback MUST be function') 
   onMutedCallback = callback
}

export const setMute = () => typeof muteHandler === 'function' && muteHandler()

export const setPause = (isLive: boolean = false) => typeof pauseHandler === 'function' && pauseHandler(isLive)

export const setFullScreen = () => typeof fullScreenHandler === 'function' && fullScreenHandler()

export const isFlvUse = flvjs.isSupported() || !isIOS
</script>

<script lang='ts'>
import { onMount, onDestroy } from 'svelte'
import { twMerge } from 'tailwind-merge'

let flvPlayer: ReturnType<typeof flvjs.createPlayer>
let paused: boolean = true
let muted: boolean = true

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

fullScreenHandler = () => ('requestFullscreen' in video) && video.requestFullscreen()

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
