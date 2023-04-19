export interface withData<T> {
  message: string
  code: string
  data: T
  serverTime: number
}

export interface IPager {
  pageIdx: number
  pageSize: number
  totalPage: number
  totalRow: number
}
