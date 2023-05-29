import { isValidNumber, isPercentageValue, isPixelValue, getElementSize, calculate } from '../utils'
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

test('getElementSize function', () => {
  let parent: { getBoundingClientRect: () => DOMRect } = {
    getBoundingClientRect: () => ({} as any)
  }
  parent.getBoundingClientRect = vi.fn(() => ({
    width: 300,
    height: 200
  }) as any)

  const result1 = getElementSize(parent as HTMLDivElement, 'width')
  expect(result1).toBe(300)
  const result2 = getElementSize(parent as HTMLDivElement, 'height')
  expect(result2).toBe(200)
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