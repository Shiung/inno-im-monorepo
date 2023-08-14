import { createStoreContext } from 'utils/storeContext'
import type { IWebAnchorMatch } from 'api/im/types'

type AnchorStore = {
  anchorMatches: { [key: string]: IWebAnchorMatch }
  anchorMatchLoadings: { [key: string]: boolean }
}

export const initAnchorStore = {
  anchorMatches: {},
  anchorMatchLoadings: {}
}

export const [setAnchorStore, getAnchorStore] = createStoreContext<AnchorStore>('anchorStore', initAnchorStore)