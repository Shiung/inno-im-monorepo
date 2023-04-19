import { mock, Random } from 'mockjs'
import { withData } from './utils'
import type { IMockData } from '../../types'

export default [
  // #5.專家預測
  {
    url: '/expert/predictions',
    response: () => mock(withData({
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
        ],
        "pager":{
          "pageIdx":1,
          "pageSize":15,
          "totalPage":30,
          "totalRow":450,
        }
    }))
  }
] as IMockData[]
