import React from 'react'
import { render, wait, waitForElement } from '@testing-library/react'
import axios from 'axios'
import Network from '../components/Network'

import { mocked } from 'ts-jest/dist/util/testing'

jest.mock('axios')
const axiosMock: any = mocked(axios)

const mockResponse = {
  status: 200,
  duration: 1000,
  data: { result: '0x345' }
}

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

afterEach(() => {
  jest.clearAllTimers()
})

describe('Network', () => {
  it('renders without crashing', async () => {
    axiosMock.post.mockResolvedValue(mockResponse)
    const { container, rerender, getByText } = render(
      <Network network={network} />
    )
    expect(container.firstChild).toBeInTheDocument()
    await waitForElement(() => getByText('Online'))
    expect(axiosMock.post).toHaveBeenCalledTimes(2)

    rerender(<Network network={networkNoRpc} />)
    await waitForElement(() => getByText('Online'))
    expect(axiosMock.post).toHaveBeenCalledTimes(2)
  })

  it('renders without response', async () => {
    axiosMock.post.mockResolvedValue(undefined)
    const { container } = render(<Network network={network} />)
    await wait()
    expect(container.firstChild).toBeInTheDocument()
  })

  it('re-fetches after 5 sec.', async () => {
    jest.useFakeTimers()
    axiosMock.post.mockResolvedValue(mockResponse)
    const { getByText } = render(<Network network={network} />)
    jest.advanceTimersByTime(6000)
    await waitForElement(() => getByText('Online'))
    // expect(setInterval).toHaveBeenCalledTimes(1)
  })
})
