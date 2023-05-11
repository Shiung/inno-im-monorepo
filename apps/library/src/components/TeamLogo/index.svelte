<script lang='ts'>
import { twMerge } from 'tailwind-merge'
import { res } from 'vd-resource'
export let src: string

</script>

<img class={twMerge($$props.class)} src={src} on:error={() => src = $res('teamBadge_webp')} alt='' />



