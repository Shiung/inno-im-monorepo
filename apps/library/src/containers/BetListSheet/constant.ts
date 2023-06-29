import type { ICurrencyMap } from './types'

export const CurrencyMap: ICurrencyMap = {
  CNY: {
    displayName: 'CNY',
    minBet: 100
  },
  // 後端IDR->前台kIDR
  IDR: {
    displayName: 'IDR(K)',
    minBet: 200
  },
  // 後端nIDR->前台IDR
  nIDR: {
    displayName: 'IDR',
    minBet: 200000
  },
  // 後端VND->前台kVND
  VND: {
    displayName: 'VND(K)',
    minBet: 350
  },
  // 後端nVND->前台VND
  nVND: {
    displayName: 'VND',
    minBet: 350000
  },
  MYR: {
    displayName: 'MYR',
    minBet: 60
  },
  USD: {
    displayName: 'USD',
    minBet: 10
  },
  HKD: {
    displayName: 'HKD',
    minBet: 100
  },
  INR: {
    displayName: 'INR',
    minBet: 1000
  },
  THB: {
    displayName: 'THB',
    minBet: 500
  },
  KRW: {
    displayName: 'KRW',
    minBet: 10000
  },
  JPY: {
    displayName: 'JPY',
    minBet: 1000
  },
  BTC: {
    displayName: 'BTC',
    minBet: 0.0001
  },
  ETH: {
    displayName: 'ETH',
    minBet: 0.01
  },
  LTC: {
    displayName: 'LTC',
    minBet: 0.1
  },
  USDT_ERC20: {
    displayName: 'USDT-ERC20',
    minBet: 10
  },
  USDT_TRC20: {
    displayName: 'USDT-TRC20',
    minBet: 10
  },
  USDT_OMNI: {
    displayName: 'USDT-OMNI',
    minBet: 10
  },
  DASH: {
    displayName: 'DASH',
    minBet: 0.1
  },
  BCH: {
    displayName: 'BCH',
    minBet: 0.01
  },
  ETC: {
    displayName: 'ETC',
    minBet: 1
  },
  DOGE: {
    displayName: 'DOGE',
    minBet: 100
  },
  USDC_ERC20: {
    displayName: 'USDC-ERC20',
    minBet: 10
  },
  DAI_ERC20: {
    displayName: 'DAI',
    minBet: 10
  },
  UNI_ERC20: {
    displayName: 'UNI',
    minBet: 0.1
  },
  WBTC_ERC20: {
    displayName: 'WBTC',
    minBet: 0.0001
  },
  AAVE_ERC20: {
    displayName: 'AAVE',
    minBet: 0.01
  },
  TRX: {
    displayName: 'TRX',
    minBet: 1000
  }
}
