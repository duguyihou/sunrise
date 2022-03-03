import { Task } from 'typings'
import { TaskPayload } from 'typings/task'
import apiClient from 'utils/apiClient'

const findAll = async (
  tasklist: string,
  showCompleted = true,
  showDeleted = false,
  showHidden = false,
) => {
  const response = await apiClient.get(`/v1/lists/${tasklist}/tasks`, {
    params: { showCompleted, showDeleted, showHidden },
  })
  return response.data
}

const create = async (tasklist: string, taskPayload: TaskPayload) => {
  const response = await apiClient.post(`/v1/lists/${tasklist}/tasks`, {
    ...taskPayload,
  })
  return response.data
}

const updateById = async (selfLink: string, task: Task) => {
  const response = await apiClient.put(selfLink, { ...task })
  return response.data
}

const findById = async (selfLink?: string) => {
  if (!selfLink) return
  const response = await apiClient.get(selfLink)
  return response.data
}

const deleteById = async (selfLink: string) => {
  const response = await apiClient.delete(selfLink)
  return response.data
}

const tasksService = {
  findAll,
  findById,
  create,
  updateById,
  deleteById,
}

export default tasksService
