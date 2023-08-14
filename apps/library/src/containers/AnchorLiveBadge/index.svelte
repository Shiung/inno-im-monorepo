<script lang="ts">
  import { Badget } from 'ui'
  import { LottiePlayer } from '@lottiefiles/svelte-lottie-player'
  import LiveMotion from './lottie/live_motion.json'
  import { twMerge } from 'tailwind-merge'
  import { t } from '$src/stores'
  import { isMd } from '$stores'

  $: size = isMd ? 12 : 8
</script>

<Badget
  class={twMerge('flex items-center rounded-tl-[8.5px] rounded-br-[8.5px] rounded-bl-none rounded-tr-none space-x-1 h-[19px] lg:h-[28px]', $$props.class)}
  background='linear-gradient(270deg, #FF508E 0%, #EA4C4C 100%)'
>
  <LottiePlayer src={JSON.stringify(LiveMotion)} width={size} height={size} loop autoplay />
  <span class="text-[11px] lg:text-[14px]">{$t('common.streaming')}</span>
</Badget>