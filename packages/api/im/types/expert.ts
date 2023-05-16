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

interface IArthcleList {
  list: Array<{
    articleId: string
    releaseTime: number
    closeTime: number
    title: string
    homeName: string
    awayName: string
    leagueName: string
  } & IPredictionMarket>
}

type IExpertArthcleRes<T> = T extends 'pager'
? { res: withData<IArthcleList & { pager: IPager }> } 
: { res: withData<IArthcleList> }


export interface IExpertArthcleNow extends IExpertArthcleRes<null> {
  query: {
    expertId: string
  }
  body: null
  // res defined in IExpertArthcleRes
}

export interface IExpertArthcleHistory extends IExpertArthcleRes<'pager'> {
  query: {
    expertId: string 
    pageIdx: number
    pageSize: number
  }
  body: null
  // res defined in IExpertArthcleRes
}

export interface IExpertArthcleHit extends IExpertArthcleRes<'pager'> {
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
      hitStatus: 0 | 1 | 2 | 3 // 0: 待确定 1: 命中 2: 未中 3: 比赛取消
    }>
    info: {
      type: 1 | 2 | 3 // 數據日期 1: 週 2: 月 3: 季
      hotStreak: number
      hitRate: number
    }
  }>
}

export interface IExpertMatchArticle {
  query: {
    matchId: string
    pageIdx: number
    pageSize: number
  }
  body: null
  res: withData<{
    list: IExpertPrediction[]
    pager: IPager
  }>
}