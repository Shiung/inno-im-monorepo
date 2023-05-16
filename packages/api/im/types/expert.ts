import type { IPager, withData, IPredictionMarket } from './common'

export interface IExpertPrediction extends IPredictionMarket {
  expertId: string
  expertName: string
  expertImage: string
  releaseTime: number
  closeTime: number
  hotStreak: number
  hitRate: number
  articleId: string
  articleStatus: 1 | 2 // 1: 開放 2: 未開放
  title: string
  homeName: string
  awayName: string
  leagueName: string
  matchStatus: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 // 1: 未開始 2: 進行中 3: 結束 4: 延期 5: 中斷 6: 腰斬 7: 取消 8: 待定
  matchTime: number
  sportId: 1 | 2 // 1: 足球 2: 籃球
}
export interface IExpertPredictions {
  query: {
    matchId?: string
    sid?: number
    type?: 0 | 1 | 2 // 0: 命中王 1: 連紅王 2: 跟投王
    pageIdx?: number
    pageSize?: number
  }
  body: null
  res: withData<{
    list: IExpertPrediction[]
    pager: IPager
  }>
}

export interface IExpertRecommand {
  query: {
    pageIdx: number
    pageSize: number
    sid?: number
  }
  body: null
  res: withData<{
    list: Array<{
      expertId: string
      expertName: string
      expertImage: string
      releaseTime: number
      closeTime: number
      market: string
      hotStreak: number
      hitRate: number
      articleId: string
      homeName: string
      awayName: string
      leagueName: string
    }>
    pager: IPager
  }>
}

export interface IExpertInfo {
  query: {
    expertId: string
  }
  body: null
  res: withData<{
    expertId: string
    expertName: string
    expertImage: string
    hotStreak: number
  }>
}

export interface IArticle extends IPredictionMarket {
  articleId: string
  releaseTime: number
  closeTime: number
  title: string
  homeName: string
  awayName: string
  leagueName: string
  hitStatus: 1 | 2  // 命中狀態 1: 命中 2: 未中
}
export interface IArticleList {
  list: Array<IArticle>
}

type IExpertArticleRes<T> = T extends 'pager'
? { res: withData<IArticleList & { pager: IPager }> } 
: { res: withData<IArticleList> }


export interface IExpertArticleNow extends IExpertArticleRes<null> {
  query: {
    expertId: string
  }
  body: null
  // res defined in IExpertArticleRes
}

export interface IExpertArticleHistory extends IExpertArticleRes<'pager'> {
  query: {
    expertId: string 
    pageIdx: number
    pageSize: number
  }
  body: null
  // res defined in IExpertArticleRes
}

export interface IExpertArticleHit extends IExpertArticleRes<'pager'> {
  query: {
    expertId: string
    pageIdx: number
    pageSize: number
  }
  body: null
}

export interface IExpertStatistics {
  query: {
    expertId: string
  }
  body: null
  res: withData<{
    list: Array<{
      hitStatus: 1 | 2 // 1: 命中 2: 未中
      releaseTime: number
    }>
    info: Array<{
      type: 1 | 2 | 3 // 1: 週 2: 月 3: 季
      hotStreak: number // 連紅次數
      hitRate: number
    }>
  }>
}

