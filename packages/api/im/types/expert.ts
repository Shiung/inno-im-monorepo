import type { IPager, withData } from './common'

export interface IExpertPrediction {
  expertId: string
  expertName: string
  expertImage: string
  releaseTime: number
  closeTime: number
  market: string
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
}
export interface IExpertPredictions {
  query: {
    matchId?: string
    sid?: string
    type?: 0 | 1 | 2 // 0: 命中王 1: 連紅王 2: 跟投王
    pageIdx: number
    pageSize: number
  }
  body: null
  res: withData<{
    list: IExpertPrediction[]
    pager: IPager
  }>
}
