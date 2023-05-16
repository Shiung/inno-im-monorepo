<script lang='ts'>
import FlvPlayer, { onMuted, onPaused, setMute, setPause, setFullScreen } from 'ui/components/FlvPlayer'
import { Button } from 'ui'

let url: string
let paused: boolean
let muted: boolean

onPaused((p) => {
  console.log('pause *** out', p)
  paused = p
})

onMuted((m) => {
  console.log('mute *** out', m)
  muted = m
})

</script>

<FlvPlayer url={url} />


<Button on:click={() => url = 'https://sf1-hscdn-tos.pstatp.com/obj/media-fe/xgplayer_doc_video/flv/xgplayer-demo-360p.flv'}>
  西瓜Demo 
</Button>

<Button on:click={() => url = 'https://live5.js-mooc.com/live/52252.flv?auth_key=1683656703-0-2252-5870ae820251806966ad693fba3fbfb6'}>
  測試Demo 
</Button>


<Button on:click={setMute}>
  {muted ? '開聲音' : '靜音'}
</Button>
<Button on:click={setPause.bind(null, false)}>
  {paused ? '播放': '暫停'}
</Button>

<Button on:click={setFullScreen}>
  全螢幕
</Button>