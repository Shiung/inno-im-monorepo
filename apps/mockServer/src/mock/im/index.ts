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
  // #5.專家預測
  {
    url: '/expert/predictions',
    response: () => mock({
      "message": "",
      "code": "0",
      "data": {
        "list|5-20":[
          {
              "expertId": "@word",
              "expertName": "@cname",
              "expertImage": "http://file.fengkuangtiyu.cn/imagesER/010/01016777388541379038.png",
              "releaseTime": 1667504351531,
              "closeTime": 1667504371531,
              "market": "獨贏",
              "hotStreak": () => Random.integer(0, 12),
              "hitRate": () => Random.integer(60, 100),
              "articleId": "@word",
              "articleStatus": () => Random.integer(1, 2),
              "title": "@cparagraph",
              "homeName": "@cname",
              "awayName": "@cname",
              "leagueName": "@cname",
              "matchStatus": () => Random.integer(1, 8),
              "matchTime": 1667504361531
          }
        ]
      }
    })
  }
] as IMockData[]
