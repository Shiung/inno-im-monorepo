<script lang='ts'>
import { twMerge } from 'tailwind-merge'
</script>

<div class={twMerge(
    'flex items-center justify-center h-[214px] font-bold text-xl bg-[#eeeeee]',
    $$props.class 
  )}
>
  live streaming
</div>
