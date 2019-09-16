import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { axiosRpcRequest } from './rpc'
import styles from './Network.module.scss'

Network.propTypes = {
  network: PropTypes.shape({
    name: PropTypes.string.isRequired,
    networkId: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    explorer: PropTypes.string.isRequired
  })
}

export default function Network({ network }) {
  const [status, setStatus] = useState('')
  const [block, setBlock] = useState('')
  const [latency, setLatency] = useState('')
  const [clientVersion, setClientVersion] = useState('')

  useEffect(() => {
    async function getStatusAndBlock() {
      const response = await axiosRpcRequest(network.url, 'eth_blockNumber')

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
      const response = await axiosRpcRequest(network.url, 'web3_clientVersion')
      response && response.data && setClientVersion(response.data.result)
    }

    getStatusAndBlock()
    getClientVersion()

    const timer = setInterval(() => {
      getStatusAndBlock()
      getClientVersion()
    }, 5000) // run every 5 sec.
    return () => {
      clearInterval(timer)
    }
  }, [network.url])

  const isOnline = status === 'Online'

  return (
    <div className={styles.network}>
      <h2 className={styles.title}>
        {network.name}
        <code>{network.networkId}</code>
        <span>{network.type}</span>
      </h2>
      <p>
        <code>{network.url}</code>
      </p>
      <p className={styles.status}>
        <span className={isOnline ? styles.success : styles.error}>
          {status}
        </span>
        {latency && (
          <span className={styles.latency} title="Latency">
            {latency} ms
          </span>
        )}
      </p>
      {block && (
        <p className={styles.block} title="Current block number">
          At block #<a href={`${network.explorer}/blocks/${block}`}>{block}</a>
        </p>
      )}
      {clientVersion && <p className={styles.clientVersion}>{clientVersion}</p>}
    </div>
  )
}
