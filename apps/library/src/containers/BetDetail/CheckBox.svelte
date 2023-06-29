<script lang="ts">
  import { twMerge } from 'tailwind-merge'

  export let betItem
  export let active: string
</script>

<div
  class={twMerge(
    'w-[14px] h-[14px] rounded-full border-[1px]',
    active === betItem.uuid
      ? 'border-none bg-[rgb(var(--im-monorepo-primary))]'
      : 'border-[#ddd] bg-none'
  )}
/>
