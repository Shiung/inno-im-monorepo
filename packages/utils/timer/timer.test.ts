import Timer from './index'
import { vi, describe, expect, test, beforeEach, afterEach } from 'vitest'

beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
})

describe('timer init', () => {
  test('no params', () => {
    const timer = new Timer({})

    expect(timer.startTime).toEqual(Date.now())
    expect(timer.endTime).toEqual(Date.now())

    expect(timer.currentTime).toEqual({
      second: 0,
      minute: 0,
      hour: 0,
      day: 0,
      month: 0,
      year: 0
    })
  })

  test('startTime/endTime params', () => {
    const timer1 = new Timer({ end: Date.now() + 5 * 1000 })

    expect(timer1.startTime).toEqual(Date.now())
    expect(timer1.endTime).toEqual(Date.now() + 5 * 1000)
    expect(timer1.currentTime).toEqual({
      second: 5,
      minute: 0,
      hour: 0,
      day: 0,
      month: 0,
      year: 0
    })

    const timer2 = new Timer({ start: '2022-12-31 00:00:00', end: '2022-12-31 11:59:47' })

    expect(timer2.startTime).toEqual(new Date('2022-12-31 00:00:00').getTime())
    expect(timer2.endTime).toEqual(new Date('2022-12-31 11:59:47').getTime())
    expect(timer2.currentTime).toEqual({
      second: 47,
      minute: 59,
      hour: 11,
      day: 0,
      month: 0,
      year: 0
    })

    const timer3 = new Timer({ end: 'abc' })

    expect(timer3.startTime).toEqual(Date.now())
    expect(timer3.endTime).toEqual(Date.now())
    expect(timer3.currentTime).toEqual({
      second: 0,
      minute: 0,
      hour: 0,
      day: 0,
      month: 0,
      year: 0
    })
  })

  test('countDown type', () => {
    const timer = new Timer({ type: 'countDown', start: Date.now(), end: Date.now() + 3 * 1000 })
    expect(timer.currentTime).toEqual({
      second: 3,
      minute: 0,
      hour: 0,
      day: 0,
      month: 0,
      year: 0
    })
    timer.start()
    vi.runOnlyPendingTimers()
    expect(timer.currentTime).toEqual({
      second: 2,
      minute: 0,
      hour: 0,
      day: 0,
      month: 0,
      year: 0
    })
  })

  test('countUp type', () => {
    const timer = new Timer({ type: 'countUp', start: Date.now() })
    expect(timer.currentTime).toEqual({
      second: 0,
      minute: 0,
      hour: 0,
      day: 0,
      month: 0,
      year: 0
    })
    timer.start()
    vi.runOnlyPendingTimers()
    expect(timer.currentTime).toEqual({
      second: 1,
      minute: 0,
      hour: 0,
      day: 0,
      month: 0,
      year: 0
    })
  })
})

describe('timer callback', () => {
  test('tickCallback', () => {
    const mockCallback = vi.fn(() => {})

    const timer = new Timer({ tickCallback: mockCallback, type: 'countUp' })
    timer.start()
    expect(mockCallback).toHaveBeenCalledTimes(0)
    vi.runOnlyPendingTimers()
    expect(mockCallback).toHaveBeenCalledTimes(1)
    vi.advanceTimersByTime(2000)
    expect(mockCallback).toHaveBeenCalledTimes(3)
  })

  test('stopCallback', () => {
    const mockCallback = vi.fn(() => {})

    const timer = new Timer({ stopCallback: mockCallback, end: Date.now() + 1 * 1000 })
    timer.start()
    expect(mockCallback).toHaveBeenCalledTimes(0)
    vi.runOnlyPendingTimers()
    expect(mockCallback).toHaveBeenCalledTimes(1)
  })
})