import { list } from './store'
import type { IPlatformAnchor } from './types'

const genAnchor = (houseId: string) => ({
  userImage: "https://oss-logo-hk.oss-accelerate.aliyuncs.com/business/image/1235/z5xMTdihT3O2K9C5oAvznQ.png",
  houseId: houseId,
  visitHistory: 2140,
  playStreamAddress: "https://live5.sxjgyc.com/live/11235.flv?auth_key=1681881901-0-1235-20242bed5d9c02cbd55510c474299ae5",
  liveStatus: 1 as IPlatformAnchor['liveStatus'],
  houseName: "直播",
  houseImage: "https://oss-logo-hk.oss-accelerate.aliyuncs.com/business/image/1235/QNAIY4IgQNmJneMNQ1U_cw.png",
  nickName: `n${houseId}`,
  anchorTypeName: "篮球1",
  fansCount: 2,
  anchorTitle: "",
  description: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa"
})


export const setAnchors = () => {
  list.set([
    genAnchor('111111'),
    genAnchor('222222'),
    genAnchor('333333'),
    genAnchor('444444'),
    genAnchor('555555'),
    genAnchor('666666'),
  ])

  setTimeout(() => {
    list.set([
      genAnchor('777777'),
      genAnchor('888888'),
      genAnchor('999999'),
    ])
  }, 2000)

  setTimeout(() => {
    list.update([
      genAnchor('000000'),
    ])
  }, 4000)
}
