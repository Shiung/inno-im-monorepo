<script lang='ts'>
import FlvPlayer from 'ui/components/FlvPlayer'
import { Button } from 'ui'

let url: string

</script>

<FlvPlayer url={url} />


<Button on:click={() => url = 'https://sf1-hscdn-tos.pstatp.com/obj/media-fe/xgplayer_doc_video/flv/xgplayer-demo-360p.flv'}>
  西瓜Demo 
</Button>

<Button on:click={() => url = 'https://live5.js-mooc.com/live/52279.flv?auth_key=1682424264-0-2279-4ee2eeb922b9fa35e166d2af01e69688'}>
  測試Demo 
</Button>
