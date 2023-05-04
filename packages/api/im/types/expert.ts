import type { IPager, withData, IMarket } from './common'

export interface IExpertPrediction {
  expertId: string
  expertName: string
  expertImage: string
  releaseTime: number
  closeTime: number
  market: IMarket
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

export interface IExpertArthcleNow {
  query: {
    expertId: string
  }
  body: null
  res: withData<{
    list: Array<{
      articleId: string
      releaseTime: number
      closeTime: number
      title: string
      homeName: string
      awayName: string
      leagueName: string
      market: IMarket
    }>
  }>
}

export interface IExpertArthcleHistory {
  query: {
    expertId: string 
    pageIdx: number
    pageSize: number
  }
  body: null
  res: withData<{
    list: Array<{
      articleId: string
      releaseTime: number
      closeTime: number
      title: string
      homeName: string
      awayName: string
      leagueName: string
      market: IMarket
    }>
    pager: IPager
  }>
}

export interface IExpertArthcleHit {
  query: {
    expertId: string
    pageIdx: number
    pageSize: number
  }
  body: null
  res: withData<{
    list: Array<{
      articleId: string
      releaseTime: number
      closeTime: number
      title: string
      homeName: string
      awayName: string
      leagueName: string
      market: IMarket
    }>
    pager: IPager
  }>
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
  }>
}

export interface IExpertMacthArticle {
  query: {
    matchId?: string
  }
  body: null
  res: withData<{
    match: {
      homeName: string
      awayName: string
      leagueName: string 
      // 比賽狀態 1: 未開始 2: 進行中 3: 結束 4: 延期 5: 中斷 6: 腰斬 7: 取消 8: 待定
      matchStatus: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
      matchTime: number
      sportId: 1 | 2 // 球類類型 1: 足球 2: 籃球
    }
    list: Array<{
      expertId: string
      expertName: string
      expertImage: string
      releaseTime: number
      closeTime: number
      market: IMarket
      hotStreak: number
      hitRate: number
      articleId: string
      articleStatus: 1 | 2 // 文章狀態 1: 開放 2: 未開放
      title: string
    }>
  }>
}
