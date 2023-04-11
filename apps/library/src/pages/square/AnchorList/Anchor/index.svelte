<script lang='ts'>
import type { IWebAnchor } from 'api/im/types'
import { Badget } from 'ui'

export let anchor: IWebAnchor

</script>

<div>
  <div class='text-primary'> { anchor.houseName } </div>
  <div class='text-[#999999]'> { anchor.nickName } </div>
  <Badget variant='onLine'> online </Badget>

</div>
