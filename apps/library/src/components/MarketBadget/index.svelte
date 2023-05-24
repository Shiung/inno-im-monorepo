<script lang='ts'>
import { Badget } from 'ui'
import { t } from '$stores'
import type { IPredictionMarket } from 'api/im/types/common'
import { marketTypeDispatcher, type TResolver } from '$src/utils/match'

export let marketType: IPredictionMarket['marketType']

$: dispatcher = marketTypeDispatcher(marketType)

const getI18n: TResolver<[], string> = {
  ml: () => 'common.1x2',
  ah: () => 'common.ah',
  ou: () => 'common.ou'
}

$: i18n = dispatcher(getI18n)
</script>


<Badget class={$$props.class}> {$t(i18n)} </Badget>
