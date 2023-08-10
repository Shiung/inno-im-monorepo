<script lang="ts">
  import { twMerge } from 'tailwind-merge'
  import defaultImage from './images/default.webp'
  export let src: string

  export let borderWidth = 3

  $: border = `border-[${borderWidth}px]`
</script>

<div class={twMerge($$props.class, border, 'rounded-full im-shadow')}>
  <img class={twMerge(border, 'border-white rounded-full')} {src} on:error={() => (src = defaultImage)} alt="" />
</div>
