<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { fly } from 'svelte/transition'

  export let show: boolean = false
  export let message: string

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
    class="flex items-center px-[15px] bg-imprimary text-[12px] text-white h-[32px] absolute top-[-32px] w-full"
  >
    {message}
  </div>
{/if}
