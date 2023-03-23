import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/svelte'
import { createButton } from './index'
import ButtonTest from './button.test.svelte'

const Button = createButton({
  primary: {
    className: 'primary'
  },
  test: {
    className: 'px-[20px]'
  }
})

test('className has been merged.', async () => {
  render(Button, { variant: 'test' })
  const button = screen.getByRole('button')  
  expect(button.className).toMatch('px-[20px]')
})

test('variant default is primary.', () => {
  render(Button)
  const button = screen.getByRole('button')  
  expect(button.className).toMatch('primary')
})

test('slot work fine.', async () => {
  render(ButtonTest, {text: 'this is slot.'})
  const button = screen.getByRole('button')  

  expect(button.innerHTML).toMatch('this is slot.')
})

test('loading has hidden slot content.', () => {
  render(ButtonTest, { loading: true, text: 'slot' })
  const content = screen.getByText('slot')  

  expect(content).toHaveClass('invisible')

})

test('loading has loading circular', () => {
  render(ButtonTest, { loading: true })
  const circular = screen.getByTestId('loading')

  expect(circular).toBeInTheDocument()

})
