<script lang="ts">
  import { t } from '$stores'
  import { twMerge } from 'tailwind-merge'

  export let titleKey: string
</script>

<div class={twMerge('flex items-center justify-between px-[12px]', $$props.class)}>
  <h1 class='text-[16px] text-[#333]'>{$t(titleKey)}</h1>

  <div>
    <slot></slot>
  </div>
</div>