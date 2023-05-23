import '@testing-library/jest-dom'
import { render } from '@testing-library/svelte'
import Context from './context.test.svelte'

test('use setContext to updage context', async () => {
  const result = render(Context, { a: 3, b: 4 })
   
  const valA = result.container.querySelector('#a')?.innerHTML
  const valB = result.container.querySelector('#b')?.innerHTML

  expect(Number(valA)).toBe(3)
  expect(Number(valB)).toBe(4)
})

test('testing getContext', async () => {
  const result = render(Context, { a: 1, b: 2 })

  const valA = result.container.querySelector('#innerA')?.innerHTML
  const valB = result.container.querySelector('#innerB')?.innerHTML

  expect(Number(valA)).toBe(1)
  expect(Number(valB)).toBe(2)
})
