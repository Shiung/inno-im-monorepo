import { createStoreContext } from 'utils/storeContext'
import type { IWebAnchorMatch } from 'api/im/types'

type SquareStore = {
  anchorMatches: { [key: string]: IWebAnchorMatch }
  anchorMatchLoadings: { [key: string]: boolean }
}

export const initSquareStore = {
  anchorMatches: {},
  anchorMatchLoadings: {}
}

export const [setSquareStore, getSquareStore] = createStoreContext<SquareStore>('squareStore', initSquareStore)