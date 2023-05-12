<script lang='ts'>
import { Badget } from 'ui'
import { t } from '$stores'
import type { IMarket } from 'api/im/types/common'

export let status: IMarket['status']

const getI18n = (_status: typeof status) => {
  switch (_status) {
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

$: i18n = getI18n(status)
</script>


<Badget> {$t(i18n)} </Badget>
