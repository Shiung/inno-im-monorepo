<script lang="ts">
  import StreamingPlayer, { onError, onLostData, onReady, isFlvUse } from '$containers/StreamingPlayer'
  import Circle from 'ui/core/button/loading.svelte'
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

  onLostData(() => {
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

    if (isFlvUse && streaming?.playStreamAddress !== prevStreamUrl) {
      streamLoading = true
    }
    if (!isFlvUse && streaming?.playStreamAddress2 !== prevStreamUrl) {
      streamLoading = true
    }

    prevStreamUrl = isFlvUse ? streaming?.playStreamAddress : streaming?.playStreamAddress2
  }

  $: resetStatus(streaming)
</script>

{#if loading}
  <Loading />
{:else}
  <!-- {#if !streamError} -->
  <div class="relative min-h-[200px]">
    {#if streaming?.liveStatus === 2 && streamLoading}
      <div class="absolute z-10 inset-0 bg-white flex items-center justify-center">
        <div class="w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[30px] overflow-hidden">
          <Circle stroke="rgb(var(--im-monorepo-primary))" />
        </div>
      </div>
    {/if}

    <StreamingPlayer {streaming} useDefControls />
  </div>
  <!-- {/if} -->
{/if}
