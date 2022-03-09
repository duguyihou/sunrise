import { useNavigation } from '@react-navigation/native'
import tasksService from 'api/tasks'
import { useMemo } from 'react'
import { useMutation, useQueries, useQuery, useQueryClient } from 'react-query'
import { QueryKey, TaskStatus } from 'shared'
import { StackNavigationProps } from 'typings'
import { TaskQuery, Task, TaskPayload, Tasklist } from 'typings/task'

export const useFetchTasksQuery = (
  tasklistId: string,
  showCompleted?: boolean,
  showDeleted?: boolean,
  showHidden?: boolean,
) => {
  const queryResult = useQuery<TaskQuery, Error>(
    [QueryKey.Tasks, tasklistId],
    async () =>
      tasksService.findAll(tasklistId, showCompleted, showDeleted, showHidden),
  )
  const needsActionTasks = useMemo(
    () =>
      queryResult.data?.items.filter(
        ({ status }) => status === TaskStatus.NeedsAction,
      ),
    [queryResult.data],
  )

  const compeletedTasks = useMemo(
    () =>
      queryResult.data?.items.filter(
        ({ status }) => status === TaskStatus.Completed,
      ),
    [queryResult.data],
  )
  return {
    ...queryResult,
    data: {
      needsActionTasks,
      compeletedTasks,
    },
  }
}

export const useAddTaskMutation = (
  tasklistId: string,
  taskPayload: TaskPayload,
  goBack = true,
) => {
  const queryClient = useQueryClient()
  const navigation = useNavigation<StackNavigationProps>()

  const mutation = useMutation(
    () => tasksService.create(tasklistId, taskPayload),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QueryKey.Tasks, tasklistId])
        goBack && navigation.goBack()
      },
    },
  )
  return mutation
}

export const useUpdateTaskMutation = (selfLink: string, task: Task) => {
  const queryClient = useQueryClient()
  const mutation = useMutation(() => tasksService.updateBy(selfLink, task), {
    onSuccess: () => {
      queryClient.invalidateQueries(QueryKey.Tasks)
    },
  })
  return mutation
}

export const useFetchTaskDetailQuery = (selfLink: string) => {
  const { isLoading, error, data } = useQuery<TaskPayload, Error>(
    QueryKey.TaskDetail,
    async () => tasksService.findBy(selfLink),
  )
  return { isLoading, error, data }
}

export const useDeleteTaskMutation = (selfLink: string) => {
  const queryClient = useQueryClient()
  const navigation = useNavigation<StackNavigationProps>()
  const mutation = useMutation(() => tasksService.deleteBy(selfLink), {
    onSuccess: () => {
      queryClient.invalidateQueries(QueryKey.Tasks)
      navigation.goBack()
    },
  })
  return mutation
}

export const useFetchTasksQueries = (tasklists: Tasklist[]) => {
  const tasklistIds = tasklists.map(({ id }) => id)
  const queryResults = useQueries(
    tasklistIds.map(tasklistId => {
      return {
        queryKey: [QueryKey.Tasks, tasklistId],
        queryFn: () => tasksService.findAll(tasklistId),
      }
    }),
  )
  return queryResults
}
