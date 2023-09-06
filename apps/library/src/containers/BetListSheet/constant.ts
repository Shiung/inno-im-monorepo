import type { ICurrencyMap } from './types'

export const CurrencyMap: ICurrencyMap = {
  CNY: {
    displayName: 'CNY',
    minBet: 100,
    decimal: 2
  },
  // 後端IDR->前台kIDR
  IDR: {
    displayName: 'IDR(K)',
    minBet: 200,
    decimal: 2
  },
  // 後端nIDR->前台IDR
  nIDR: {
    displayName: 'IDR',
    minBet: 200000,
    decimal: 2
  },
  // 後端VND->前台kVND
  VND: {
    displayName: 'VND(K)',
    minBet: 350,
    decimal: 2
  },
  // 後端nVND->前台VND
  nVND: {
    displayName: 'VND',
    minBet: 350000,
    decimal: 2
  },
  MYR: {
    displayName: 'MYR',
    minBet: 60,
    decimal: 2
  },
  USD: {
    displayName: 'USD',
    minBet: 10,
    decimal: 2
  },
  HKD: {
    displayName: 'HKD',
    minBet: 100,
    decimal: 2
  },
  INR: {
    displayName: 'INR',
    minBet: 1000,
    decimal: 2
  },
  THB: {
    displayName: 'THB',
    minBet: 500,
    decimal: 2
  },
  KRW: {
    displayName: 'KRW',
    minBet: 10000,
    decimal: 2
  },
  JPY: {
    displayName: 'JPY',
    minBet: 1000,
    decimal: 2
  },
  BTC: {
    displayName: 'BTC',
    minBet: 0.0001,
    decimal: 8
  },
  ETH: {
    displayName: 'ETH',
    minBet: 0.01,
    decimal: 8
  },
  LTC: {
    displayName: 'LTC',
    minBet: 0.1,
    decimal: 8
  },
  USDT_ERC20: {
    displayName: 'USDT-ERC20',
    minBet: 10,
    decimal: 2
  },
  USDT_TRC20: {
    displayName: 'USDT-TRC20',
    minBet: 10,
    decimal: 2
  },
  USDT_OMNI: {
    displayName: 'USDT-OMNI',
    minBet: 10,
    decimal: 2
  },
  DASH: {
    displayName: 'DASH',
    minBet: 0.1,
    decimal: 8
  },
  BCH: {
    displayName: 'BCH',
    minBet: 0.01,
    decimal: 8
  },
  ETC: {
    displayName: 'ETC',
    minBet: 1,
    decimal: 8
  },
  DOGE: {
    displayName: 'DOGE',
    minBet: 100,
    decimal: 8
  },
  USDC_ERC20: {
    displayName: 'USDC-ERC20',
    minBet: 10,
    decimal: 2
  },
  DAI_ERC20: {
    displayName: 'DAI',
    minBet: 10,
    decimal: 8
  },
  UNI_ERC20: {
    displayName: 'UNI',
    minBet: 0.1,
    decimal: 8
  },
  WBTC_ERC20: {
    displayName: 'WBTC',
    minBet: 0.0001,
    decimal: 8
  },
  AAVE_ERC20: {
    displayName: 'AAVE',
    minBet: 0.01,
    decimal: 8
  },
  TRX: {
    displayName: 'TRX',
    minBet: 1000,
    decimal: 8
  },
  BRL: {
    displayName: 'BRL',
    minBet: 100,
    decimal: 2
  }
}
