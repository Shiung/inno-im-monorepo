import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/svelte'

import Demo from './demo.svelte'

test('shows proper heading when rendered', () => {
  render(Demo, {name: 'World'})

  const heading = screen.getByText('Hello World!')
  expect(heading).toBeInTheDocument()
})
