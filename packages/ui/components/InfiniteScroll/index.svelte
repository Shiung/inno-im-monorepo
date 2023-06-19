<script lang="ts">
  import { onDestroy } from 'svelte'
  import Circle from '../../core/button/loading.svelte'

  export let hasMore: boolean
  export let load: ((...args: any) => Promise<any>)

  let moreLoading: boolean = false
  let dom: HTMLDivElement

  let observer = new IntersectionObserver(async (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        try {
          moreLoading = true
          await load()
        } finally {
          moreLoading = false
        }
      }
    }
  })

  $: if (dom) observer.observe(dom)

  onDestroy(() => {
    observer.disconnect()
    observer = null
  })
</script>

<slot></slot>

{#if hasMore}
  <div bind:this={dom}>
    {#if moreLoading}
      <div class='relative h-[30px] overflow-hidden'>
        <Circle stroke="rgba(var(--im-monorepo-primary))" />
      </div>
    {/if}
  </div>
{/if}