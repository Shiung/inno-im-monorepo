<script lang='ts'>
import { Badget } from 'ui'
import { t } from '$stores'
import type { IPredictionMarket } from 'api/im/types/common'

export let marketType: IPredictionMarket['marketType']

const getI18n = (_marketTypes: typeof marketType) => {
  switch (_marketTypes) {
    case '11':
    case '21':
      return 'common.1x2'
    case '12':
    case '22':
      return 'common.ah'
    case '13':
    case '23':
      return 'common.ou'
    default: return ''
  }
}

$: i18n = getI18n(marketType)
</script>


<Badget> {$t(i18n)} </Badget>
