import type { withData } from '../types'

export interface IVipList {
  level: number
  levelUpgradeGift: number
  monthlyGift: number
  birthdayGift: number
  luxuryGiftType: 0 | 1 | 2 // 0 無 1:禮品(找客服) 2:豪華禮金
  currency: string
  luxuryMoney: number
  expertKey: number
  amountLimit: number
  effectiveBetAmountLimit: number
  retainEffectiveBetAmountLimit: number
}

export interface IUserVipList {
  query: null
  body: null
  res: withData<{
    list : IVipList[]
  }>
}

export interface IKeyInfo {
  remainCount: number
  totalCount: number
  keyCdList: number[]
}

export interface IUserKeyInfo {
  query: null
  body: null
  res: withData<IKeyInfo>
}