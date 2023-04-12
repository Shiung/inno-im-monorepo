<script lang='ts'>
import { BottomNavigation } from 'ui'
import { t, type ITransStore } from '$stores'
import { bottomNav } from '$stores/layout'

const genIcons = (_t: ITransStore) => ([
  {
    id: 'home',
    icon: () => import('./images/home.svg'),
    text: _t('common.backToHome'),
    onClick: () => console.log('home')
  },
  {
    id: 'square',
    icon: () => import('./images/square.svg'),
    text: _t('common.square'),
    onClick: () => console.log('2')
  },
  {
    id: 'anchor',
    icon: () => import('./images/anchor.svg'),
    text: _t('common.anchor'),
    onClick: () => console.log('anchor')
  },
  {
    id: 'expert',
    icon: () => import('./images/expert.svg'),
    text: _t('common.expert'),
    disabled: true,
    onClick: () => console.log('4')
  },
  {
    id: 'match',
    icon: () => import('./images/match.svg'),
    text: _t('common.match'),
    disabled: true,
    onClick: () => console.log('5')

  },
])

$: icons = genIcons($t)

</script>

<BottomNavigation 
  icons={icons}
  active={$bottomNav}
  color='rgb(var(--im-monorepo-primary))'
  ripple='rgb(var(--im-monorepo-primary))' 
/>
