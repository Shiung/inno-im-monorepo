<script lang='ts'>
import { BottomNavigation } from 'ui'

let color: string = '#4c9eea'

let icons = [
  {
    id: '1',
    icon: () => import('./announcement.svg'),
    text: '1',
    onClick: () => console.log('1')
  },
  {
    id: '2',
    icon: () => import('./announcement.svg'),
    text: '2',
    onClick: () => console.log('2')
  },
  {
    id: '3',
    icon: () => import('./announcement.svg'),
    text: '3',
    onClick: () => console.log('3')
  },
  {
    id: '4',
    icon: () => import('./announcement.svg'),
    text: '4',
    onClick: () => console.log('4')
  },
  {
    id: '5',
    icon: () => import('./announcement.svg'),
    text: '5',
    onClick: () => console.log('5')
  },
]
</script>

<BottomNavigation icons={icons} active={'5'} color={color} ripple={color} />
