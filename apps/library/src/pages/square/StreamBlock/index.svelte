<script lang="ts">
  import FlvPlayer, { onError, onReady } from 'ui/components/FlvPlayer'
  import Circle from 'ui/core/button/loading.svelte'
  import HouseImage from '$src/components/HouseImage/index.svelte'
  import type { IWebAnchor } from 'api/im/types'

  import Loading from './Loading.svelte'

  export let streaming: IWebAnchor
  export let loading: boolean

  let streamLoading = false
  let streamError = false
  let prevStreamUrl: string

  onError(() => {
    streamLoading = false
    streamError = true
  })

  onReady(() => {
    streamLoading = false
  })

  const resetStatus = (streaming: IWebAnchor) => {
    streamError = false
    streamLoading = false

    if (!streaming || streaming?.liveStatus !== 2) {
      prevStreamUrl = ''
      return
    }

    if (streaming?.playStreamAddress !== prevStreamUrl) streamLoading = true

    prevStreamUrl = streaming?.playStreamAddress
  }

  $: resetStatus(streaming)
</script>

{#if loading}
  <Loading />
{:else if streaming?.liveStatus === 2}
  <!-- {#if !streamError} -->
  <div class="relative min-h-[200px]">
    {#if streamLoading}
      <div class="absolute inset-0 bg-white flex items-center justify-center">
        <div
          class="w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[30px] overflow-hidden"
        >
          <Circle stroke="rgb(var(--im-monorepo-primary))" />
        </div>
      </div>
    {/if}

    <FlvPlayer url={streaming?.playStreamAddress} />
  </div>
  <!-- {/if} -->
{:else}
    <HouseImage src={streaming?.houseImage} />
{/if}
