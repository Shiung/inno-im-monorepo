<script lang='ts'>
import { onMount } from 'svelte'
import Anchors from '../anchors'
import Streaming from '../streaming'

import { setAnchors } from '../anchors/store.test'

onMount(() => {
  setAnchors()
})
</script>

<Streaming />
<Anchors />
