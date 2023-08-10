<script lang="ts">
  import { Badget } from 'ui'
  import { LottiePlayer } from '@lottiefiles/svelte-lottie-player'
  import LiveMotion from './lottie/live_motion.json'
  import { twMerge } from 'tailwind-merge'
  import { t } from '$src/stores'
</script>

<Badget
  class={twMerge('flex items-center rounded-tl-[8.5px] rounded-br-[8.5px] space-x-1', $$props.class)}
  background='linear-gradient(270deg, #FF508E 0%, #EA4C4C 100%)'
>
  <LottiePlayer src={JSON.stringify(LiveMotion)} width={6} height={6} loop autoplay />
  <span class="text-[10px]">{$t('common.streaming')}</span>
</Badget>