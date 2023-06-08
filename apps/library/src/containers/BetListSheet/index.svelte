<script lang='ts'>
import { onDestroy } from 'svelte'
import BottomSheet, { Header, Content, Footer } from 'ui/components/BottomSheet'
import { dataCid } from '../BottomNavigation'

export let open: boolean

let onMax: boolean = false
const clearZIndexOfBottomNav = () => {
  if (!onMax) return

  const bottomNav = document.querySelector(`[data-cid="${dataCid}"]`)?.firstChild as HTMLElement
  if (!bottomNav) return
  bottomNav.style.zIndex = ''
  onMax = false
}

const setZIndexOfBottomNav = (zIndex: string) => {
  const bottomNav = document.querySelector(`[data-cid="${dataCid}"]`)?.firstChild as HTMLElement
  if (!bottomNav) return
  bottomNav.style.zIndex = zIndex
  onMax = true
}

const onMaxHeight = () => setZIndexOfBottomNav('51')

$: if (!open) clearZIndexOfBottomNav()
onDestroy(() => clearZIndexOfBottomNav())

</script>

<BottomSheet
  class={onMax && 'rounded-none'}
  dragBar
  bind:open={open}
  initHeight={(height) => height * 9/10}
  maxHeight={(height) => height + 20}
  onMaxHeight={onMaxHeight}
>
  <Header class='py-[12px] bg-white px-[15px]'>
    There is Tabs 
  </Header>

  <Content>
    There is Content 
  </Content>

  <Footer class="p-0 bg-white">
    There is Footer 
  </Footer>

</BottomSheet>
