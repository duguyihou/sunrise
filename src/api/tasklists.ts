import { TasklistQuery } from 'typings'
import apiClient from 'utils/apiClient'

const findAll = async () => {
  const response = await apiClient.get<TasklistQuery>('/v1/users/@me/lists')
  return response.data
}

const deleteById = async (tasklist: string) => {
  const response = await apiClient.delete(`v1/users/@me/lists/${tasklist}`)
  return response.data
}

const tasklistService = {
  findAll,
  deleteById,
}

export default tasklistService
