/* eslint-disable no-underscore-dangle */
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

const refreshAccessToken = async (refreshToken: string) => {
  const payload = {
    client_id: Config.CLIENT_ID,
    client_secret: Config.CLIENT_SECRET,
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  }
  const response = await apiClient.post(
    'https://oauth2.googleapis.com/token',
    payload,
  )
  return response.data
}

apiClient.interceptors.request.use(
  config => {
    const { accessToken } = store.getState().auth
    // eslint-disable-next-line no-param-reassign
    config.headers = {
      Authorization: `Bearer ${accessToken}`,
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
      const { refreshToken } = store.getState().auth
      // eslint-disable-next-line camelcase
      const { access_token } = await refreshAccessToken(refreshToken)
      store.dispatch(saveToken(access_token))
      return apiClient(originalRequest)
    }
    return Promise.reject(error)
  },
)

export default apiClient
