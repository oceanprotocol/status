import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

// Measure response time and deliver as `response.duration`
axios.interceptors.request.use(
  config => {
    config.metadata = { startTime: new Date() }
    return config
  },
  error => Promise.reject(error)
)

axios.interceptors.response.use(
  response => {
    response.config.metadata.endTime = new Date()
    response.duration =
      response.config.metadata.endTime - response.config.metadata.startTime
    return response
  },
  error => {
    error.config.metadata.endTime = new Date()
    error.duration =
      error.config.metadata.endTime - error.config.metadata.startTime
    return Promise.reject(error)
  }
)

async function getStatusAndBlock(network, setStatus, setBlock, setLatency) {
  try {
    const response = await axios.post(network.url, {
      method: 'eth_blockNumber',
      params: [],
      id: 1,
      jsonrpc: '2.0'
    })

    if (response.status !== 200) {
      setStatus('Offline')
      return
    }

    setStatus('Online')
    setLatency(response.duration)

    const blockNumber = parseInt(response.data.result, 16)

    setBlock(blockNumber)
  } catch (error) {
    console.error(error.message)
  }
}

async function getClientVersion(network, setClientVersion) {
  try {
    const response = await axios.post(network.url, {
      method: 'web3_clientVersion',
      params: [],
      id: 1,
      jsonrpc: '2.0'
    })

    setClientVersion(response.data.result)
  } catch (error) {
    console.error(error.message)
  }
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

  const isOnline = status === 'Online'

  return (
    <div className="network">
      <h2>
        {network.name} <span>{network.type}</span>
      </h2>
      <p>
        <code>{network.url}</code>
      </p>
      <p className="status">
        <span className={isOnline ? 'success' : 'error'}>{status}</span>
        <span className="latency">{latency} ms</span>
      </p>
      <p className="block">
        At block #<a href={`${network.explorer}/blocks/${block}`}>{block}</a>
      </p>
      <p className="clientVersion">{clientVersion}</p>
    </div>
  )
}

Network.propTypes = {
  network: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    explorer: PropTypes.string.isRequired
  })
}
