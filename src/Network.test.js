import React from 'react'
import { render, waitForElement } from '@testing-library/react'
import mockAxios from 'axios'
import Network from './Network'

const mockResponse = {
  status: 200,
  duration: 1000,
  data: { result: '0x345' }
}

afterEach(() => {
  mockAxios.reset()
})

describe('Network', () => {
  const network = {
    name: 'Pacific',
    project: 'Ocean Protocol',
    type: 'mainnet',
    networkId: '0xCEA11',
    url: 'https://pacific.oceanprotocol.com',
    explorer: 'https://submarine.oceanprotocol.com'
  }

  it('renders without crashing', async () => {
    mockAxios.post.mockResolvedValueOnce(mockResponse)

    const { container, getByTitle } = render(<Network network={network} />)
    expect(container.firstChild).toBeInTheDocument()
    await waitForElement(() => getByTitle('Current block number'))
    expect(mockAxios.post).toHaveBeenCalledTimes(2)
  })
})
