import tasksService from 'api/tasks'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { QueryKey } from 'shared'
import { TaskQuery, Task, TaskPayload } from 'typings/task'

export const useFetchTasksQuery = (
  tasklistId: string,
  showCompleted?: boolean,
  showDeleted?: boolean,
  showHidden?: boolean,
) => {
  const { isLoading, error, data } = useQuery<TaskQuery, Error>(
    QueryKey.Tasks,
    async () =>
      tasksService.findAll(tasklistId, showCompleted, showDeleted, showHidden),
  )
  return { isLoading, error, data }
}

export const useAddTaskMutation = (
  tasklistId: string,
  taskPayload: TaskPayload,
) => {
  const queryClient = useQueryClient()

  const mutation = useMutation(
    () => tasksService.create(tasklistId, taskPayload),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QueryKey.Tasks)
      },
    },
  )
  return mutation
}

export const useUpdateTaskMutation = (
  tasklistId: string,
  taskId: string,
  task: Task,
) => {
  const queryClient = useQueryClient()

  const mutation = useMutation(
    () => tasksService.updateById(tasklistId, taskId, task),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QueryKey.Tasks, tasklistId])
      },
    },
  )
  return mutation
}

export const useFetchTaskDetailQuery = (tasklistId: string, taskId: string) => {
  const { isLoading, error, data } = useQuery<TaskPayload, Error>(
    [QueryKey.TaskDetail, tasklistId, taskId],
    async () => tasksService.findById(tasklistId, taskId),
  )
  return { isLoading, error, data }
}

export const useDeleteTaskMutation = (tasklistId: string, taskId: string) => {
  const queryClient = useQueryClient()
  const mutation = useMutation(
    () => tasksService.deleteById(tasklistId, taskId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QueryKey.Tasks, tasklistId, taskId])
      },
    },
  )
  return mutation
}
