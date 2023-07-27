<script lang="ts">
  import json from './data/sandglass.json'
  import { LottiePlayer } from '@lottiefiles/svelte-lottie-player'
</script>

<div>lottie</div>

<LottiePlayer src={JSON.stringify(json)} autoplay={true} loop={true} renderer="svg" height={20} width={20} />
