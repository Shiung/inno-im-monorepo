import { mock, Random } from 'mockjs'
import { withData, genPager, randomPostTime, genMarket } from './utils'

import type * as Types from 'api/im/types'
import type { IMockData } from '../../types'

const expert: IMockData[] = [
  {
    url: '/expert/predictions',
    response: ({ query }) => mock(withData<Types.IExpertPredictions>({
      list: Array.from({ length: Number(query.pageSize) || 10 }, () => ({
        expertId: "@word",
        expertName: "@cname",
        expertImage: "http://file.fengkuangtiyu.cn/imagesER/010/01016777388541379038.png",
        releaseTime: randomPostTime(),
        closeTime: randomPostTime(),
        market: genMarket(),
        hotStreak: Random.integer(0, 12),
        hitRate: Random.integer(60, 100),
        articleId: "@word",
        articleStatus: Random.integer(1, 2) as Types.IExpertPrediction['articleStatus'],
        title: "@cparagraph",
        homeName: "@cname",
        awayName: "@cname",
        leagueName: "@cname",
        matchStatus: Random.integer(1, 8) as Types.IExpertPrediction['matchStatus'],
        matchTime: randomPostTime(),
        sportId: Random.integer(1, 2) as Types.IExpertPrediction['sportId']
      })),
      pager: genPager({ pageIdx: Number(query.pageIdx), pageSize: Number(query.pageSize) })
    }))
  },
  {
    url: '/expert/recommend',
    response: ({ query }) => mock(withData<Types.IExpertRecommand>({
      list: Array.from({ length: Number(query.pageSize) || 10 }, () => ({
        expertId: "@word",
        expertName: "@cname",
        expertImage: "http://file.fengkuangtiyu.cn/imagesER/010/01016777388541379038.png",
        releaseTime: randomPostTime(),
        closeTime: randomPostTime(),
        market: "獨贏",
        hotStreak: Random.integer(0, 12),
        hitRate: Random.integer(60, 100),
        articleId: "@word",
        homeName: "@cname",
        awayName: "@cname",
        leagueName: "@cname"
      })),
      pager: genPager({ pageIdx: Number(query.pageIdx), pageSize: Number(query.pageSize) })
    }))
  },
  {
    url: '/expert/info',
    response: () => mock(withData<Types.IExpertInfo>({
        expertId: "@word",
        expertName: "@cname",
        expertImage: "http://file.fengkuangtiyu.cn/imagesER/010/01016777388541379038.png",
        hotStreak: Random.integer(0, 12),
    }))
  },
  {
    url: '/expert/article/now',
    response: ({ query}) => mock(withData<Types.IExpertArthcleNow>({
      list: Array.from({ length: Number(query.pageSize) || 4 }, () => ({
        articleId: "@word",
        releaseTime: randomPostTime(),
        closeTime: randomPostTime(),
        market: genMarket(),
        title: "@cparagraph",
        homeName: "@cname",
        awayName: "@cname",
        leagueName: "@cname"
      }))
    }))
  },
  {
    url: '/expert/article/history',
    response: ({ query }) => mock(withData<Types.IExpertArthcleHistory>({
      list: Array.from({ length: Number(query.pageSize) || 4 }, () => ({
        articleId: "@word",
        releaseTime: randomPostTime(),
        closeTime: randomPostTime(),
        market: genMarket(),
        title: "@cparagraph",
        homeName: "@cname",
        awayName: "@cname",
        leagueName: "@cname"
      })),
      pager: genPager({ pageIdx: Number(query.pageIdx), pageSize: Number(query.pageSize) })
    }))
  },
  {
    url: '/expert/article/hit',
    response: ({ query }) => mock(withData<Types.IExpertArthcleHit>({
      list: Array.from({ length: Number(query.pageSize) || 4 }, () => ({
        articleId: "@word",
        releaseTime: randomPostTime(),
        closeTime: randomPostTime(),
        market: genMarket(),
        title: "@cparagraph",
        homeName: "@cname",
        awayName: "@cname",
        leagueName: "@cname"
      })),
      pager: genPager({ pageIdx: Number(query.pageIdx), pageSize: Number(query.pageSize) })
    }))
  },
  {
    url: '/expert/statistics',
    response: () => mock(withData<Types.IExpertStatistics>({
      list: Array.from({ length: 10 }, () => ({
        hitStatus: Random.natural(0, 3) as Types.IExpertStatistics['res']['data']['list'][number]['hitStatus']
      }))
    }))
  },
  {
    url: '/expert/match/article',
    response: () => mock(withData<Types.IExpertMacthArticle>({
      match: {
        homeName: "@cname",
        awayName: "@cname",
        leagueName: "@cname",
        matchStatus: Random.integer(1, 8) as Types.IExpertMacthArticle['res']['data']['match']['matchStatus'],
        matchTime: randomPostTime(),
        sportId: Random.integer(1, 2) as Types.IExpertMacthArticle['res']['data']['match']['sportId'],
      },
      list: Array.from({ length: 10 }, () => ({
        expertId: "@word",
        expertName: "@cname",
        expertImage: "http://file.fengkuangtiyu.cn/imagesER/010/01016777388541379038.png",
        releaseTime: randomPostTime(),
        closeTime: randomPostTime(),
        market: genMarket(),
        hotStreak: Random.integer(0, 12),
        hitRate: Random.integer(60, 100),
        articleId: "@word",
        articleStatus: Random.integer(1, 2) as Types.IExpertMacthArticle['res']['data']['list'][number]['articleStatus'],
        title: "@cparagraph",
        
      }))
    }))
  }
]

export default expert
