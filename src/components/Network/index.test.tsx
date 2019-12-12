import React from 'react'
import { render, waitForElement } from '@testing-library/react'
import Network from '.'

const network = {
  name: 'Pacific',
  project: 'Ocean Protocol',
  type: 'mainnet',
  networkId: '0xCEA11',
  rpcUrl: 'https://pacific.oceanprotocol.com',
  explorerUrl: 'https://submarine.oceanprotocol.com'
}

const networkNoRpc = {
  name: 'Pacific',
  project: 'Ocean Protocol',
  type: 'mainnet',
  networkId: '0xCEA11',
  explorerUrl: 'https://submarine.oceanprotocol.com'
}

describe('Network', () => {
  it('renders without crashing', async () => {
    const { container, rerender, getByText } = render(
      <Network network={network} />
    )
    expect(container.firstChild).toBeInTheDocument()
    await waitForElement(() => getByText('Online' || 'Offline'))

    rerender(<Network network={networkNoRpc} />)
    await waitForElement(() => getByText('Online' || 'Offline'))
  })
})
