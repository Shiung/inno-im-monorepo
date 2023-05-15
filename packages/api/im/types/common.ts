export interface withData<T> {
  message: string
  code: number
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

export interface IOdds {
  h: string
  a: string
  d: string
  k: string
  ov: string
  ud: string
}

export interface IPredictionMarket {
  // 盤口類型
  // 足球：獨贏(11)、讓球(12)、大小(13)
  // 篮球：獨贏(21)、讓球(22)、大小(23)
  marketType: '11' | '12' | '13' | '21' | '22' | '23'
  // 專家預測結果
  // 獨贏: 主隊(h)、客隊(a)
  // 讓球: 主隊(h)、客隊(a)
  // 大小: 大(ov)、小(ud)
  matchResult: 'h' | 'a' | 'ov' | 'ud'
  odds: IOdds[]
}

// export interface IMarket {
//   // 盤口類型
//   // 足球：獨贏(11)、讓球(12)、大小(13)
//   // 篮球：獨贏(21)、讓球(22)、大小(23)
//   status: '11' | '12' | '13' | '21' | '22' | '23'
//   // 投注類型
//   // 獨贏: 主隊(h)、客隊(a)、和局(d)
//   // 讓球: 主隊(h)、客隊(a)
//   // 大小: 大(ov)、小(ud)
//   type: 'h' | 'a' | 'd' | 'ov' | 'ud'
//   odds: string
//   k: string
// }
