<script>
  import { LottiePlayer } from '@lottiefiles/svelte-lottie-player'
  import sandGlassData from './json/sandglass.json'
</script>

<LottiePlayer src={JSON.stringify(sandGlassData)} autoplay loop width={20} height={20} />
