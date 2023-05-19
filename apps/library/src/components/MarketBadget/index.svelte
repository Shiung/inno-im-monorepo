<script lang='ts'>
import { Badget } from 'ui'
import { t } from '$stores'
import type { IPredictionMarket } from 'api/im/types/common'
import { marketTypeDispatcher } from '$src/utils/match'

export let marketType: IPredictionMarket['marketType']

const getI18n = {
  ml: () => 'common.1x2',
  ah: () => 'common.ah',
  ou: () => 'common.ou'
}

$: dispatcher = marketTypeDispatcher(marketType)
$: i18n = dispatcher(getI18n)
</script>


<Badget variant='gradientPrimary' class={$$props.class}> {$t(i18n)} </Badget>
