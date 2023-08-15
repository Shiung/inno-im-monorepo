<script lang="ts">
  import { onDestroy } from 'svelte'
  import Circle from 'ui/core/button/loading.svelte'

  export let hasMore: boolean
  export let load: ((...args: any) => Promise<any>)

  let triggerRefetch: boolean = false
  let moreLoading: boolean = false
  let dom: HTMLDivElement
  let observer: IntersectionObserver

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
      // 暫時寫死
      // 等 100 ms 看看是否會有新的 observer callback 停掉 refetch 行為
      setTimeout(() => {
        reFetchIfNeeded()
      }, 100)
    }
  }

  const clearObserver = () => {
    if (observer) {
      observer.disconnect()
      observer = null
    }
  }

  const createIntersectionObserver = (dom: HTMLDivElement) => {
    clearObserver()

    observer = new IntersectionObserver((entries) => {
      const entry = entries[0]

      triggerRefetch = entry.isIntersecting

      if (!moreLoading) reFetchIfNeeded()
    })
    observer.observe(dom)
  }

  $: if (dom) createIntersectionObserver(dom)

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