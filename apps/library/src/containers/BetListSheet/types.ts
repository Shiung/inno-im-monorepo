const tabs = ['chat.betList', 'chat.otherBetList'] as const

export type IKeysOfTab = (typeof tabs)[number]

export type ITabs = {
  [key in IKeysOfTab]: () => Promise<any>
}

const currency = [
  'CNY',
  'IDR',
  'nIDR',
  'VND',
  'nVND',
  'MYR',
  'USD',
  'HKD',
  'INR',
  'THB',
  'KRW',
  'JPY',
  'BTC',
  'ETH',
  'LTC',
  'USDT_ERC20',
  'USDT_TRC20',
  'USDT_OMNI',
  'DASH',
  'BCH',
  'ETC',
  'DOGE',
  'USDC_ERC20',
  'DAI_ERC20',
  'UNI_ERC20',
  'WBTC_ERC20',
  'AAVE_ERC20',
  'TRX'
] as const

type IKeysOfCurrency = (typeof currency)[number]

interface ICurrencyValue {
  displayName: string
  minBet: number
}

export type ICurrencyMap = {
  [key in IKeysOfCurrency]: ICurrencyValue
}
