import type { MarketTypeMap, MarketType } from 'api/im/types/common'

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