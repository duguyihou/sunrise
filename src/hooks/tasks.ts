import { useNavigation } from '@react-navigation/native'
import tasksService from 'api/tasks'
import { useAppDispatch } from 'app/hooks'
import { clearTask } from 'app/tasks'
import dayjs from 'dayjs'
import { useMutation, useQueries, useQuery, useQueryClient } from 'react-query'
import { QueryKey } from 'shared'
import {
  StackNavigationProps,
  TaskQuery,
  Task,
  TaskPayload,
  Tasklist,
} from 'typings'

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
  return {
    ...queryResult,
    data: queryResult.data?.items,
  }
}

export const useAddTaskMutation = (
  tasklistId: string,
  taskPayload: TaskPayload,
  goBack = true,
) => {
  const task = { ...taskPayload, due: dayjs(taskPayload.due) }
  const queryClient = useQueryClient()
  const navigation = useNavigation<StackNavigationProps>()
  const dispatch = useAppDispatch()
  const mutation = useMutation(() => tasksService.create(tasklistId, task), {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKey.Tasks, tasklistId])
      dispatch(clearTask())
      goBack && navigation.goBack()
    },
  })
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
  const queryResult = useQuery<TaskPayload, Error>(
    QueryKey.TaskDetail,
    async () => tasksService.findBy(selfLink),
  )
  return queryResult
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
