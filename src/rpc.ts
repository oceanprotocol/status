import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'

export interface AxiosRequestConfigCustom extends AxiosRequestConfig {
  metadata?: {
    startTime: number | Date
    endTime?: number | Date
  }
}

export interface AxiosResponseCustom extends AxiosResponse {
  duration?: number
  config: AxiosRequestConfigCustom
}

async function fetchRpc(url: string, method: string, params?: any[]) {
  try {
    const response: AxiosResponseCustom = await axios.post(url, {
      method,
      params,
      id: 1,
      jsonrpc: '2.0'
    })

    return response
  } catch (error) {
    return error
  }
}

export { fetchRpc }

// Measure response time and deliver as `response.duration`
axios.interceptors.request.use(
  (config: AxiosRequestConfigCustom) => {
    config.metadata = { startTime: new Date() }
    return config
  },
  error => Promise.reject(error)
)

axios.interceptors.response.use(
  (response: any) => {
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
