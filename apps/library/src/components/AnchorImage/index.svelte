<script lang='ts'>
import { twMerge } from 'tailwind-merge'
import defaultImage from './images/default.webp'
export let src: string
</script>


<img class={twMerge($$props.class)} src={src} on:error={() => src = defaultImage} alt='' />
