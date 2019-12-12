import axios from 'axios'
import { convert } from 'ethereumjs-units'
import { mocked } from 'ts-jest/dist/util/testing'
import { getGasPrize, getClientVersion, getPeers } from './utils'

jest.mock('axios')
const axiosMock: any = mocked(axios)

describe('Network Utils', () => {
  it('getGasPrize', async () => {
    const response = {
      status: 200,
      duration: 1000,
      data: { result: '0x345' }
    }

    axiosMock.post.mockImplementationOnce(() => Promise.resolve(response))
    await expect(getGasPrize('http://rpc.com')).resolves.toEqual(
      convert(parseInt(response.data.result, 16), 'wei', 'gwei')
    )
  })

  it('getGasPrize: Error', async () => {
    axiosMock.post.mockImplementationOnce(() => Promise.resolve(null))
    await expect(getGasPrize('http://rpc.com')).resolves.toEqual(null)
  })

  it('getClientVersion', async () => {
    const response = {
      status: 200,
      duration: 1000,
      data: { result: '0x345' }
    }

    axiosMock.post.mockImplementationOnce(() => Promise.resolve(response))
    await expect(getClientVersion('http://rpc.com')).resolves.toEqual(
      response.data.result
    )
  })

  it('getClientVersion: Error', async () => {
    axiosMock.post.mockImplementationOnce(() => Promise.resolve(null))
    await expect(getClientVersion('http://rpc.com')).resolves.toEqual(null)
  })

  it('getPeers', async () => {
    const response = {
      status: 200,
      duration: 1000,
      data: { result: '0x24' }
    }

    axiosMock.post.mockImplementationOnce(() => Promise.resolve(response))
    await expect(getPeers('http://rpc.com')).resolves.toEqual(
      parseInt(response.data.result, 16)
    )
  })

  it('getPeers: Error', async () => {
    axiosMock.post.mockImplementationOnce(() => Promise.resolve(null))
    await expect(getPeers('http://rpc.com')).resolves.toEqual(null)
  })
})
