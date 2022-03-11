import authService from 'api/auth'
import { saveToken } from 'app/authSlice'
import { store } from 'app/store'
import axios from 'axios'
import Config from 'react-native-config'

const apiClient = axios.create({
  baseURL: Config.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use(
  config => {
    const { access_token } = store.getState().auth
    config.headers = {
      Authorization: `Bearer ${access_token}`,
      'If-Match': '*',
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
      store.dispatch(saveToken(access_token))
      return apiClient(originalRequest)
    }
    return Promise.reject(error)
  },
)

export default apiClient
