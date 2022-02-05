import { Tasklist } from 'typings'
import apiClient from 'utils/apiClient'

const findAll = async () => {
  const response = await apiClient.get<Tasklist>('/v1/users/@me/lists')
  return response.data
}

const tasklistService = {
  findAll,
}

export default tasklistService
