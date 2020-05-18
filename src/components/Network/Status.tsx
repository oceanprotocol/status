import React, { useState, useEffect } from 'react'
import { fetchRpc } from '../../rpc'
import Spinner from '../Spinner'
import { NetworkProps } from '.'
import styles from './Status.module.css'
import Info from './Info'
import { getClientVersion, getGasPrize, getPeers } from './utils'

export default function Status({ network }: { network: NetworkProps }) {
  const { rpcUrl, explorerUrl } = network
  const [status, setStatus] = useState('')
  const [block, setBlock] = useState<number | null>(0)
  const [latency, setLatency] = useState<number | null>(0)
  const [gasLimit, setGasLimit] = useState<number | null>(0)
  const [clientVersion, setClientVersion] = useState('')
  const [gasPrice, setGasPrice] = useState<number | null>(0)
  const [peers, setPeers] = useState<number | null>(0)

  async function getStatusAndBlock() {
    if (!rpcUrl) return

    const response = await fetchRpc(rpcUrl, 'eth_getBlockByNumber', [
      'latest',
      true
    ])

    const responseParity = await fetchRpc(rpcUrl, 'parity_mode')

    if (
      !response ||
      !response.data ||
      response.status !== 200 ||
      responseParity.data.result !== 'active'
    ) {
      setStatus('Offline')
      return
    }

    setStatus('Online')
    response.duration && setLatency(response.duration)

    const { number, gasLimit } = response.data.result
    setBlock(parseInt(number, 16))
    setGasLimit(parseInt(gasLimit, 16))
  }

  async function getData() {
    getStatusAndBlock()

    if (!rpcUrl) return

    setClientVersion(await getClientVersion(rpcUrl))
    setGasPrice(await getGasPrize(rpcUrl))
    setPeers(await getPeers(rpcUrl))
  }

  useEffect(() => {
    getData()

    const timer = setInterval(() => {
      getData()
    }, 5000) // run every 5 sec.
    return () => {
      clearInterval(timer)
    }
  }, [network])

  const isOnline = status === 'Online'

  return (
    <div className={styles.networkData}>
      {block && block > 0 ? (
        <>
          <h2 className={styles.status}>
            <span className={isOnline ? styles.success : styles.error}>
              {status}
            </span>
            {latency && (
              <span className={styles.latency} title="Latency">
                {latency} ms
              </span>
            )}
          </h2>
          {block && (
            <p className={styles.block} title="Current block number">
              At block #<a href={`${explorerUrl}/blocks/${block}`}>{block}</a>
            </p>
          )}

          <Info
            gasPrice={gasPrice}
            gasLimit={gasLimit}
            clientVersion={clientVersion}
            peers={peers}
          />
        </>
      ) : (
        <Spinner />
      )}
    </div>
  )
}
