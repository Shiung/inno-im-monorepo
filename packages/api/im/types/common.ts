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
