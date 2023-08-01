<script lang="ts">
  import { Ripple } from 'ui'
  import { twMerge } from 'tailwind-merge'

  import { getNavi } from './context'

  export let id: string | number
  export let src: string

  const { active } = getNavi()
  $: actived = $active === id
</script>

<Ripple
  class={twMerge(
    'w-[35px] h-[35px] flex rounded-[10px] justify-center items-center transition will-change-auto',
    actived && 'bg-imprimary',
    $$props.class
  )}
  on:click
>
  <img class="w-[20px] h-[20px]" {src} alt="" />
</Ripple>
