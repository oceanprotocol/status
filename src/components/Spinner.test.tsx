import React from 'react'
import { render } from '@testing-library/react'
import Spinner from './Spinner'

describe('Spinner', () => {
  it('renders without crashing', () => {
    const { container } = render(<Spinner message="Hello" />)
    expect(container.firstChild).toBeInTheDocument()
  })
})
