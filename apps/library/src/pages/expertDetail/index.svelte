<script lang='ts'>
import { t } from '$stores'
  
import BackBar from '$containers/BackBar'

import Info from './Info/index.svelte'
import Main from './Main/index.svelte'
</script>

<div data-cid='expertDetail'>
  <BackBar title={$t('expert.detail')} />
  <Info />
  <Main />
</div>
