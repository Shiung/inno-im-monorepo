<script lang='ts'>
import { params } from 'svelte-spa-router'
import ExpertWithMenu from '$containers/ExpertWithMenu'
import { convertSid } from 'utils'

$: sid = convertSid($params?.sid)

</script>

<ExpertWithMenu class='rounded-[20px]' sid={sid} folder />
