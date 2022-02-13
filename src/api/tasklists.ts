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

const create = async (title: string) => {
  const response = await apiClient.post('v1/users/@me/lists', { title })
  return response.data
}

const tasklistService = {
  findAll,
  deleteById,
  create,
}

export default tasklistService
