import type {
  IPager,
  withData,
  IPredictionMarket,
  SportId,
  MatchStatus,
  HitStatus,
  ArticleStatus,
  IMatch
} from './common'

export interface IExpertPrediction extends IPredictionMarket {
  expertId: string
  expertName: string
  expertImage: string
  releaseTime: number
  closeTime: number
  hotStreak: number
  hitRate: number
  articleId: string
  articleStatus: ArticleStatus,
  title: string
  homeName: string
  awayName: string
  leagueName: string
  matchStatus: MatchStatus,
  matchTime: number
  sportId: SportId
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

export interface IArticle extends IPredictionMarket {
  articleId: string
  releaseTime: number
  closeTime: number
  title: string
  homeName: string
  awayName: string
  leagueName: string
  hitStatus: HitStatus
}
export interface IArticleList {
  list: Array<IArticle>
}

type IExpertArthcleRes<T> = T extends 'pager'
? { res: withData<IArticleList & { pager: IPager }> } 
: { res: withData<IArticleList> }


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
      hitStatus: HitStatus,
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

export interface IArticleDetail extends IPredictionMarket, IMatch {
  releaseTime: number,
  closeTime: number,
  articleId: string,
  articleStatus: ArticleStatus,
  title: string,
  content: string,
  mid: number,
  vd: string
  matchStatus: MatchStatus,
  matchTime: number,
  sportId: SportId
}

export interface IExpertArticleDetail {
  query: {
    articleId: string
  }
  body: null
  res: withData<IArticleDetail>
}