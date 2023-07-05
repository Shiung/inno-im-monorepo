<script lang='ts'>
import { createEventDispatcher } from 'svelte'
import { Search } from 'ui'
import { t, locale } from '$stores'
import convertSid from 'utils/convertSid'
import { params } from 'svelte-spa-router'

const dispatch = createEventDispatcher()

const en = () => import('./dict/en')
const cn = () => import('./dict/cn')


let dict: string[] = []
let value: string

const changeDict = async (_locale: typeof $locale) => {
  switch (_locale) {
    case 'zh_CN':
    case 'zh_HK':
      let _dict = await cn()
      dict = _dict.default
      return
    default:
      _dict = await en()
      dict = _dict.default
      return
  }
}

$: changeDict($locale)

const handleSearch = () => dispatch('searchEvent', { keyWord: value })

$: sid = convertSid($params?.anchorSid)
$: if (sid != null) handleSearch()


</script>

<Search class='mb-[10px] text-[11px]' dict={dict} bind:value={value}
  on:submit={() => dispatch('searchEvent', { keyWord: value })}
  on:select={e => {
    value = e.detail
    dispatch('searchEvent', { keyWord: e.detail })
  }}
  on:clear={() => {
    dispatch('searchEvent', { keyWord: '' })
  }}
  placeholder={$t('anchor.search.placeholder')}
/>
