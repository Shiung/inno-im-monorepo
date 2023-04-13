import '@testing-library/jest-dom'
import convertSid from './index'

import { SID } from '../types'

test('convert to ball sid', () => {
  const all = convertSid('all')
  expect(all).toBe(SID.all)

  const soccer = convertSid('1')
  expect(soccer).toBe(SID.soccer)

  const basketball = convertSid('2')
  expect(basketball).toBe(SID.basketball)

  const tennis = convertSid('3')
  expect(tennis).toBe(SID.tennis)

  const baseball = convertSid('4')
  expect(baseball).toBe(SID.baseball)
})

test('Not All and Not Number is going to convert to NaN', () => {
  const sid = convertSid('string')

  expect(Number.isNaN(sid)).toBe(true)
})
