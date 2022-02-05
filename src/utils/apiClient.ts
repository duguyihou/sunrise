import { store } from 'app/store'
import axios from 'axios'
import Config from 'react-native-config'

const apiClient = axios.create({
  baseURL: Config.BASE_URL,
})

apiClient.interceptors.request.use(config => {
  const { accessToken } = store.getState().auth

  config.headers = {
    Authorization: `Bearer ${accessToken}`,
    'Content-type': 'application/json',
  }
  return config
})

export default apiClient
