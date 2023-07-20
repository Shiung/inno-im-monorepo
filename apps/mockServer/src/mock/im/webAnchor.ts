import { mock, Random } from 'mockjs'
import { prefix, withData, randomPostTime, genPager, genHouseId, genTeamInfo } from './utils'
import { getRandomItemFromArray } from 'utils'

import type * as Types from 'api/im/types'
import type { IMockData } from '../../types'

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

const webAnchors: IMockData[] = [
  {
    url: `${prefix}/v1/anchor/web-anchors`,
    timeout: 500,
    response: ({ query }) => mock(withData<Types.IWebAnchors>({
      list: Array.from({ length: Number(query.pageSize) || 20 }, (_, idx) => ({
        houseId: genHouseId(),
        houseImage: "https://oss-logo-hk.oss-accelerate.aliyuncs.com/business/image/596/PztnHi1kR12iCdGOCr1lvA.png",
        userImage: getRandomItemFromArray([
          "https://oss-logo-hk.oss-accelerate.aliyuncs.com/business/image/596/4Hl7wS2hSoOb-brzYS1yLw.jpg",
          "https://oss-",
          "",
        ]),
        visitHistory: Random.natural(0, 999999999999),
        houseName: "@ANCHORHOUSENAME",
        nickName: "@ANCHORNICKNAME",
        playStreamAddress: "https://live5.hqzhuce.com/live/10596.flv?auth_key=1681107440-0-596-0c34337853d9ae4d8bd536ab2ea083da",
        playStreamAddress2: "https://live5.hqzhuce.com/live/10596.flv?auth_key=1681107440-0-596-0c34337853d9ae4d8bd536ab2ea083da",
        liveStatus: Random.natural(1, 4) as Types.IWebAnchor['liveStatus'],
        sid: idx % 3 === 0 ? 100 : Random.integer(1,3) as Types.IWebAnchor['sid'],
        fansCount: Random.natural(0, 10000000),
        attentionStatus: Random.natural(0, 2) as Types.IWebAnchor['attentionStatus'],
        matchCount: Random.natural(0, 10),
        houseIntroduction: "@csentence"
      })),
      pager: genPager({ pageIdx: Number(query.pageIdx), pageSize: Number(query.pageSize) })
    }))
  },
  {
    url: `${prefix}/v1/anchor/web-anchor/detail`,
    response: () => mock(withData<Types.IWebAnchorDetail>({
      userImage: "https://oss-logo-hk.oss-accelerate.aliyuncs.com/business/image/596/4Hl7wS2hSoOb-brzYS1yLw.jpg",
      nickName: "@ANCHORNICKNAME",
      personalIntroduction: '@cparagraph'
    }))
  },
  {
    url: `${prefix}/v1/anchor/web-anchor/match-list`,
    timeout: 500,
    response: () => mock(withData<Types.IWebAnchorMatches>({
      matchList: Array.from({ length: Random.natural(0, 5) }, () => ({
        ...genTeamInfo(true) as Pick<Types.IWebAnchorMatch, 'homeId' | 'homeName' | 'awayId' | 'awayName'>,
        tnName: "@cname",
        tid: Random.integer(10000, 50000),
        sportId: Random.integer(1, 3) as Types.IWebAnchorMatch['sportId'],
        matchId: "@id",
        matchTime: randomPostTime(),
        matchStatus: Random.integer(1, 8) as Types.IWebAnchorMatch['matchStatus'],
        mid: Random.integer(10000, 50000),
        vd: Random.word(1),
        score: "@integer(1,10)-@integer(1,10)"
      }))
    }))
  },
  {
    url: `${prefix}/v1/anchor/web-anchor/life`,
    response: ({ query }) => mock(withData<Types.IWebAnchorLife>({
      list: Array.from({ length: Random.natural(0, 20) }, () => ({
        date: randomPostTime(),
        image: "@image",
        context: "@cparagraph",
      })),
      pager: genPager({ pageIdx: Number(query.pageIdx), pageSize: Number(query.pageSize) })
    }))
  },
  {
    url: `${prefix}/v1/anchor/web-anchor/photos`,
    response: ({ query }) => mock(withData<Types.IWebAnchorPhotos>({
      list: Array.from({ length: Random.natural(0, 20) }, () => ({
        date: randomPostTime(),
        imageDesc: "@image",
        image: "@image",
      })),
      pager: genPager({ pageIdx: Number(query.pageIdx), pageSize: Number(query.pageSize) })
    }))
  },
  {
    url: `${prefix}/v1/anchor/web-anchor/info`,
    response: () => mock(withData<Types.IWebAnchorInfo>({
      country: "@region",
      height: String(Random.natural(150, 170)),
      gender: Random.natural(1, 3) as Types.IWebAnchorInfo['res']['data']['gender'],
      weight: String(Random.natural(40, 60)),
      birthday: "@datetime",
      favorite: "@cword",
      description: "@csentence",
      state: Random.natural(1, 3) as Types.IWebAnchorInfo['res']['data']['state'],
    }))
  },
  {
    url: `${prefix}/v1/anchor/web-anchor/recommend`,
    response: () => mock(withData<Types.IWebAnchorRecommend>({
      houseId: genHouseId(),
      liveStatus: Random.natural(1, 4) as Types.IWebAnchorRecommend['res']['data']['liveStatus'],
      nickName: "@cname",
      playStreamAddress: "https://live5.sxjgyc.com/live/12277.flv?auth_key=1681809903-0-2277-4ee153e0776ecf93107780201d10e10a",
      personalIntroduction: "@cword",
      anchorTitle: "@csentence",
      houseIntroduction: "@csentence",
      userImage: "https://oss-logo-hk.oss-accelerate.aliyuncs.com/business/image/575/w-K5RvqqSqCmIrWD3p0xxA.png",
      homeName: "@cname",
      awayName: "@cname",
      competitionName: "@cname"
    }))
  }
]

export default webAnchors
