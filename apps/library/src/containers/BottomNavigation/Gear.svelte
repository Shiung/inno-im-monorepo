<script>
  import { LottiePlayer } from '@lottiefiles/svelte-lottie-player'
  import gearData from './json/gear.json'
</script>

<LottiePlayer src={JSON.stringify(gearData)} autoplay loop width={20} height={20} />
