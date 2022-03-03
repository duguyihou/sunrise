import { TasklistQuery } from 'typings'
import apiClient from 'utils/apiClient'

const findAll = async () => {
  const response = await apiClient.get<TasklistQuery>('/v1/users/@me/lists')
  return response.data
}

const create = async (title: string) => {
  const response = await apiClient.post('v1/users/@me/lists', { title })
  return response.data
}

const deleteBy = async (selfLink: string) => {
  const response = await apiClient.delete(selfLink)
  return response.data
}

const updateById = async (tasklistId: string, title: string) => {
  const response = await apiClient.put(`v1/users/@me/lists/${tasklistId}`, {
    title,
    id: tasklistId,
  })
  return response.data
}
const tasklistService = {
  findAll,
  create,
  deleteBy,
  updateById,
}

export default tasklistService
