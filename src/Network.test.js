import React from 'react'
import { render } from '@testing-library/react'
import Network from './Network'

describe('Network', () => {
  const network = {
    name: 'Pacific',
    project: 'Ocean Protocol',
    type: 'mainnet',
    networkId: '0xCEA11',
    url: 'https://pacific.oceanprotocol.com',
    explorer: 'https://submarine.oceanprotocol.com'
  }

  it('renders without crashing', () => {
    const { container } = render(<Network network={network} />)
    expect(container.firstChild).toBeInTheDocument()
  })
})
