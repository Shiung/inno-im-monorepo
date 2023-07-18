import type { IPager, withData, IMatch, MatchStatus, SportId } from './common'

export interface IWebAnchor {
  houseId: string
  houseImage: string
  userImage: string
  visitHistory: number
  houseName: string
  nickName: string
  playStreamAddress: string
  anchorSid: 1 | 2 | 3 | 100 // 1: 足球 2: 籃球 3: 網球 100: 充提
  liveStatus: 1 | 2 | 3 | 4 // 1:未开播 2:正在直播 3:暂时禁播 4:永久禁播
  fansCount: number
  attentionStatus: 0 | 1 | 2 // 0:未关注 1:已关注 2:无需出现关注按钮(主播自己)
  matchCount: number
  houseIntroduction: string
}

export interface IWebAnchors {
  query: {
    sid?: number
    keyWord?: string
    pageIdx: number
    pageSize: number
  }
  body: null
  res: withData<{
    list: IWebAnchor[]
    pager: IPager
  }>
}

export interface IWebAnchorMatch extends IMatch {
  sportId: SportId,
  matchTime: number
  matchStatus: MatchStatus,
  mid: number,
  vd: string,
  score: string
}

export interface IWebAnchorMatches {
  query: {
    houseId: string
  }
  body: null
  res: withData<{
    matchList: IWebAnchorMatch[]
  }>
}

export interface IWebAnchorDetail {
  query: {
    houseId: string
  }
  body: null
  res: withData<{
    userImage: string
    nickName: string
    personalIntroduction: string
  }>
}

export interface IWebAnchorLife {
  query: {
    houseId: string
    pageIdx?: number
    pageSize?: number
  }
  body: null
  res: withData<{
    list: Array<{
      date: number
      image: string
      context: string
    }>
    pager: IPager
  }>
}

export interface IWebAnchorPhoto {
  date: number
  imageDesc: string
  image: string
}

export interface IWebAnchorPhotos {
  query: {
    houseId: string
    pageIdx?: number
    pageSize?: number
  }
  body: null
  res: withData<{
    list: IWebAnchorPhoto[]
    pager: IPager
  }>
}

export interface IWebAnchorInfo {
  query: {
    houseId: string
  }
  body: null
  res: withData<{
    country: string
    height: string
    gender: 1 | 2 | 3 // 1男 2女 3保密
    description: string
    weight: string
    birthday: string
    favorite: string
    state: 0 | 1 | 2 | 3 // 0未填資料 1单身 2恋爱中 3保密
  }>
}

export interface IWebAnchorRecommend {
  query: {
    sid?: number
  }
  body: null
  res: withData<{
    houseId: string
    liveStatus: number // 1:未开播 2:正在直播 3:暂时禁播 4:永久禁播
    nickName: string
    personalIntroduction: string
    playStreamAddress: string
    anchorTitle: string
    houseIntroduction: string
    userImage: string
    homeName: string
    awayName: string
    competitionName: string
  }>
}
