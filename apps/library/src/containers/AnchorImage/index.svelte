<script lang="ts">
  import { twMerge } from 'tailwind-merge'
  import defaultImage from './images/default.webp'
  export let src: string

  export let borderWidth = 3

  $: _borderWidth = `border-width: ${borderWidth}px`
</script>

<div class={twMerge('rounded-full im-shadow', $$props.class)} style={_borderWidth}>
  <img class="border-white rounded-full w-full h-full object-cover" style={_borderWidth} {src} on:error={() => (src = defaultImage)} alt="" />
</div>
