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
