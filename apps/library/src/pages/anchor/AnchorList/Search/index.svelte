<script lang='ts'>
import { createEventDispatcher } from 'svelte'
import { Search } from 'ui'
import { t, locale, isLg } from '$stores'

export let value: string

const dispatch = createEventDispatcher()

const en = () => import('./dict/en')
const cn = () => import('./dict/cn')

let dict: string[] = []

const changeDict = async (_locale: typeof $locale) => {
  switch (_locale) {
    case 'zh_CN':
    case 'zh_HK': {
      let _dict = await cn()
      dict = _dict.default
      return
    }
    default: {
      let _dict = await en()
      dict = _dict.default
      return
    }
  }
}

$: changeDict($locale)
$: height = $isLg ? 32 : 36
$: dropdownList = !$isLg 
</script>

<Search class='pt-[1px] text-[11px] lg:w-[340px]'
  {dict}
  {height}
  {dropdownList}
  bind:value
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
