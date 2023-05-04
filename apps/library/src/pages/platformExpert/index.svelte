<script lang='ts'>
import {num} from './store'
import { Button } from 'ui'
import { params } from 'svelte-spa-router'
import { convertSid } from 'utils'

import ExpertList from '$containers/ExpertList'

$: sid = convertSid($params?.sid)
</script>

<div>
  {$num}
</div>
<Button on:click={() => $num += 1}> plus </Button>
<Button on:click={() => $num -= 1}> minus </Button>

<ExpertList sid={sid} />
