import '@testing-library/jest-dom'
import convertSid from './index'

test('convert to ball sid', () => {
  const all = convertSid('all')
  expect(all).toBe(null)

  const soccer = convertSid('1')
  expect(soccer).toBe(1)

  const basketball = convertSid('2')
  expect(basketball).toBe(2)

  const tennis = convertSid('3')
  expect(tennis).toBe(3)

  const baseball = convertSid('4')
  expect(baseball).toBe(4)
})

test('not in sid is going to return null', () => {
  const sid = convertSid('string')

  expect(sid).toBe(null)
})
