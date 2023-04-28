import '@testing-library/jest-dom'
import { convertTimeDiffToPast } from './index'


test('50 secs past.', () => {
  const now = Math.floor(Date.now() / 1000)
  const past = now - 50
  const time = convertTimeDiffToPast({ now, past })
  
  expect(time).toStrictEqual({ text: '50', unit: 'sec' })
})

test('30 mins past.', () => {
  const now = Math.floor(Date.now() / 1000)
  const past = now - 60 * 30
  const time = convertTimeDiffToPast({ now, past })
  
  expect(time).toStrictEqual({ text: '30', unit: 'min' })
})

test('2 hours past.', () => {
  const now = Math.floor(Date.now() / 1000)
  const past = now - 60 * 60 * 2
  const time = convertTimeDiffToPast({ now, past })
  
  expect(time).toStrictEqual({ text: '2', unit: 'hour' })
})

test('04-20 posted.', () => {
  const now = Math.floor(Date.now() / 1000)
  const past = 1681942753
  const time = convertTimeDiffToPast({ now, past })
  
  expect(time).toStrictEqual({ text: '04-20', unit: 'date' })
})
