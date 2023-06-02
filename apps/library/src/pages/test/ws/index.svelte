<script lang="ts">
  import { im } from 'protobuf'
  import createWebsocket from 'api/wsMaster'

  const ws = createWebsocket({
    url: 'ws://localhost:5174/proto/IM_API_URL',
    binaryType: 'arraybuffer',
    eventkeyParser: (event) => {
      const decoded = im.request.decode(event.data)
      return { eventkey: decoded.command, data: decoded.data.value }
    },

    messageHandler: async ({ eventkey, data }) => {
      console.log('handler', eventkey, data)
      // const test = im.request.decode(data)
      // console.log('test', test)

      // const test2 = im.messageEntity.decode(test.data.value)
      // console.log('test2', test2)
    },
    activate: true
  })
</script>

<div>websocket</div>
