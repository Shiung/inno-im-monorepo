export type IballType = 'football' | 'basketball' | 'tennis' | 'baseball'

export interface Info {
  sid: number
  betOn: string
  k: string
  market: string
  homeName: string
  awayName: string
  outright: boolean
}

export interface IBetOn {
  key: string
  display: string
}

export interface IballPlayType {
  id: string
  sid: number
  name: string
  labels: string[]
  priority: number
  layout: number
  layoutPC: number
  withCondition: boolean
  withPrincipal: boolean
  expanded: boolean
  cashoutSetting: boolean
  betScoreType: string
  mkPeriod: string
  mkScoreType: string
  betOn: IBetOn[]
}

export type ISportMarketSummary = {
  [key in IballType]: {
    [key: string]: IballPlayType
  }
}

export interface IParseMarketName {
  info: Info
  sportMarketSummary: ISportMarketSummary
}

export interface IFormat {
  title: string
  k: string
  homeName: string
  awayName: string
  withCondition: boolean
}

export interface ITransBetOn {
  info: Info
  _betOn: IBetOn[]
  betOn: string
  withCondition: boolean
}
