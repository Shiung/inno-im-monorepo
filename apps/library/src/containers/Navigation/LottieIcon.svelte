<script lang="ts">
  import { twMerge } from 'tailwind-merge'
  import { Ripple } from 'ui'
  import { LottiePlayer } from '@lottiefiles/svelte-lottie-player'

  import { getNavi } from './context'

  export let id: string | number
  export let src: string

  const { active } = getNavi()

  $: actived = $active === id

  let lottie: LottiePlayer
  const lottieAnimation = (animate: boolean) => {
    if (animate) lottie.play()
    else lottie.stop()
  }

  $: if (lottie) lottieAnimation($active === id)
</script>

<Ripple class={twMerge('flex items-center justify-center', actived && 'bg-imprimary rounded-[10px]', $$props.class)} on:click>
  <LottiePlayer {src} bind:this={lottie} loop />
</Ripple>
