<script lang="ts">
  import { twMerge } from 'tailwind-merge'

  import Number from '../Number/index.svelte'
  import Key from '../images/key.svg'

  export let remainCount: number
  export let totalCount: number
</script>

<div>
  <div
    class={twMerge(
      'w-full h-full rounded-[16px] shadow-[0_2px_2px_0_rgba(51,51,51,0.4)]',
      'bg-gradient-to-b from-[rgb(var(--im-monorepo-primary))] to-[rgb(var(--im-monorepo-secondary))]'
    )}
  >
    <Key width={52} height={52} />
  </div>
  <Number {remainCount} {totalCount} />
</div>
