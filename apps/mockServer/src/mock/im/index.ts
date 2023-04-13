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
  // #5.專家預測
  {
    url: 'expert/predictions',
    response: () => mock({
      "message": "",
      "code": "0",
      "data": {
        "list:":[
          {
              "expertId": "@paragraph",
              "expertName": "@name",
              // "expertImage": "http://file.fengkuangtiyu.cn/imagesER/010/01016777388541379038.png",
              "expertImage": "@image",
              "releaseTime": 1667504351531,
              "closeTime": 1667504371531,
              "market": "獨贏",
              "hotStreak": Random.integer(0, 12),
              "hitRate": Random.integer(60, 100),
              "articleId": "wv78xixr24nhokr",
              "articleStatus": Random.integer(1, 2),
              "title": "@ctitle",
              "homeName": "@cname",
              "awayName": "@cname",
              "leagueName": "@cname",
              "matchStatus": Random.integer(1, 8),
              "matchTime": 1667504361531
          }
        ]
      }
    })
  }
] as IMockData[]
