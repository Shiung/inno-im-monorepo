<script lang='ts'>
import { twMerge } from 'tailwind-merge'
import avatar from './images/avatar.webp'

export let src: string
</script>

<img data-cid='expertImage'
  class={twMerge('rounded-full', $$props.class)}
  src={src} on:error={() => src = avatar}
  alt='' 
/>
