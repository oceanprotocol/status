import { convert } from 'ethereumjs-units'
import { fetchRpc, AxiosResponseCustom } from '../../rpc'

export async function getGasPrize(rpcUrl: string) {
  try {
    const response: AxiosResponseCustom = await fetchRpc(rpcUrl, 'eth_gasPrice')
    return convert(parseInt(response.data.result, 16), 'wei', 'gwei')
  } catch (error) {
    console.log(error.message)
    return null
  }
}

export async function getClientVersion(rpcUrl: string) {
  try {
    const response: AxiosResponseCustom = await fetchRpc(
      rpcUrl,
      'web3_clientVersion'
    )

    return response.data.result
  } catch (error) {
    console.log(error.message)
    return null
  }
}

export async function getPeers(rpcUrl: string) {
  try {
    const response: AxiosResponseCustom = await fetchRpc(
      rpcUrl,
      'net_peerCount'
    )

    return parseInt(response.data.result, 16)
  } catch (error) {
    console.log(error.message)
    return null
  }
}
