import React from 'react'
import { render } from '@testing-library/react'
import Home from '../pages'

describe('Home', () => {
  it('renders without crashing', () => {
    const { container } = render(<Home />)
    expect(container.firstChild).toBeInTheDocument()
  })
})
