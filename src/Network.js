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
  const [status, setStatus] = useState('...')
  const [block, setBlock] = useState('...')
  const [latency, setLatency] = useState('...')
  const [clientVersion, setClientVersion] = useState('...')

  useEffect(() => {
    getStatusAndBlock(network, setStatus, setBlock, setLatency)
    getClientVersion(network, setClientVersion)

    const timer = setInterval(() => {
      getStatusAndBlock(network, setStatus, setBlock, setLatency)
      getClientVersion(network, setClientVersion)
    }, 5000) // run every 5 sec.
    return () => clearInterval(timer)
  }, [network])

  async function getStatusAndBlock(network, setStatus, setBlock, setLatency) {
    const response = await axiosRpcRequest(network.url, 'eth_blockNumber')

    if (response.status !== 200) {
      setStatus('Offline')
      return
    }

    setStatus('Online')
    setLatency(response.duration)

    const blockNumber = parseInt(response.data.result, 16)

    setBlock(blockNumber)
  }

  async function getClientVersion(network, setClientVersion) {
    const response = await axiosRpcRequest(network.url, 'web3_clientVersion')
    setClientVersion(response.data.result)
  }

  const isOnline = status === 'Online'

  return (
    <div className={styles.network}>
      <h2 className={styles.title}>
        {network.name}
        <span>{network.type}</span>
        <code>{network.networkId}</code>
      </h2>
      <p>
        <code>{network.url}</code>
      </p>
      <p className={styles.status}>
        <span className={isOnline ? styles.success : styles.error}>
          {status}
        </span>
        <span className={styles.latency} title="Latency">
          {latency} ms
        </span>
      </p>
      <p className={styles.block}>
        At block #<a href={`${network.explorer}/blocks/${block}`}>{block}</a>
      </p>
      <p className={styles.clientVersion}>{clientVersion}</p>
    </div>
  )
}
