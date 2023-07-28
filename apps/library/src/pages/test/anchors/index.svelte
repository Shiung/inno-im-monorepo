<script lang="ts">
  import Streaming, { setStreaming } from '$src/platform/streaming'
  import Anchors, { onChange } from '$src/platform/anchors'
  import { setAnchors } from './utils'

  setAnchors()

  onChange((e) => {
    setStreaming(e)
  })
</script>

<Streaming />
<Anchors />
