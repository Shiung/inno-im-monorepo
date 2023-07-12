import '@testing-library/jest-dom'
import BigNumber from 'bignumber.js'
import {
  amountThousandthTransformer,
  amountSymbolTransformer
} from './index'

test('format', () => {
  const input1 = amountSymbolTransformer('0.91', { decimalPoint: 1 })
  expect(input1) .toBe('0.9')

  const input2 = amountSymbolTransformer('-0.95', { decimalPoint: 1 })
  expect(input2) .toBe('-1.0')

  const input3 = amountSymbolTransformer('-0.85', { decimalPoint: 1 })
  expect(input3) .toBe('-0.9')
})

test('thousand format', () => {
  const input1 = amountSymbolTransformer('223300.93322', { decimalPoint: 1 })
  expect(input1) .toBe('223.3K')

  const input2 = amountSymbolTransformer('220000.93322', { decimalPoint: 1 })
  expect(input2) .toBe('220K')

  const input3 = amountSymbolTransformer('-2250', { decimalPoint: 1, roundingMode: BigNumber.ROUND_HALF_UP })
  expect(input3) .toBe('-2.3K')
})

test('million format', () => {
  const input1 = amountSymbolTransformer('2233000.9', { decimalPoint: 1 })
  expect(input1) .toBe('2.2M')

  const input2 = amountSymbolTransformer('223380000', { decimalPoint: 2 })
  expect(input2) .toBe('223.38M')

  const input3 = amountSymbolTransformer('-22358400', { decimalPoint: 1, roundingMode: BigNumber.ROUND_HALF_UP })
  expect(input3) .toBe('-22.4M')
})

test('正負數四捨五入', () => {
  const input1 = amountSymbolTransformer('111.14', { decimalPoint: 1, roundingMode: BigNumber.ROUND_HALF_UP })
  expect(input1) .toBe('111.1')

  const input2 = amountSymbolTransformer('111.15', { decimalPoint: 1, roundingMode: BigNumber.ROUND_HALF_UP })
  expect(input2) .toBe('111.2')

  const input3 = amountSymbolTransformer('-111.14', { decimalPoint: 1, roundingMode: BigNumber.ROUND_HALF_UP })
  expect(input3) .toBe('-111.1')

  const input4 = amountSymbolTransformer('-111.15', { decimalPoint: 1, roundingMode: BigNumber.ROUND_HALF_UP })
  expect(input4) .toBe('-111.2')
})

test('刪除小數點後多餘的0', () => {
  const input1 = amountThousandthTransformer('6000.10445', { decimal: 7, trimZero: true })
  expect(input1) .toBe('6,000.10445')
 
  const input2 = amountThousandthTransformer('6000.0123', { decimal: 2, trimZero: true })
  expect(input2) .toBe('6,000.01')

  const input3 = amountThousandthTransformer('6000.00001', { decimal: 2, trimZero: true })
  expect(input3) .toBe('6,000')
})
