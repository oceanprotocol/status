import React from 'react'
import { render, wait } from '@testing-library/react'
import mockAxios from 'axios'
import Network from './Network'

const mockResponse = {
  status: 200,
  duration: 1000,
  data: { result: '0x345' }
}

afterEach(() => {
  mockAxios.reset()
  jest.clearAllTimers()
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
    mockAxios.post.mockResolvedValue(mockResponse)
    const { container } = render(<Network network={network} />)
    expect(container.firstChild).toBeInTheDocument()
    await wait()
    expect(mockAxios.post).toHaveBeenCalledTimes(2)
  })

  it('renders without response', async () => {
    mockAxios.post.mockResolvedValue(undefined)
    const { container } = render(<Network network={network} />)
    await wait()
    expect(container.firstChild).toBeInTheDocument()
  })

  it('re-fetches after 5 sec.', async () => {
    jest.useFakeTimers()
    mockAxios.post.mockResolvedValue(mockResponse)
    render(<Network network={network} />)
    jest.advanceTimersByTime(6000)
    await wait()
    expect(setInterval).toHaveBeenCalledTimes(1)
  })
})
