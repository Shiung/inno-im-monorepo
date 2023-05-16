<script lang='ts'>
import stomp, { activate } from 'api/stompMaster'
console.log('stomp', activate)

activate()
stomp.watch({ destination: '/topic/chat-room/123874' }).subscribe((message) => console.log(message))
stomp.publish({ destination: '/topic/chat-room/123874' , body: 'this is chat room 123874' })
</script>

<div> chat room </div>
