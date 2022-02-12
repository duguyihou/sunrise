import apiClient from 'utils/apiClient'

const findAll = async (tasklist: string) => {
  const response = await apiClient.get(`/v1/lists/${tasklist}/tasks`)
  return response.data
}

const tasksService = {
  findAll,
}

export default tasksService
