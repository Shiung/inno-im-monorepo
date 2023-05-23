import { createStoreContext } from 'utils/storeContext'

export interface ArticleIsPast {
  isPast: boolean
}

const initIsPast: ArticleIsPast = {
  isPast: false
}

export const [setIsPast, getIsPast] = createStoreContext('articleIsPast', initIsPast)

