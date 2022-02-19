import { Task } from 'typings'
import { TaskPayload } from 'typings/task'
import apiClient from 'utils/apiClient'

const findAll = async (tasklist: string) => {
  const response = await apiClient.get(`/v1/lists/${tasklist}/tasks`)
  return response.data
}

const create = async (tasklist: string, taskPayload: TaskPayload) => {
  const response = await apiClient.post(`/v1/lists/${tasklist}/tasks`, {
    ...taskPayload,
  })
  return response.data
}

const updateStatusById = async (
  tasklistId: string,
  taskId: string,
  task: Task,
) => {
  const response = await apiClient.put(
    `v1/lists/${tasklistId}/tasks/${taskId}`,
    { ...task },
  )
  return response.data
}

const tasksService = {
  findAll,
  create,
  updateStatusById,
}

export default tasksService
