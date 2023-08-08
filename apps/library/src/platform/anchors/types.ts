import type { TStreamLiveStatus } from '$src/types'

export interface IPlatformAnchor {
  userImage: string
  houseId: string
  visitHistory: number
  playStreamAddress: string
  playStreamAddress2: string // m3u8格式
  liveStatus: TStreamLiveStatus
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
