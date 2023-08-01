<script lang="ts">
  import { Ripple } from 'ui'
  import { twMerge } from 'tailwind-merge'

  import { getNavi } from './context'
  import { getShapeClassName } from './shape'

  export let id: string | number
  export let src: string

  const { active, shape } = getNavi()
  $: actived = $active === id

  $: _shape = getShapeClassName($shape)
</script>

<Ripple class={twMerge('flex justify-center items-center transition', _shape.className, actived && _shape.active, $$props.class)} on:click>
  <img class="w-[20px] h-[20px]" {src} alt="" />
</Ripple>
