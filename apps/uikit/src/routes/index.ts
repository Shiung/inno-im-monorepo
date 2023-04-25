import Entry from '../components/Entry.svelte'
import Button from '../components/Button.svelte'
import Ripple from '../components/Ripple.svelte'
import BottomSheet from '../components/BottomSheet.svelte'
import BottomNavigation from '../components/BottomNavigation/index.svelte'
import Badget from '../components/Badget.svelte'
import Search from '../components/Search/index.svelte'
import FlvPlayer from '../components/FlvPlayer/index.svelte'
import Empty from '../components/Empty.svelte'
import Tween from '../components/Tween.svelte'


const routes = {
  '/': Entry,
  '/button': Button,
  '/ripple': Ripple,
  '/bottomSheet': BottomSheet,
  '/bottomNavigation': BottomNavigation,
  '/badget': Badget,
  '/search': Search,
  '/flvPlayer': FlvPlayer,
  '/Tween': Tween,
  '/empty': Empty

}

export default routes
