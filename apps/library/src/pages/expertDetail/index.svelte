<script lang='ts'>
import BackBar from '$containers/BackBar'
import { t } from '$stores'

import Info from './Info/index.svelte'
import Main from './Main/index.svelte'

</script>

<div data-cid='expertDetail'>
  <BackBar title={$t('expert.detail')} />
  <Info />
  <Main class='mt-[8px]' />
</div>
