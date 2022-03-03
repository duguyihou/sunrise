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

export const useUpdateTaskMutation = (selfLink: string, task: Task) => {
  const queryClient = useQueryClient()
  const mutation = useMutation(() => tasksService.updateById(selfLink, task), {
    onSuccess: () => {
      queryClient.invalidateQueries(QueryKey.Tasks)
    },
  })
  return mutation
}

export const useFetchTaskDetailQuery = (selfLink: string) => {
  const { isLoading, error, data } = useQuery<TaskPayload, Error>(
    QueryKey.TaskDetail,
    async () => tasksService.findById(selfLink),
    { enabled: !!selfLink },
  )
  return { isLoading, error, data }
}

export const useDeleteTaskMutation = (selfLink: string) => {
  const queryClient = useQueryClient()
  const mutation = useMutation(() => tasksService.deleteById(selfLink), {
    onSuccess: () => {
      queryClient.invalidateQueries(QueryKey.Tasks)
    },
  })
  return mutation
}
