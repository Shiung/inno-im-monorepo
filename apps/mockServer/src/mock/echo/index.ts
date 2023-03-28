import { mock, Random } from 'mockjs'
import type { IMockData } from '../../types'

export default [
  {
    url: '/users',
    timeout: 2000,
    response: () => mock({
      'user|10-30': ([
        {
          name: '@name',
          number: () => Random.natural(1, 10000),
          email: '@email'
        }
      ])
    })
  }
] as IMockData[]
