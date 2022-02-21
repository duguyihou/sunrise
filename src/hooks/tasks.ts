import tasksService from 'api/tasks'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { QueryKey } from 'shared'
import { TaskQuery, Task, TaskPayload } from 'typings/task'

export const useFetchTasksQuery = (tasklistId: string) => {
  const { isLoading, error, data } = useQuery<TaskQuery, Error>(
    QueryKey.Tasks,
    async () => tasksService.findAll(tasklistId),
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

export const useUpdateTaskStatusMutation = (
  tasklistId: string,
  taskId: string,
  task: Task,
) => {
  const queryClient = useQueryClient()

  const mutation = useMutation(
    () => tasksService.updateStatusById(tasklistId, taskId, task),
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
    QueryKey.TaskDetail,
    async () => tasksService.findById(tasklistId, taskId),
  )
  return { isLoading, error, data }
}
