<script lang='ts'>
import { onMount } from 'svelte'
import { Button } from 'ui'
import Anchors, { onChange } from '../anchors'
import Streaming, { onReady } from '../streaming'

import { setAnchors } from '../anchors/store.test'

let showStreaming: boolean

onMount(() => {
  setAnchors()
  onReady(() => console.log('============================on ready==============================='))
  onChange((anchor) => console.log('onChange', anchor))
})
</script>

<Button on:click={() => showStreaming = !showStreaming}> toggle </Button>
{#if showStreaming}
  <Streaming />
{/if}
<Anchors />
