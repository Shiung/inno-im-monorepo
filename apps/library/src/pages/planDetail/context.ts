import { createStoreContext } from 'utils/storeContext'
import type { IFetchArticleDetailQuery } from './type'

export interface ArticleIsPast {
  isPast: boolean
}

const initIsPast: ArticleIsPast = {
  isPast: false
}

export const [setIsPast, getIsPast] = createStoreContext('articleIsPast', initIsPast)

export interface FetchArticleDetail {
  fetchArticleDetail: (query: IFetchArticleDetailQuery) => void
}

const initFetchArticleDetail: FetchArticleDetail = {
  fetchArticleDetail: () => {}
}

export const [setFetchArticleDetail, getFetchArticleDetail] = createStoreContext('fetchArticleDetail', initFetchArticleDetail)
