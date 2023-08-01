import { createStoreContext } from 'utils/storeContext'

export interface INavigation {
  active: string | number
  shape?: 'rounded' | 'circle'
}

export const initNavigation: INavigation = {
  active: '',
  shape: 'rounded'
}

export const [setNavi, getNavi] = createStoreContext<INavigation>('navigation', initNavigation)
