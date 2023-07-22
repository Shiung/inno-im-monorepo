import { createStoreContext } from 'utils/storeContext'

export interface ArticleIsPast {
  isPast: boolean
}

const initIsPast: ArticleIsPast = {
  isPast: false
}

export const [setIsPast, getIsPast] = createStoreContext('articleIsPast', initIsPast)

export interface ArticleIsUnlockingInProgress {
  isUnlockingInProgress: boolean
}

const initIsUnlockingInProgress: ArticleIsUnlockingInProgress = {
  isUnlockingInProgress: false
}

export const [setIsUnlockingInProgress, getIsUnlockingInProgress] = createStoreContext('articleIsUnlockingInProgress', initIsUnlockingInProgress)