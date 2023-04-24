import { Random } from 'mockjs'

export const withData = <T extends { res: { data: any } }>(data: T['res']['data']) => ({
  code: "0",
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

export const genHouseId = () => String(Random.natural(0, 99999))
