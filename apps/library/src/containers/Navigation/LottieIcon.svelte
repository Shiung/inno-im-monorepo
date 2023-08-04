<script lang="ts">
  import { twMerge } from 'tailwind-merge'
  import { Ripple } from 'ui'
  import { LottiePlayer } from '@lottiefiles/svelte-lottie-player'

  import { getNavi } from './context'
  import { getShapeClassName } from './shape'

  export let id: string | number
  export let src: string
  export let infinity: boolean = false

  const { active, shape } = getNavi()

  $: actived = $active === id
  $: _shape = getShapeClassName($shape)

  let lottie: LottiePlayer
  const lottieAnimation = (animate: boolean) => {
    if (animate) lottie.play()
    else lottie.stop()
  }

  $: if (!infinity && lottie) lottieAnimation($active === id)
</script>

<Ripple
  data-id="Navigation__LottieIcon"
  class={twMerge(
    'flex items-center justify-center w-[35px] h-[35px] transition',
    _shape.className,
    actived && _shape.active,
    $$props.class
  )}
  on:click
>
  <LottiePlayer {src} bind:this={lottie} loop autoplay={infinity} />
</Ripple>
