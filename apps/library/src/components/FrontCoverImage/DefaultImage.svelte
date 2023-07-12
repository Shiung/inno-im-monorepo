<script lang="ts">
  import { twMerge } from 'tailwind-merge'
  import background from './images/background.png'
  import person from './images/person_none.png'
</script>

<div class="relative h-full">
  <img class={twMerge('max-w-none',$$props.class)} src={background} alt="">
  <img class="absolute bottom-[2.5px] left-1/2 -translate-x-1/2 z-10 w-1/2" src={person} alt="">
</div>
