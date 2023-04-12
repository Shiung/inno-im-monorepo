<script lang='ts'>
import { Badget } from 'ui'
import { t } from '$stores'

import type { IWebAnchor } from 'api/im/types'

export let liveStatus: IWebAnchor['liveStatus']

</script>

{#if liveStatus === 2}
  <Badget variant='onLine'> {$t('anchor.online')} </Badget>
{:else}
  <div class='h-[20px]' />
{/if}
