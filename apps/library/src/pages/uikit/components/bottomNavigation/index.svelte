<script lang='ts'>
import { BottomNavigation } from 'ui'

let ripple: boolean | string = '#4c9eea'
let icons = [
  {
    icon: () => import('./announcement.svg'),
    text: 1,
    onClick: () => console.log('1')
  },
  {
    icon: () => import('./announcement.svg'),
    text: 2,
    onClick: () => console.log('2')
  },
  {
    icon: () => import('./announcement.svg'),
    text: 3,
    onClick: () => console.log('3')
  },
  {
    icon: () => import('./announcement.svg'),
    text: 4,
    onClick: () => console.log('4')
  },
  {
    icon: () => import('./announcement.svg'),
    text: 5,
    onClick: () => console.log('5')
  },
]

</script>

<BottomNavigation icons={icons} active={1} color='#4c9eea' ripple='#4c9eea' />
