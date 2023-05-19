import type { MarketTypeMap, MarketType } from 'api/im/types/common'


export const marketTypeDispatcher = (marketType: MarketType, ...rest: any[]) => {
  return (resolver: { [k in typeof MarketTypeMap[keyof typeof MarketTypeMap]]?: (...args) => any}) => {
    switch (marketType) {
      case '11':
      case '21':
        return resolver?.['ml']?.(...rest)
      case '12':
      case '22':
        return resolver?.['ah']?.(...rest)
      case '13':
      case '23':
        return resolver?.['ou']?.(...rest)
      default:
        return undefined
    }
  }
}