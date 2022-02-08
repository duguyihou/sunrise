import authService from 'api/auth'
import { store } from 'app/store'
import axios from 'axios'
import Config from 'react-native-config'

const apiClient = axios.create({
  baseURL: Config.BASE_URL,
})

apiClient.interceptors.request.use(
  config => {
    const { access_token } = store.getState().auth
    config.headers = {
      Authorization: `Bearer ${access_token}`,
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
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const { refresh_token } = store.getState().auth
      const { access_token } = await authService.refreshAccessToken(
        refresh_token,
      )
      console.log('🐵 access_token', access_token)
      axios.defaults.headers.common.Authorization = `Bearer ${access_token}`
      return apiClient(originalRequest)
    }
    return Promise.reject(error)
  },
)

export default apiClient
