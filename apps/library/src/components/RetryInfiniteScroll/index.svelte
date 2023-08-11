<script lang="ts">
  import { onDestroy } from 'svelte'
  import Circle from 'ui/core/button/loading.svelte'

  export let hasMore: boolean
  export let load: ((...args: any) => Promise<any>)

  let triggerRefetch: boolean = false
  let moreLoading: boolean = false
  let dom: HTMLDivElement

  const loadData = async () => {
    try {
      moreLoading = true
      await load()

    } catch(error) {
      console.error(error)
    } finally {
      moreLoading = false
    }
  }

  const reFetchIfNeeded = async () => {
    if(hasMore && triggerRefetch) {
      await loadData()
      reFetchIfNeeded()
    }
  }

  let observer = new IntersectionObserver(async (entries) => {
    const entry = entries[0]
    if (!hasMore) return

    if (entry.isIntersecting) {
      triggerRefetch = true
      if (!moreLoading) {
        await loadData()
        reFetchIfNeeded()
      }
    } else {
      triggerRefetch = false
    }
  })

  const clearObserver = () => {
    if (observer) {
      observer.disconnect()
      observer = null
    }
  }

  $: if (dom) observer.observe(dom)

  $: if (!hasMore) clearObserver()

  onDestroy(() => {
    clearObserver()
  })
</script>

<slot></slot>

{#if hasMore}
  <div data-cid='RetryInfiniteScrollLoad' bind:this={dom}>
    {#if moreLoading}
      <div class='relative h-[30px] overflow-hidden'>
        <Circle stroke="rgba(var(--im-monorepo-primary))" />
      </div>
    {/if}
  </div>
{/if}