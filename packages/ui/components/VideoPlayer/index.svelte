<script lang="ts" context="module">
  let onReadyCallback: () => void = () => {}
  let onErrorCallback: (e?: ErrorEvent) => void = () => {}
  let onPausedCallback: (p: boolean) => void = () => {}
  let onMutedCallback: (p: boolean) => void = () => {}
  let muteHandler: () => void
  let pauseHandler: (l: boolean) => void
  let fullScreenHandler: () => void

  export const onReady = (callback: typeof onReadyCallback) => {
    if (typeof callback !== 'function') return console.warn('onReady callback MUST be function')
    onReadyCallback = callback
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
</script>

<script lang="ts">
  import { onMount } from 'svelte'
  import { twMerge } from 'tailwind-merge'

  interface HTMLVideoElementIOS extends HTMLVideoElement {
    mozRequestFullScreen?: () => void
    webkitEnterFullScreen?: () => void
  }
  export let urlm3u8: string = ''
  export let controls: boolean = false

  let video: HTMLVideoElementIOS
  let paused: boolean = false
  let muted: boolean = true
  let timer: NodeJS.Timeout
  export let internal: boolean = false
  export let internalOnReadyCallback: () => void = () => {}
  export let internalOnErrorCallback: (e?: ErrorEvent) => void = () => {}
  export let internalOnPausedCallback: (p: boolean) => void = () => {}
  export let internalOnMutedCallback: (p: boolean) => void = () => {}

  const removeSource = () => {
    ;[...video.childNodes].forEach((c, i) => {
      if (c.nodeName === 'SOURCE') {
        video.removeChild(c)
      }
    })
    video.removeEventListener('canplay', internal ? internalOnReadyCallback : onReadyCallback)
    video.removeEventListener('error', internal ? internalOnErrorCallback : onErrorCallback)
    video.removeEventListener('pause', handleVideoPause)
    video.removeEventListener('timeupdate', timeUpdateHandler)
  }

  const playVideo = (urlm3u8: string) => {
    if (!urlm3u8 || !video) return
    removeSource()
    const sourceDom = document.createElement('source')
    sourceDom.setAttribute('type', 'application/x-mpegURL')
    sourceDom.setAttribute('src', urlm3u8)
    video.appendChild(sourceDom)

    // if "canplay" event not triggered, call error by 15 secs after.
    let timer = setTimeout(() => {
      onErrorCallback()
    }, 15 * 1000)

    video.addEventListener('canplay', () => {
      clearTimeout(timer)
      internal ? internalOnReadyCallback() : onReadyCallback()
    })
    video.addEventListener('error', onErrorCallback)
    video.addEventListener('pause', handleVideoPause)
    video.addEventListener('timeupdate', timeUpdateHandler)

    video.oncancel = (e) => {
      console.log('cancel', e)
      alert('cancel ***')
    }
  }

  const handleVideoPause = () => {
    clearTimeout(timer)
  }

  const timeUpdateHandler = () => {
    if (timer) clearTimeout(timer)

    timer = setTimeout(() => {
      onErrorCallback()
    }, 800)
  }

  export const inPauseHandler = (isLive: boolean) => {
    if (!urlm3u8 || !video) return
    if (paused) isLive ? video.load() : video.play()
    else {
      video.pause()
    }
  }
  
  export const inMuteHandler = () => {
    if (!video) return
    video.muted = !muted
  }

  export const inFullScreenHandler = () => {
    if (video.requestFullscreen) video.requestFullscreen()
    else if (video.mozRequestFullScreen) video.mozRequestFullScreen()
    else if (video.webkitEnterFullScreen) video.webkitEnterFullScreen()
  }

  pauseHandler = inPauseHandler

  muteHandler = inMuteHandler

  fullScreenHandler = inFullScreenHandler


  onMount(() => {
    playVideo(urlm3u8)
  })

  $: internal ? internalOnPausedCallback(paused) : onPausedCallback(paused)
  $: internal ? internalOnMutedCallback(muted) : onMutedCallback(muted)
  $: playVideo(urlm3u8)
</script>

<video
  class={twMerge('w-full h-full', !urlm3u8 && 'h-0', $$props.class)}
  bind:this={video}
  autoplay
  playsinline
  bind:muted
  bind:paused
  {controls}
>
  <track kind="captions" />
  Your browser is too old which doesn't support HTML5 video.
</video>
