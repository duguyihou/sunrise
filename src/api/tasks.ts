import { RawTask, TaskPayload } from 'typings/task'

import apiClient from './apiClient'

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

const createSubtask = async (
  tasklist: string,
  taskId: string,
  taskPayload: TaskPayload,
) => {
  const response = await apiClient.post(
    `/v1/lists/${tasklist}/tasks`,
    {
      ...taskPayload,
    },
    { params: { parent: taskId } },
  )
  return response.data
}

const update = async (task: RawTask) => {
  const { selfLink } = task
  const response = await apiClient.put(selfLink, { ...task })
  return response.data
}

const findBy = async (tasklistId: string, taskId: string) => {
  const response = await apiClient.get(
    `/v1/lists/${tasklistId}/tasks/${taskId}`,
  )
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
  update,
  deleteBy,
  createSubtask,
}

export default tasksService
