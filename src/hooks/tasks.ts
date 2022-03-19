import { useNavigation } from '@react-navigation/native'
import tasksService from 'api/tasks'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { clearNewTask, updateTask } from 'app/tasks'
import { useEffect } from 'react'
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

export const useAddTaskMutation = (tasklistId: string) => {
  const queryClient = useQueryClient()
  const { newTask } = useAppSelector(state => state.tasks)
  const dispatch = useAppDispatch()
  const addTaskMutation = useMutation(
    () => tasksService.create(tasklistId, newTask),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QueryKey.Tasks, tasklistId])
        dispatch(clearNewTask())
      },
    },
  )
  return { addTaskMutation, newTask }
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
  const { task } = useAppSelector(state => state.tasks)
  const dispatch = useAppDispatch()
  const { isLoading, error, data } = useQuery<TaskPayload, Error>(
    QueryKey.TaskDetail,
    async () => tasksService.findBy(selfLink),
  )
  useEffect(() => {
    if (data) dispatch(updateTask(data))
  }, [data, dispatch])

  return { isLoading, error, task }
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
