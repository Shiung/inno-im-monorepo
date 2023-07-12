<script lang='ts'>
import { createEventDispatcher } from 'svelte'
import { Search } from 'ui'
import { t, locale } from '$stores'

const dispatch = createEventDispatcher()

const en = () => import('./dict/en')
const cn = () => import('./dict/cn')


let dict: string[] = []
export let value: string

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

</script>

<Search class='mb-[10px] text-[11px]' dict={dict} bind:value={value}
  on:submit={() => dispatch('searchEvent')}
  on:select={(e) => {
    value = e.detail
    dispatch('searchEvent')
  }}
  on:clear={(e) => {
    if (!e.detail.isFocused) dispatch('searchEvent')
  }}
  placeholder={$t('anchor.search.placeholder')}
/>
