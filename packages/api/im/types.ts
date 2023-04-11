export interface IWebAnchor {
  attentionStatus: number
  fansCount: number
  houseId: string
  houseImage: string
  houseName: string
  liveStatus: 1 | 2 | 3 | 4
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
