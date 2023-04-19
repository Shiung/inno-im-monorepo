import type { IPager } from './common'

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
  pager: IPager
}

export interface IWebAnchorMatch {
  homeTeamName: string
  homeTeamLogo: string
  homeTeamId: string
  awayTeamName: string
  awayTeamLogo: string
  awayTeamId: string
  competitionName: string
  competitionLogo: string
  competitionId: string
  sportId: 1 | 2 | 3 // 1: 足球 2: 籃球 3: 網球
  matchId: string
  matchTime: number
  matchStatus: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 // 1: 未開始 2: 進行中 3: 結束 4: 延期 5: 中斷 7: 取消 8: 待定
  homeScore: [number, number, number, number, number, number, number, number]
  awayScore: [number, number, number, number, number, number, number, number]
}

export interface IWebAnchorMatches {
  matchList: IWebAnchorMatch[]
}

export interface IWebAnchorDetail {
  userImage: string
  nickName: string
  houseName: string
  houseId: string
  userInfo: {
    country: string
    height: string
    weight: string
    birthday: string
    favorite: string
    description: string
    state: 1 | 2 | 3 // 感情狀態  1单身2恋爱中3保密
    photos: Array<{
      data: number
      image: string
      imageDesc: string
    }>
  }
}

export interface IWebAnchorLife {
  userImage: string
  nickName: string
  houseName: string
  houseId: string
  lifeStory: Array<{
    date: number
    image: string
    context: string
  }>
  pager: IPager
}
