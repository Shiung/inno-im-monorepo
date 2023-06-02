<script lang="ts">
  import { im } from 'protobuf'
  import createWwbsocket from 'api/wsMaster'

  const ws = createWwbsocket({
    url: 'ws://localhost:5174/proto/IM_API_URL',
    messageHandler: async (data: ArrayBuffer) => {
      const test = im.request.decode(data)

      const test2 = im.messageEntity.decode(test.data.value)
    },
    activate: true
  })
</script>

<div>websocket</div>
