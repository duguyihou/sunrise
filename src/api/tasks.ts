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

const update = async (task: RawTask) => {
  const { selfLink } = task
  const response = await apiClient.put(selfLink, { ...task })
  return response.data
}

const find = async (selfLink: string) => {
  const response = await apiClient.get(selfLink)
  return response.data
}

const deleteBy = async (selfLink: string) => {
  const response = await apiClient.delete(selfLink)
  return response.data
}

const tasksService = {
  findAll,
  find,
  create,
  update,
  deleteBy,
}

export default tasksService
