import { Random } from 'mockjs'
import { getRandomItemFromArray } from 'utils'

import type { IMarket } from 'api/im/types'

export const withData = <T extends { res: { data: any } }>(data: T['res']['data']) => ({
  code: 0,
  message: "",
  serverTime: Math.round(Date.now() / 1000),
  data
})

export const randomPostTime = () => {
  const timestamp = Math.round(Date.now() / 1000)
  return timestamp - Random.integer(1, 60 * 60 * 24 * 14)
} 

export const genPager = (query: { pageIdx?: number, pageSize?: number }) => ({
  pageIdx: query.pageIdx || 1,
  pageSize: query.pageSize || 20,
  totalPage: 100,
  totalRow: 20
})

const marketTypes = {
  '11': ['h', 'a', 'd'],
  '12': ['h', 'a'],
  '13': ['ov', 'ud'],
  '21': ['h', 'a', 'd'],
  '22': ['h', 'a'],
  '23': ['ov', 'ud'],
}

export const genMarket = (): IMarket => {
  const status = getRandomItemFromArray(Object.keys(marketTypes)) as IMarket['status']
  const item = marketTypes[status] || []
  const type = getRandomItemFromArray(item) as IMarket['type']
  return {
    status,
    type,
    odds: String(Random.float(0.01, 50, 0, 2)),
    k: ''
  }
}
  

export const genHouseId = () => String(Random.natural(0, 99999))
