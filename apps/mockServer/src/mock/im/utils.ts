import { Random } from 'mockjs'

Random.extend({
  anchorhousename: function() {
    const names = ['球球直播', '娟娟直播', '糖果直播', '君君直播']
    return this.pick(names)
  },
  anchornickname: function() {
    const names = ['翠花姑凉的小花', '娟娟', '糖果', '君君']
    return this.pick(names)
  }
})

export const genAnchorList = (size: number) => Array.from({ length: size || 20 }, () => ({
  "attentionStatus": 0,
  "fansCount": () => Random.natural(0, 10000000),
  "houseId": () => String(Random.natural(0, 99999)),
  "houseImage": "https://oss-logo-hk.oss-accelerate.aliyuncs.com/business/image/596/PztnHi1kR12iCdGOCr1lvA.png",
  "houseName": "@ANCHORHOUSENAME",
  "liveStatus": () => Random.natural(1, 4),
  "nickName": "@ANCHORNICKNAME",
  "playStreamAddress": "https://live5.hqzhuce.com/live/10596.flv?auth_key=1681107440-0-596-0c34337853d9ae4d8bd536ab2ea083da",
  "userImage": "https://oss-logo-hk.oss-accelerate.aliyuncs.com/business/image/596/4Hl7wS2hSoOb-brzYS1yLw.jpg",
  "visitHistory": () => Random.natural(0, 999999999999)
}))
