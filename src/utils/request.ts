import { store } from 'app/store'
import axios, { AxiosResponse, AxiosError } from 'axios'
import Config from 'react-native-config'

const client = axios.create({
  baseURL: Config.BASE_URL,
})

const request = ({ ...options }) => {
  const { accessToken } = store.getState().auth
  client.defaults.headers.common.Authorization = `Bearer ${accessToken}`
  const onSuccess = (response: AxiosResponse) => response
  const onError = (error: AxiosError) => error
  return client(options).then(onSuccess).catch(onError)
}
export default request
