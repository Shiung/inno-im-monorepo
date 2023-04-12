import { bottomNav } from '$stores/layout'
export const test = () => {}
export const setBottomNav = (_bottomNav?: string) => {
  bottomNav.set(_bottomNav)
}
