export interface IPlatformAnchor {
  userImage: string
  houseId: string
  visitHistory: number
  playStreamAddress: string
  liveStatus: 1 | 2 | 3 | 4 // 1:未开播 2:正在直播 3:暂时禁播 4:永久禁播
  houseName: string
  houseImage: string
  nickName: string
  anchorTypeName: string
  fansCount: number
  anchorTitle: string
  houseIntroduction: string
}

export interface IPlatformAnchors {
  anchors: IPlatformAnchor[]
}
