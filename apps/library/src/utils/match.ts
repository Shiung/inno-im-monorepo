import type { MarketTypeMap, MarketType, MatchStatus } from 'api/im/types/common'
import type { IWebAnchorMatch } from 'api/im/types'
import { SidString } from '$src/constant'
import type { GoDetailCallback } from '$stores'

type MarketTypeNum = typeof MarketTypeMap[keyof typeof MarketTypeMap]

export type TResolver<Params extends any[], Return extends any> = { [k in MarketTypeNum]?: (...args: Params) => Return }

export const marketTypeDispatcher = (marketType: MarketType) => {
  return <TParams extends any[], TReturn>(resolver: TResolver<TParams, TReturn>, ...rest: TParams) => {
    switch (marketType) {
      case '11':
      case '21':
        return resolver?.['ml'](...rest)
      case '12':
      case '22':
        return resolver?.['ah'](...rest)
      case '13':
      case '23':
        return resolver?.['ou'](...rest)
      default:
        return undefined
    }
  }
}

const getMatchType = (matchStatus: MatchStatus) => {
  switch (matchStatus) {
    case 2:
      return 'inplay'
    case 1:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    default:
      return 'early'
  }
}

const getSportDetailPath = (match: IWebAnchorMatch) => {
  const { matchStatus, iid, vd, sid } = match || {}

  const sport = SidString[sid]
  const matchType = getMatchType(matchStatus)

  return `/${matchType}/${sport}/match/${iid}/${vd}`
}

export const goSportDetailHOF = (match: IWebAnchorMatch, goFunc: GoDetailCallback) => {
  const sportDetailPath = getSportDetailPath(match)
  return goFunc(sportDetailPath)
}