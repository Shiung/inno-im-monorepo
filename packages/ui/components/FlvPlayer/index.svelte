<script lang='ts' context='module'>
import flvjs from 'flv.js'

export let flvPlayer: ReturnType<typeof flvjs.createPlayer>

</script>

<script lang='ts'>
import { onMount, onDestroy } from 'svelte'
import { twMerge } from 'tailwind-merge'

export let url: string = ''
let video: HTMLVideoElement

const playFlv = (url: string) => {
  if (!url) return
  if (!flvjs.isSupported()) return
  if (!video) return

  flvPlayer = flvjs.createPlayer({
    type: 'flv',
    isLive: true,
    url
  })

  flvPlayer.attachMediaElement(video)
  flvPlayer.load()
  flvPlayer.play()
}

$: playFlv(url)

onMount(() => {
  playFlv(url)
})

onDestroy(() => {
  if (flvPlayer) flvPlayer.destroy() 
})



</script>


<video class={twMerge('mt-0 w-full h-full', $$props.class)} autoplay bind:this={video}>
  <track kind='captions' />
  Your browser is too old which doesn't support HTML5 video.
</video>
