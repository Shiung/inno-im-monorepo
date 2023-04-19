import { mock, Random } from 'mockjs'
import { genAnchorList, withData, randomPostTime } from './utils'

import type { IMockData } from '../../types'

export default [
  // #1.主播列表
  {
    url: '/anchor/web-anchors',
    timeout: 500,
    response: ({ query }) => mock(withData({
      "list": genAnchorList(Number(query.pageSize)),
      "pager": {
          "pageIdx": Number(query.pageIdx) || 1,
          "pageSize": Number(query.pageSize) || 20,
          "totalPage": 1,
          "totalRow": 2
      }
    }))
  },
  // #2.主播詳情
  {
    url: '/anchor/web-anchor/detail',
    response: () => mock(withData({
        "userImage": "https://oss-logo-hk.oss-accelerate.aliyuncs.com/business/image/596/4Hl7wS2hSoOb-brzYS1yLw.jpg",
        "nickName": "@ANCHORNICKNAME",
        "houseName": "@ANCHORHOUSENAME",
        "houseId": () => String(Random.natural(0, 99999)),
        "userInfo": {
                "country": "@region",
                "height": () => `${Random.natural(140, 170)}CM`,
                "weight": () => `${Random.natural(40, 60)}KG`,
                "birthday": "@date",
                "favorite": "烹飪,跳舞,旅行",
                "state": () => Random.natural(1, 3),
                "photos|1-10": [
                    {
                        "date": () => randomPostTime(),
                        "image": "@image",
                        "imageDesc": "@word"
                    }
                ]
        }
    }))
  },
  // #3.主播播報賽事
  {
    url: '/anchor/web-anchor/match-list',
    timeout: 500,
    response: () => mock(withData({
              "matchList|1-5": [
                  {
                "homeTeamName":"@cname",
                "homeTeamLogo":"@image",
                "homeTeamId":"@word",
                "awayTeamName":"@cname",
                "awayTeamLogo":"@image",
                "awayTeamId":"@id",
                "competitionName":"@cname",
                "competitionLogo":"@image",
                "competitionId":"@word",
                "sportId": () => Random.integer(1, 3),
                "matchId":"@id",
                "matchTime": () => randomPostTime(),
                "matchStatus": () => Random.integer(1, 8),
                "homeScore": () => Array.from({ length: 7 }, () => Random.integer(0, 10)),
                "awayScore": () => Array.from({ length: 7 }, () => Random.integer(0, 10)),
              },
          ]
    }))
  },
  // #4.主播生活動態
  {
    url: '/anchor/web-anchor/life',
    response: () => mock(withData({
      "userImage": "@image",
      "nickName": "@ANCHORNICKNAME",
      "houseName": "@ANCHORHOUSENAME",
      "houseId": () => String(Random.natural(0, 99999)),
      "lifeStory|10-20": [
          {
              "date": () => randomPostTime(),
              "image": "@image",
              "title": "@cword",
              "context": "@cparagraph",
          }
        ]
    }))
  }
] as IMockData[]
