import apiClient from 'utils/apiClient'
import Config from 'react-native-config'

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

const authService = {
  refreshAccessToken,
}

export default authService
