import '@testing-library/jest-dom'
import {
  getTime,
  convertTimeDiffToPast,
  dateTimeToTimestamp,
  timestampToFormat,
  timestampToDate
} from './index'


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

  test('abnormal timestamp', () => {
    const obj = { ts: 'aaa' } as unknown as { ts: number } // to check if api value gives abnormal value rather than ts
    const result = getTime(obj.ts)

    expect(result).toBe('')
  })
})

describe('dateTimeToTimestamp function', () => {
  test('regular dateTime', () => {
    const dateTime = '2023/05/25 10:47:00'
    const expectedTs = new Date(dateTime).getTime()
    const result = dateTimeToTimestamp(dateTime)

    expect(result).toBe(expectedTs)
  })

  test('abnormal dateTime', () => {
    const dateTime = 'aaa'
    const result = dateTimeToTimestamp(dateTime)

    expect(result).toBeUndefined()
  })
})

describe('timestampToFormat function', () => {
  test('format to YYYY-MM-DD hh:mm:ss', () => {
    const dateTime = new Date('2023/05/25 10:47').getTime()
    const expected = '2023-05-25 10:47:00'
    const result = timestampToFormat({ ts: dateTime, format: 'YYYY-MM-DD hh:mm:ss' })

    expect(result).toBe(expected)
  })

  test('format to YYYY-MM-DD', () => {
    const dateTime = new Date('2023/05/25 10:47').getTime()
    const expected = '2023-05-25'
    const result = timestampToFormat({ ts: dateTime, format: 'YYYY-MM-DD' })

    expect(result).toBe(expected)
  })

  test('format to hh:mm:ss', () => {
    const dateTime = new Date('2023/05/25 10:47').getTime()
    const expected = '10:47:00'
    const result = timestampToFormat({ ts: dateTime, format: 'hh:mm:ss' })

    expect(result).toBe(expected)
  })

  test('format to MM/DD hh:mm', () => {
    const dateTime = new Date('2023/05/25 10:47').getTime()
    const expected = '05/25 10:47'
    const result = timestampToFormat({ ts: dateTime, format: 'MM/DD hh:mm' })

    expect(result).toBe(expected)
  })

  test('abnormal format params', () => {
    const dateTime = new Date('2023/05/25 10:47').getTime()
    const format = 'abc'
    const result = timestampToFormat({ ts: dateTime, format })
    expect(result).toBe(format)
  })
})

describe('timestampToDate', () => {
  test('normal timestamp', () => {
    const timestamp = new Date('2023/05/25 10:47').getTime()
    const expected = '2023-05-25'
    const result = timestampToDate(timestamp)
    expect(result).toBe(expected)
  })
})