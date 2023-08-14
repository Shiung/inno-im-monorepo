<script lang="ts">
  import Streaming, { setStreaming } from '$src/platform/streaming'
  import Anchors, { onChange, onAllAnchorsClick, setMatchSid } from '$src/platform/anchors'
  import { setAnchors } from './utils'

  setAnchors()

  onChange((e) => {
    setStreaming(e)
  })

  onAllAnchorsClick((path) => {
    console.log('⛔️⛔️⛔️⛔️⛔️ goto imApp path : ' + path)
  })

  setMatchSid(1)
</script>

<Streaming />
<Anchors />
