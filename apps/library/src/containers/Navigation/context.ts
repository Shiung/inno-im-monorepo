import { createStoreContext } from 'utils/storeContext'

export interface INavigation {
  active: string | number
}

export const initNavigation: INavigation = {
  active: ''
}

export const [setNavi, getNavi] = createStoreContext<INavigation>('navigation', initNavigation)
