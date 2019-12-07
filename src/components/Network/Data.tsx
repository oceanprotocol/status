import React, { useState, useEffect } from 'react'
import { fetchRpc, AxiosResponseCustom } from '../../rpc'
import Spinner from '../Spinner'
import { NetworkProps } from '.'
import styles from './Data.module.css'

export default function Data({ network }: { network: NetworkProps }) {
  const { rpcUrl, explorerUrl } = network
  const [status, setStatus] = useState('')
  const [block, setBlock] = useState(0)
  const [latency, setLatency] = useState(0)
  const [clientVersion, setClientVersion] = useState('')

  async function getStatusAndBlock() {
    if (!rpcUrl) return

    const response: AxiosResponseCustom = await fetchRpc(
      rpcUrl,
      'eth_blockNumber'
    )

    if (!response || response.status !== 200) {
      setStatus('Offline')
      return
    }

    setStatus('Online')
    response.duration && setLatency(response.duration)

    const blockNumber =
      response && response.data && parseInt(response.data.result, 16)
    setBlock(blockNumber)
  }

  async function getClientVersion() {
    if (!rpcUrl) return

    const response: AxiosResponseCustom = await fetchRpc(
      rpcUrl,
      'web3_clientVersion'
    )

    response && response.data && setClientVersion(response.data.result)
  }

  useEffect(() => {
    getStatusAndBlock()
    getClientVersion()

    const timer = setInterval(() => {
      getStatusAndBlock()
      getClientVersion()
    }, 5000) // run every 5 sec.
    return () => {
      clearInterval(timer)
    }
  }, [network])

  const isOnline = status === 'Online'

  return (
    <div className={styles.networkData}>
      {block > 0 ? (
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
          {clientVersion && (
            <p className={styles.clientVersion}>{clientVersion}</p>
          )}
        </>
      ) : (
        <Spinner />
      )}
    </div>
  )
}
