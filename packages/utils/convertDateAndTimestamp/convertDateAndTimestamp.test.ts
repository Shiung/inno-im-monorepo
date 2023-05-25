import '@testing-library/jest-dom'
import { getTime, convertTimeDiffToPast } from './index'


describe('convertTimeDiffToPast function', () => {
  test('50 secs past.', () => {
    const now = Date.now()
    const past = now - 50 * 1000
    const time = convertTimeDiffToPast({ now, past })
    
    expect(time).toStrictEqual({ text: '50', unit: 'sec' })
  })
  
  test('30 mins past.', () => {
    const now = Date.now()
    const past = now - 60 * 30 * 1000
    const time = convertTimeDiffToPast({ now, past })
    
    expect(time).toStrictEqual({ text: '30', unit: 'min' })
  })
  
  test('2 hours past.', () => {
    const now = Date.now()
    const past = now - 60 * 60 * 2 * 1000
    const time = convertTimeDiffToPast({ now, past })
    
    expect(time).toStrictEqual({ text: '2', unit: 'hour' })
  })
  
  test('04-20 posted.', () => {
    const now = Date.now()
    const past = 1681942753000
    const time = convertTimeDiffToPast({ now, past })
    
    expect(time).toStrictEqual({ text: '04-20', unit: 'date' })
  })
})

describe('getTime function', () => {
  test('regular timestamp', () => {
    const ts = new Date('2023/05/25 10:47:00').getTime()
    const result = getTime(ts)

    expect(result).toBe('10:47')
  })

  test('unusual timestamp', () => {
    const obj = { ts: 'aaa' } as unknown as { ts: number } // to check if api value gives unusual value rather than ts
    const result = getTime(obj.ts)

    expect(result).toBe('')
  })
})
