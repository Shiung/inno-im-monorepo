import {
  isValidNumber,
  isPercentageValue,
  isPixelValue,
  getBoundingRect,
  calculate,
  calDragDistance,
  isOverThreshold,
  isOutsideBoundary,
  getTouchClientX
} from '../utils'
import { vi } from 'vitest'

test('isValidNumber function', () => {
  const result1 = isValidNumber('1a2b')
  expect(result1).toBe(false)

  const result2 = isValidNumber('123')
  expect(result2).toBe(true)

  const result3 = isValidNumber('.35')
  expect(result3).toBe(true)

  const result4 = isValidNumber('-0')
  expect(result4).toBe(false)
})

test('isPercentageValue function', () => {
  const result1 = isPercentageValue('15%')
  expect(result1).toBe(true)

  const result2 = isPercentageValue('-100%')
  expect(result2).toBe(true)

  const result3 = isPercentageValue('-0%')
  expect(result3).toBe(false)

  const result4 = isPercentageValue('10px')
  expect(result4).toBe(false)

  const result5 = isPercentageValue('10')
  expect(result5).toBe(false)
})

test('isPixelValue function', () => {
  const result1 = isPixelValue('15px')
  expect(result1).toBe(true)

  const result2 = isPixelValue('300px')
  expect(result2).toBe(true)

  const result3 = isPixelValue('200p')
  expect(result3).toBe(false)

  const result4 = isPixelValue('10%')
  expect(result4).toBe(false)

  const result5 = isPixelValue('10')
  expect(result5).toBe(false)
})

test('getBoundingRect function', () => {
  let parent: { getBoundingClientRect: () => DOMRect } = {
    getBoundingClientRect: () => ({} as any)
  }
  parent.getBoundingClientRect = vi.fn(() => ({
    width: 300,
    height: 200,
    left: 20,
    right: 320
  }) as any)

  const result1 = getBoundingRect(parent as HTMLDivElement, 'width')
  expect(result1).toBe(300)
  const result2 = getBoundingRect(parent as HTMLDivElement, 'height')
  expect(result2).toBe(200)
  const result3 = getBoundingRect(parent as HTMLDivElement, 'left')
  expect(result3).toBe(20)
  const result4 = getBoundingRect(parent as HTMLDivElement, 'right')
  expect(result4).toBe(320)
})

test('calculate function', () => {
  let parent: { getBoundingClientRect: () => DOMRect } = {
    getBoundingClientRect: () => ({} as any)
  }
  parent.getBoundingClientRect = vi.fn(() => ({
    width: 300,
    height: 200
  }) as any)

  const result1 = calculate('width', 150)
  expect(result1).toBe(150)

  const result2 = calculate('height', '150')
  expect(result2).toBe(150)

  const result3 = calculate('width', '80%', parent as HTMLDivElement)
  expect(result3).toBe(240)

  const result4 = calculate('height', '80px')
  expect(result4).toBe(80)

  const result5 = calculate('height', 'abc')
  expect(result5).toBe(0)
})

test('calDragDistance function', () => {
  const index = 1, width = 300, padding = 10, containerWidth = 500

  const distance = calDragDistance(index, width, padding, containerWidth)

  expect(distance).toBe(-210)
})

test('isOverThreshold function', () => {
  const result1 = isOverThreshold(300, 500, 0.6)
  expect(result1).toBe(true)

  const result2 = isOverThreshold(200, 500, 0.6)
  expect(result2).toBe(false)
})

test('isOutsideBoundary function', () => {
  let parent: { getBoundingClientRect: () => DOMRect } = {
    getBoundingClientRect: () => ({} as any)
  }
  parent.getBoundingClientRect = vi.fn(() => ({
    width: 200,
    height: 100,
    left: 15,
    right: 215
  }) as any)

  const result1 = isOutsideBoundary(10, parent as HTMLDivElement)
  expect(result1).toBe(true)

  const result2 = isOutsideBoundary(200, parent as HTMLDivElement)
  expect(result2).toBe(false)
})

test('getTouchClientX function', () => {
  const touchEvent = {
    touches: [{ clientX: 100, clientY: 200 }],
    changedTouches: [{ clientX: 300, clientY: 200 }],
    targetTouches: [{ clientX: 200, clientY: 200 }],
  } as unknown as TouchEvent

  const result1 = getTouchClientX('touchstart', touchEvent)
  expect(result1).toBe(100)

  const result2 = getTouchClientX('touchmove', touchEvent)
  expect(result2).toBe(100)

  const result3 = getTouchClientX('touchend', touchEvent)
  expect(result3).toBe(300)
})