import { RawTask, TaskPayload } from 'typings/task'
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

const updateBy = async (selfLink: string, task: RawTask) => {
  const response = await apiClient.put(selfLink, { ...task })
  return response.data
}

const findBy = async (selfLink: string) => {
  const response = await apiClient.get(selfLink)
  return response.data
}

const deleteBy = async (selfLink: string) => {
  const response = await apiClient.delete(selfLink)
  return response.data
}

const tasksService = {
  findAll,
  findBy,
  create,
  updateBy,
  deleteBy,
}

export default tasksService
