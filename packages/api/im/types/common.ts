export interface withData<T> {
  message: string
  code: string
  data: T
  serverTime: number
}

export type ApiType<TRes> = {
  query: {[key: string]: string | number},
  body: {[key: string]: string | number}
  res: TRes
}

export interface IPager {
  pageIdx: number
  pageSize: number
  totalPage: number
  totalRow: number
}

export type sidType = 0 | 1 | 2 | 3 | 4 // 0 or 不帶: all 1: 足球 2: 籃球 3: 網球 4: 棒球
