import axios from 'axios'

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
    return error
  }
}

export { axiosRpcRequest }

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
