import { mock, Random } from 'mockjs'
import { withData, genPager, randomPostTime, genMarket, getExpertImage, genTeamInfo } from './utils'

import type * as Types from 'api/im/types'
import type { IMockData } from '../../types'

const expert: IMockData[] = [
  {
    url: '/v1/expert/predictions',
    response: ({ query }) => mock(withData<Types.IExpertPredictions>({
      list: Array.from({ length: Number(query.pageSize) || 10 }, () => {
        const market = genMarket()

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
          tnName: "@cname",
          matchStatus: Random.integer(1, 8) as Types.IExpertPrediction['matchStatus'],
          matchTime: randomPostTime(),
          sportId: Random.integer(1, 4) as Types.IExpertPrediction['sportId'],
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
        tnName: "@cname"
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
    response: ({ query}) => mock(withData<Types.IExpertArticleNow>({
      list: Array.from({ length: Number(query.pageSize) || 4 }, () => ({
        ...genMarket(),
        articleId: "@word",
        releaseTime: randomPostTime(),
        closeTime: randomPostTime(),
        title: "@cparagraph",
        homeName: "@cname",
        awayName: "@cname",
        tnName: "@cname",
        hitStatus: Random.integer(1, 2) as Types.IArticle['hitStatus']
      }))
    }))
  },
  {
    url: '/v1/expert/article/history',
    response: ({ query }) => mock(withData<Types.IExpertArticleHistory>({
      list: Array.from({ length: Number(query.pageSize) || 4 }, () => ({
        ...genMarket(),
        articleId: "@word",
        releaseTime: randomPostTime(),
        closeTime: randomPostTime(),
        title: "@cparagraph",
        homeName: "@cname",
        awayName: "@cname",
        tnName: "@cname",
        hitStatus: Random.integer(1, 2) as Types.IArticle['hitStatus']
      })),
      pager: genPager({ pageIdx: Number(query.pageIdx), pageSize: Number(query.pageSize) })
    }))
  },
  {
    url: '/v1/expert/article/hit',
    response: ({ query }) => mock(withData<Types.IExpertArticleHit>({
      list: Array.from({ length: Number(query.pageSize) || 4 }, () => ({
        ...genMarket(),
        articleId: "@word",
        releaseTime: randomPostTime(),
        closeTime: randomPostTime(),
        title: "@cparagraph",
        homeName: "@cname",
        awayName: "@cname",
        tnName: "@cname",
        hitStatus: Random.integer(1, 2) as Types.IArticle['hitStatus']
      })),
      pager: genPager({ pageIdx: Number(query.pageIdx), pageSize: Number(query.pageSize) })
    }))
  },
  {
    url: '/v1/expert/statistics',
    response: () => mock(withData<Types.IExpertStatistics>({
      list: Array.from({ length: 10 }, () => ({
        hitStatus: Random.natural(1, 2) as Types.IExpertStatistics['res']['data']['list'][number]['hitStatus'],
        releaseTime: randomPostTime()
      })),
      info: Array.from({ length: 3 }, (_, idx) => ({
        type: idx + 1 as Types.IExpertStatistics['res']['data']['info'][number]['type'],
        hotStreak: Random.natural(1, 12),
        hitRate: Random.float(60, 100, 0, 2),
      })),
    }))
  },
  {
    url: '/v1/expert/match/article',
    response: ({ query }) => mock(withData<Types.IExpertPredictions>({
      list: Array.from({ length: Number(query.pageSize) || 10 }, () => {
        const market = genMarket()
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
          tnName: "@cname",
          matchStatus: Random.integer(1, 8) as Types.IExpertPrediction['matchStatus'],
          matchTime: randomPostTime(),
          sportId: Random.integer(1, 4) as Types.IExpertPrediction['sportId']
        }
      }),
      pager: genPager({ pageIdx: Number(query.pageIdx), pageSize: Number(query.pageSize) })
    }))
  },
  {
    url: '/v1/expert/article/detail',
    response: () => mock(withData<Types.IExpertArticleDetail>(
      {
        articleId: "@word",
        releaseTime: randomPostTime(),
        closeTime: randomPostTime(),
        articleStatus: Random.integer(1, 2) as Types.IArticleDetail['articleStatus'],
        title: "@cparagraph",
        content: "@cparagraph",
        tnName: "@cname",
        tid: Random.integer(10000, 50000),
        matchStatus: Random.integer(1, 8) as Types.IArticleDetail['matchStatus'],
        matchTime: randomPostTime(),
        sportId: Random.integer(1, 4) as Types.IArticleDetail['sportId'],
        mid: Random.integer(10000, 50000),
        vd: Random.word(1),
        past: Random.boolean(),
        ...(genTeamInfo() as Pick<Types.IArticleDetail, 'homeName' | 'homeId' | 'awayName' | 'awayId'>),
        ...genMarket(),
      }
    ))
  },
]

export default expert
