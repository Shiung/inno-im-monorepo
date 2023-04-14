import { mock, Random } from 'mockjs'
import { genAnchorList } from './utils'

import type { IMockData } from '../../types'

export default [
  // #1.主播列表
  {
    url: '/anchor/web-anchors',
    timeout: 500,
    response: ({ query }) => mock({
      "code": "0",
      "data": {
          "list": genAnchorList(Number(query.pageSize)),
          "pager": {
              "pageIdx": Number(query.pageIdx) || 1,
              "pageSize": Number(query.pageSize) || 20,
              "totalPage": 1,
              "totalRow": 2
          }
      },
      "message": "",
    })
  },
  // #2.主播詳情
  {
    url: '/anchor/web-anchor/detail',
    response: () => mock({
      "message": "",
      "code": "0",
      "data": {
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
                "state": "單身",
                "photos|1-10": [
                    {
                        "date": 1681282935,
                        "image": "@image"
                    }
                ]
        }
      }
    })
  },
  // #3.主播播報賽事
  {
    url: '/anchor/web-anchor/match-list',
    timeout: 2000,
    response: () => mock({
      "message": "",
          "code": "0",
          "data": {
              "matchList|1-5": [
                  {
                "homeTeamName":"@cname",
                "homeTeamLogo":"@image",
                "homeTeamId":"@wordvmqy9i6jd3c4k9r",
                "awayTeamName":"@cname",
                "awayTeamLogo":"@image",
                "awayTeamId":"@id",
                "competitionName":"@cname",
                "competitionLogo":"@image",
                "competitionId":"mo07dnid08ixknx",
                "sportId": () => Random.integer(1, 3),
                "matchId":"@id",
                "matchTime":1680769800,
                "matchStatus": () => Random.integer(1, 8),
                "homeScore": () => Array.from({ length: 7 }, () => Random.integer(0, 10)),
                "awayScore": () => Array.from({ length: 7 }, () => Random.integer(0, 10)),
              },
          ]
        }
    })
  },
] as IMockData[]
