<script lang='ts'>
import { twMerge } from 'tailwind-merge'
</script>

<div class={twMerge('px-2 flex-1 relative overflow-y-scroll', $$props.class, 'flex flex-col')}>
  <slot />
</div>
