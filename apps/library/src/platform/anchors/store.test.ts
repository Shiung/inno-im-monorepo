import { list } from './store'
import type { IPlatformAnchor } from './types'

const genAnchor = (houseId: string): IPlatformAnchor => ({
  userImage: "https://oss-logo-hk.oss-accelerate.aliyuncs.com/business/image/1235/z5xMTdihT3O2K9C5oAvznQ.png",
  houseId: houseId,
  visitHistory: 2140,
  playStreamAddress: "https://live5.js-mooc.com/live/52279.flv?auth_key=1682424264-0-2279-4ee2eeb922b9fa35e166d2af01e69688",
  liveStatus: 1 as IPlatformAnchor['liveStatus'],
  houseName: "直播",
  houseImage: "https://oss-logo-hk.oss-accelerate.aliyuncs.com/business/image/1235/QNAIY4IgQNmJneMNQ1U_cw.png",
  nickName: `n${houseId}`,
  anchorTypeName: "篮球1",
  fansCount: 2,
  anchorTitle: "",
  houseIntroduction: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa"
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
