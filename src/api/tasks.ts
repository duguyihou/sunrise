import apiClient from 'utils/apiClient'

const findAll = async (tasklist: string) => {
  const response = await apiClient.get(`/v1/lists/${tasklist}/tasks`)
  return response.data
}

const create = async (tasklist: string, title: string) => {
  const response = await apiClient.post(`/v1/lists/${tasklist}/tasks`, {
    title,
  })
  return response.data
}

const tasksService = {
  findAll,
  create,
}

export default tasksService
