export interface IWebAnchor {
  attentionStatus: number
  fansCount: number
  houseId: string
  houseImage: string
  houseName: string
  liveStatus: 1 | 2 | 3 | 4 // 1:未开播 2:正在直播 3:暂时禁播 4:永久禁播
  nickName: number
  playStreamAddress: string
  userImage: string
  visitHistory: number
}

export interface IWebAnchors {
  list: IWebAnchor[]
  pager: {
    pageIdx: number
    pageSize: number
    totalPage: number
    totalRow: number
    
  }
}

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
  list: IExpertPrediction[]
}
