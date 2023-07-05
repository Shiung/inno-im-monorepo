<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { fly } from 'svelte/transition'
  import { twMerge } from 'tailwind-merge'

  export let show: boolean = false
  export let message: string
  export let fixed: boolean = false
  export let inputHeight: number

  const dispatch = createEventDispatcher()

  let timeout: ReturnType<typeof setTimeout>
  $: if (show) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      dispatch('close')
    }, 2000)
  }
</script>

{#if show}
  <div
    transition:fly|local={{ y: 32 }}
    class={twMerge(
      "flex items-center px-[15px] bg-imprimary text-[12px] text-white h-[32px] w-full",
      fixed ? 'fixed' : 'absolute -translate-y-full'
    )}
    style:bottom={fixed && `${inputHeight}px`}
  >
    {message}
  </div>
{/if}
