<script lang='ts'>
import { anchor } from '../store'

$: streaming = anchor.streaming
</script>

<div class='h-[214px]'>
  <div> {$streaming.houseId} </div>
  <div> {$streaming.nickName} </div>
  <div> {$streaming.houseName} </div>
</div>
