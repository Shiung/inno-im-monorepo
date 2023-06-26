import { list } from '$src/platform/anchors/store'
import type { IPlatformAnchor } from '$src/platform/anchors/types'

const genAnchor = (houseId: string): IPlatformAnchor => ({
  userImage: "https://oss-logo-hk.oss-accelerate.aliyuncs.com/business/image/1235/z5xMTdihT3O2K9C5oAvznQ.png",
  houseId: houseId,
  visitHistory: 2140,
  playStreamAddress: "https://live5.js-mooc.com/live/70575.flv?auth_key=1686281104-0-575-243e34591ba3c2e65bfc0567fd527f3a",
  playStreamAddress2: "https://live5.js-mooc.com/live/70575.m3u8?auth_key=1686281104-0-575-243e34591ba3c2e65bfc0567fd527f3a",
  liveStatus: 2 as IPlatformAnchor['liveStatus'],
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

  // setTimeout(() => {
  //   list.set([
  //     genAnchor('777777'),
  //     genAnchor('888888'),
  //     genAnchor('999999'),
  //   ])
  // }, 2000)

  // setTimeout(() => {
  //   list.update([
  //     genAnchor('000000'),
  //   ])
  // }, 4000)
}
