<script context='module'>
export const dataCid = 'BottomNavigation'
</script>

<script lang='ts'>
import { BottomNavigation } from 'ui'
import { push } from 'svelte-spa-router'
import { t, type ITransStore } from '$stores'
import { bottomNav } from '$stores/layout'

export let goHome: () => void = () => {}

let genIcons = (_t: ITransStore) => ([
  {
    id: 'home',
    icon: () => import('./images/home.svg'),
    text: _t('common.backToHome'),
    onClick: goHome
  },
  {
    id: 'square',
    icon: () => import('./images/square.svg'),
    text: _t('common.square'),
    onClick: () => push('/square')
  },
  {
    id: 'anchor',
    icon: () => import('./images/anchor.svg'),
    text: _t('common.anchor'),
    onClick: () => push('/anchor')
  },
  {
    id: 'expert',
    icon: () => import('./images/expert.svg'),
    text: _t('common.expert'),
    onClick: () => push('/expert')
  }
])

$: icons = genIcons($t)

</script>

<BottomNavigation 
  dataCid={dataCid}
  icons={icons}
  active={$bottomNav}
  color='rgb(var(--im-monorepo-primary))'
  ripple='rgb(var(--im-monorepo-primary))' 
/>
