import { RefreshAccessTokenPayload } from 'typings'
import apiClient from 'utils/apiClient'

const refreshAccessToken = async (payload: RefreshAccessTokenPayload) => {
  const response = await apiClient.post(
    'https://oauth2.googleapis.com/token',
    payload,
  )
  return response
}

const authService = {
  refreshAccessToken,
}

export default authService
