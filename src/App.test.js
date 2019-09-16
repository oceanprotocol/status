import React from 'react'
import { render } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('should be able to run tests', () => {
    expect(1 + 2).toEqual(3)
  })

  it('renders without crashing', async () => {
    const { container } = render(<App />)
    expect(container.firstChild).toBeInTheDocument()
  })
})
