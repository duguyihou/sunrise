import { store } from 'app/store'
import axios from 'axios'
import Config from 'react-native-config'

const apiClient = axios.create({
  baseURL: Config.BASE_URL,
})

apiClient.interceptors.request.use(
  config => {
    const { accessToken } = store.getState().auth

    config.headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-type': 'application/json',
    }
    return config
  },
  error => Promise.reject(error),
)

apiClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true
      // const access_token = await refreshAccessToken()
      const access_token = ''
      axios.defaults.headers.common.Authorization = `Bearer ${access_token}`
      console.log('🐵 originalRequest', originalRequest)
      return apiClient(originalRequest)
    }
    return Promise.reject(error)
  },
)

export default apiClient
