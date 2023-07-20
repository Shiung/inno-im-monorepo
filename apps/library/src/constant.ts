export const SIDi18nKey = {
  1: 'common.football',
  2: 'common.basketball',
  3: 'common.tennis',
  4: 'common.baseball'
}

export const sportSID = {
  football: 1,
  basketball: 2,
  tennis: 3,
  baseball: 4,
} as const

const anchorSID = {
  deposit: 100
} as const

export const SID = {
  ...sportSID,
  ...anchorSID
}

export enum Currency {
  CNY = 'CNY',
  IDR = 'IDR',
  nIDR = 'nIDR',
  VND = 'VND',
  nVND = 'nVND',
  MYR = 'MYR',
  USD = 'USD',
  HKD = 'HKD',
  INR = 'INR',
  THB = 'THB',
  KRW = 'KRW',
  JPY = 'JPY',
  BTC = 'BTC',
  ETH = 'ETH',
  LTC = 'LTC',
  USDT_ERC20 = 'USDT_ERC20',
  USDT_TRC20 = 'USDT_TRC20',
  USDT_OMNI = 'USDT_OMNI',
  DASH = 'DASH',
  BCH = 'BCH',
  ETC = 'ETC',
  DOGE = 'DOGE',
  USDC_ERC20 = 'USDC_ERC20',
  DAI_ERC20 = 'DAI_ERC20',
  UNI_ERC20 = 'UNI_ERC20',
  WBTC_ERC20 = 'WBTC_ERC20',
  AAVE_ERC20 = 'AAVE_ERC20',
  TRX = 'TRX'
}