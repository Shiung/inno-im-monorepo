import '@testing-library/jest-dom'
import convertSid from './index'

test('testttt', () => {
  const t = convertSid('1')

  expect(t).toBe(1)
})
