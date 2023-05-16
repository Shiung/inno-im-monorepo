import { mock, Random } from 'mockjs'
import { withData, genPager, randomPostTime, genMarket, getExpertImage } from './utils'

import type * as Types from 'api/im/types'
import type { IMockData } from '../../types'
import { IArticle } from 'api/im/types'

const expert: IMockData[] = [
  {
    url: '/v1/expert/predictions',
    response: ({ query }) => mock(withData<Types.IExpertPredictions>({
      list: Array.from({ length: Number(query.pageSize) || 10 }, () => {
        const market = genMarket()
        const sportId = Number(market.marketType[0]) as Types.IExpertPrediction['sportId']

        return {
          ...market,
          expertId: "@word",
          expertName: "@cname",
          expertImage: getExpertImage(),
          releaseTime: randomPostTime(),
          closeTime: randomPostTime(),
          hotStreak: Random.integer(0, 12),
          hitRate: Random.float(60, 100, 0, 2),
          articleId: "@word",
          articleStatus: Random.integer(1, 2) as Types.IExpertPrediction['articleStatus'],
          title: "@cparagraph",
          homeName: "@cname",
          awayName: "@cname",
          leagueName: "@cname",
          matchStatus: Random.integer(1, 8) as Types.IExpertPrediction['matchStatus'],
          matchTime: randomPostTime(),
          sportId,
        }
      }),
      pager: genPager({ pageIdx: Number(query.pageIdx), pageSize: Number(query.pageSize) })
    }))
  },
  {
    url: '/v1/expert/recommend',
    response: ({ query }) => mock(withData<Types.IExpertRecommand>({
      list: Array.from({ length: Number(query.pageSize) || 10 }, () => ({
        expertId: "@word",
        expertName: "@cname",
        expertImage: getExpertImage(),
        releaseTime: randomPostTime(),
        closeTime: randomPostTime(),
        market: "獨贏",
        hotStreak: Random.integer(0, 12),
        hitRate: Random.float(60, 100, 0, 2),
        articleId: "@word",
        homeName: "@cname",
        awayName: "@cname",
        leagueName: "@cname"
      })),
      pager: genPager({ pageIdx: Number(query.pageIdx), pageSize: Number(query.pageSize) })
    }))
  },
  {
    url: '/v1/expert/info',
    response: () => mock(withData<Types.IExpertInfo>({
        expertId: "@word",
        expertName: "@cname",
        expertImage: getExpertImage(),
        hotStreak: Random.integer(0, 12),
    }))
  },
  {
    url: '/v1/expert/article/now',
    response: ({ query }) => mock(withData<Types.IExpertArthcleNow>({
      list: Array.from({ length: Number(query.pageSize) || 4 }, () => ({
        ...genMarket(),
        articleId: "@word",
        releaseTime: randomPostTime(),
        closeTime: randomPostTime(),
        title: "@cparagraph",
        homeName: "@cname",
        awayName: "@cname",
        leagueName: "@cname",
        hitStatus: Random.integer(1, 2) as IArticle['hitStatus']
      }))
    }))
  },
  {
    url: '/v1/expert/article/history',
    response: ({ query }) => mock(withData<Types.IExpertArthcleHistory>({
      list: Array.from({ length: Number(query.pageSize) || 4 }, () => ({
        ...genMarket(),
        articleId: "@word",
        releaseTime: randomPostTime(),
        closeTime: randomPostTime(),
        title: "@cparagraph",
        homeName: "@cname",
        awayName: "@cname",
        leagueName: "@cname",
        hitStatus: Random.integer(1, 2) as IArticle['hitStatus']
      })),
      pager: genPager({ pageIdx: Number(query.pageIdx), pageSize: Number(query.pageSize) })
    }))
  },
  {
    url: '/v1/expert/article/hit',
    response: ({ query }) => mock(withData<Types.IExpertArthcleHit>({
      list: Array.from({ length: Number(query.pageSize) || 4 }, () => ({
        ...genMarket(),
        articleId: "@word",
        releaseTime: randomPostTime(),
        closeTime: randomPostTime(),
        title: "@cparagraph",
        homeName: "@cname",
        awayName: "@cname",
        leagueName: "@cname",
        hitStatus: Random.integer(1, 2) as IArticle['hitStatus']
      })),
      pager: genPager({ pageIdx: Number(query.pageIdx), pageSize: Number(query.pageSize) })
    }))
  },
  {
    url: '/v1/expert/statistics',
    response: () => mock(withData<Types.IExpertStatistics>({
      list: Array.from({ length: 10 }, () => ({
        hitStatus: Random.natural(0, 3) as Types.IExpertStatistics['res']['data']['list'][number]['hitStatus']
      })),
      info: {
        type: Random.natural(1, 3) as Types.IExpertStatistics['res']['data']['info']['type'],
        hotStreak: Random.natural(1, 12),
        hitRate: Random.float(60, 100, 0, 2),
      }
    }))
  },
  {
    url: '/v1/expert/match/article',
    response: ({ query }) => mock(withData<Types.IExpertPredictions>({
      list: Array.from({ length: Number(query.pageSize) || 10 }, () => {
        const market = genMarket()
        const sportId = Number(market.marketType[0]) as Types.IExpertPrediction['sportId']

        return {
          ...market,
          expertId: "@word",
          expertName: "@cname",
          expertImage: getExpertImage(),
          releaseTime: randomPostTime(),
          closeTime: randomPostTime(),
          hotStreak: Random.integer(0, 12),
          hitRate: Random.float(60, 100, 0, 2),
          articleId: "@word",
          articleStatus: Random.integer(1, 2) as Types.IExpertPrediction['articleStatus'],
          title: "@cparagraph",
          homeName: "@cname",
          awayName: "@cname",
          leagueName: "@cname",
          matchStatus: Random.integer(1, 8) as Types.IExpertPrediction['matchStatus'],
          matchTime: randomPostTime(),
          sportId,
        }
      }),
      pager: genPager({ pageIdx: Number(query.pageIdx), pageSize: Number(query.pageSize) })
    }))
  },
]

export default expert
