import { mock, Random } from 'mockjs'
import { getRandomItemFromArray } from 'utils'

import type { IPredictionMarket } from 'api/im/types'

export const prefix = '/api-gateway'

export const withData = <T extends { res: { data: any } }>(data: T['res']['data']) => ({
  code: 0,
  message: "",
  serverTime: Date.now(),
  data
})

export const randomPostTime = () => {
  const now = Date.now()
  const unit = getRandomItemFromArray(['sec', 'min', 'hour', 'day'])

  switch (unit) {
    case 'sec': return now - Random.integer(1000, 59 * 1000)
    case 'min': return now - Random.integer(60 * 1000, 60 * 59 * 1000)
    case 'hour': return now - Random.integer(60 * 60 * 1000, 60 * 60 * 23 * 1000)
    case 'day': return now - Random.integer(60 * 60 * 24 * 1000, 60 * 60 * 24 * 30 * 1000)
    default: return now
  }
}

export const genPager = (query: { pageIdx?: number, pageSize?: number }) => ({
  pageIdx: query.pageIdx || 1,
  pageSize: query.pageSize || 20,
  totalPage: 100,
  totalRow: 20
})

const marketTypes = {
  '11': ['h', 'a'],
  '12': ['h', 'a'],
  '13': ['ov', 'ud'],
  '21': ['h', 'a'],
  '22': ['h', 'a'],
  '23': ['ov', 'ud'],
}

export const genMarket = (): IPredictionMarket => {
  const marketType = getRandomItemFromArray(Object.keys(marketTypes)) as IPredictionMarket['marketType']
  const item = marketTypes[marketType] || []
  const matchResult = getRandomItemFromArray(item) as IPredictionMarket['matchResult']
  return {
    marketType,
    matchResult,
    odds: [{
      h: String(Random.float(0.01, 50, 0, 2)),
      a: String(Random.float(0.01, 50, 0, 2)),
      d: String(Random.float(0.01, 50, 0, 2)),
      k: 'k',
      ov: String(Random.float(0.01, 50, 0, 2)),
      ud: String(Random.float(0.01, 50, 0, 2)),
    }]
  }
}

export const getExpertImage = () => {
  return getRandomItemFromArray([
    "http://file.fengkuangtiyu.cn/imagesER/010/01016777388541379038.png",
    "http://file",
    ''
  ])
}

export const genHouseId = () => String(Random.natural(0, 99999))

export const genTeamInfo = (isAnchor?: boolean) => {
  const homeId = Random.integer(1, 5)
  let awayId = Random.integer(1, 5)
  while (awayId === homeId) {
    awayId = Random.integer(1, 5)
  }

  if (isAnchor) {
    return {
      homeName: "@cname",
      homeId: homeId,
      awayName: "@cname",
      awayId: awayId
    }
  }

  return {
    homeName: "@cname",
    homeId,
    awayName: "@cname",
    awayId
  }
}

export const genSelfOrder = (iid: number) => {
  return {
    uuid: RegExp(/^\d{12}-[a-z0-9]{6}$/),
    ante: Random.integer(0, 1000000),
    totalAnte: Random.float(0, 1000000, 2, 2),
    payout: 0,
    mayWinAmount: Random.float(0, 1000000, 2, 2),
    netWin: Random.float(-1000000, 1000000, 2, 2),
    parlayBet: false,
    parlay: 1,
    option: 1,
    canceled: false,
    details: [genOrderDetail(iid)],
    marketType: Random.pick(['ML', 'EU', 'IN', 'HK']),
    status: 2,
    cashOut: Random.boolean(),
    currency: Random.pick(['CNY', 'nIDR', 'WBTC_ERC20', 'BRL']),
    tnPriority: 50131,
    orderStatus: 0,
    safeFlag: true,
    betTime: '@datetime'
  }
}

export const genOrderDetail = (iid: number) => {
  return {
    sid: 1,
    tournamentName: '@region',
    iid,
    homeName: '@region',
    awayName: '@region',
    kickOffTime: '@datetime',
    odds: `${Random.float(0, 10, 1, 2)}`,
    market: Random.pick(['ah', 'tg', 'cs_1st', '1x2_1st', 'ou_1st', 'ou', 'ah_1st']),
    betOn: Random.pick(['a', '2-3', '2-2', 'ud', 'h']),
    conditions: `${Random.float(-10, 10, 1, 1)}`,
    settle: Random.integer(0, 1),
    outright: false,
    inplay: false,
    period: Random.string(6),
    stage: '',
    cashoutPeriod: '',
    cashoutStage: '',
    orderPhase: Random.integer(1, 4),
    homeScore: `${Random.integer(1, 10)}`,
    awayScore: `${Random.integer(1, 10)}`,
    probability: `${Random.float(0, 1, 1, 5)}`,
    vendor: Random.string(6),
    tid: 25741,
    homeId: 342277,
    awayId: 45,
    safeFlag: true,
    scoreType: 'NORMAL',
    matchScore: { h: '', a: '' }
  }
}

export const genOtherOrder = (iid: number) => {
  return mock({
    iid,
    nickName: Random.name(),
    account:  Random.name(),
    vip: Random.integer(1, 9),
    avatar: Random.integer(1, 10),
    betOrder: { ...genSelfOrder(iid) },
  })
}

export const genMultiply = (val: number) => (num: number) => val * num