import type { Currency } from '$src/types'
const tabs = ['chat.betList', 'chat.otherBetList'] as const

export type IKeysOfTab = (typeof tabs)[number]

export type ITabs = {
  [key in IKeysOfTab]: () => Promise<any>
}

export type IKeysOfCurrency = `${Currency}`

interface ICurrencyValue {
  displayName: string
  minBet: number
}

export type ICurrencyMap = {
  [key in IKeysOfCurrency]: ICurrencyValue
}
