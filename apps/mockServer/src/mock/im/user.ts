import { mock, Random } from 'mockjs'
import { prefix, withData, randomPostTime, genMultiply } from './utils'

import type * as Types from 'api/im/types'
import type { IMockData } from '../../types'

const user: IMockData[] = [
  {
    url: `${prefix}/v1/user/vip-level`,
    response: () => mock(withData<Types.IUserVipList>(
      Array.from({ length: 10 }, (_, index) => {
        const level = index + 1
        const multiplyByLevel = genMultiply(level)
        return ({
          level,
          levelUpgradeGift: multiplyByLevel(10),
          monthlyGift: multiplyByLevel(20),
          birthdayGift: multiplyByLevel(30),
          luxuryGiftType: Random.natural(0, 2) as Types.IVipList['luxuryGiftType'],
          currency: 'CNY',
          luxuryMoney: multiplyByLevel(40),
          expertKey: multiplyByLevel(2),
          amountLimit: multiplyByLevel(50),
          effectiveBetAmountLimit: multiplyByLevel(100),
          retainEffectiveBetAmountLimit: multiplyByLevel(1000)
        })
      }),
    ))
  },
  {
    url: `${prefix}/v1/user/key`,
    response: () => mock(withData<Types.IUserKeyInfo>({
      remainCount: Random.natural(3, 10),
      totalCount: Random.natural(10, 20),
      keyCdList: Array.from({ length: Random.natural(0, 5) }, () => randomPostTime())
    }))
  },
]

export default user