import { saveToken } from 'common/app/authSlice'
import { store } from 'common/app/store'
import axios from 'axios'
import Config from 'react-native-config'

const apiClient = axios.create({
  baseURL: Config.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

const refreshAccessToken = async (refresh_token: string) => {
  const payload = {
    client_id: Config.CLIENT_ID,
    client_secret: Config.CLIENT_SECRET,
    grant_type: 'refresh_token',
    refresh_token,
  }
  const response = await apiClient.post(
    'https://oauth2.googleapis.com/token',
    payload,
  )
  return response.data
}

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
      const { access_token } = await refreshAccessToken(refresh_token)
      store.dispatch(saveToken(access_token))
      return apiClient(originalRequest)
    }
    return Promise.reject(error)
  },
)

export default apiClient
