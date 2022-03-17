import { useNavigation } from '@react-navigation/native'
import tasksService from 'api/tasks'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
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
  const useFormState = useForm({
    defaultValues: { title: '', due: '', notes: '' },
  })
  const { getValues, reset } = useFormState
  const task = () => ({
    title: getValues('title'),
    due: getValues('due'),
    notes: getValues('notes'),
  })
  const addTaskMutation = useMutation(
    () => tasksService.create(tasklistId, task()),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QueryKey.Tasks, tasklistId])
        reset()
      },
    },
  )
  return { addTaskMutation, useFormState }
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
  const { control, reset } = useForm({ mode: 'onChange' })

  const { isLoading, error, data } = useQuery<TaskPayload, Error>(
    QueryKey.TaskDetail,
    async () => tasksService.findBy(selfLink),
  )
  useEffect(() => {
    if (data) reset({ ...data })
  }, [data, reset])
  return { isLoading, error, control }
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
