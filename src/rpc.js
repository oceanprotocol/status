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

async function axiosRpcRequest(url, method) {
  try {
    const response = await axios.post(url, {
      method,
      params: [],
      id: 1,
      jsonrpc: '2.0'
    })

    return response
  } catch (error) {
    console.error(error.message)
  }
}

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

export { getStatusAndBlock, getClientVersion }
