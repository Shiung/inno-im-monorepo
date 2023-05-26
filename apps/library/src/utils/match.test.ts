import '@testing-library/jest-dom'
import { marketTypeDispatcher, type TResolver } from './match'
import { vi } from 'vitest'

function createResolver(): TResolver<[], void> {
  const resolver = {
    ml() {},
    ah() {},
    ou() {},
  }

  vi.spyOn(resolver, 'ml')
  vi.spyOn(resolver, 'ah')
  vi.spyOn(resolver, 'ou')

  return resolver
}

describe('type dispatcher', () => {
  test('ml', () => {
    const resolver = createResolver()
    let dispatcher = marketTypeDispatcher('11')
    dispatcher(resolver)
  
    expect(resolver['ml']).toHaveBeenCalled()

    dispatcher = marketTypeDispatcher('21')
    dispatcher(resolver)

    expect(resolver['ml']).toHaveBeenCalled()
  })
  test('ah', () => {
    const resolver = createResolver()
    let dispatcher = marketTypeDispatcher('12')
    dispatcher(resolver)
  
    expect(resolver['ah']).toHaveBeenCalled()

    dispatcher = marketTypeDispatcher('22')
    dispatcher(resolver)

    expect(resolver['ah']).toHaveBeenCalled()
  })
  test('ou', () => {
    const resolver = createResolver()
    let dispatcher = marketTypeDispatcher('13')
    dispatcher(resolver)
  
    expect(resolver['ou']).toHaveBeenCalled()

    dispatcher = marketTypeDispatcher('23')
    dispatcher(resolver)

    expect(resolver['ou']).toHaveBeenCalled()
  })
})
