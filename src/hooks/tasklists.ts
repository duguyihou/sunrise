import { useNavigation } from '@react-navigation/native'
import tasklistService from 'api/tasklists'
import { useMemo } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { RouteName, TasklistName } from 'shared/constants'
import { StackNavigationProps } from 'typings/route'
import { TasklistQuery } from 'typings/task'

const taskKeys = {
  all: ['tasks'] as const,
  lists: () => [...taskKeys.all, 'list'] as const,
  list: (filters: string) => [...taskKeys.lists(), { filters }] as const,
  details: () => [...taskKeys.all, 'detail'] as const,
  detail: (id: string) => [...taskKeys.details(), id] as const,
}
export const useFetchTasklistQuery = () => {
  const queryResult = useQuery<TasklistQuery, Error>(
    taskKeys.lists(),
    async () => tasklistService.findAll(),
  )
  return {
    ...queryResult,
    data: useMemo(() => queryResult.data?.items, [queryResult.data]),
  }
}

export const useAddTasklistMutation = () => {
  const queryClient = useQueryClient()
  const navigation = useNavigation<StackNavigationProps>()
  const mutation = useMutation(
    () => tasklistService.create(TasklistName.UntitledList),
    {
      onSuccess: data => {
        queryClient.invalidateQueries(taskKeys.lists())
        navigation.navigate(RouteName.NewTasklist, {
          tasklist: data,
        })
      },
    },
  )
  return mutation
}

export const useDeleteTasklistMutation = (tasklistId: string) => {
  const queryClient = useQueryClient()
  const navigation = useNavigation<StackNavigationProps>()

  const mutation = useMutation(() => tasklistService.deleteBy(tasklistId), {
    onSuccess: () => {
      queryClient.invalidateQueries(taskKeys.lists())
      navigation.navigate(RouteName.Tasklists)
    },
  })
  return mutation
}

export const useUpdateTasklistMutation = (
  tasklistId: string,
  title: string,
) => {
  const queryClient = useQueryClient()
  const mutation = useMutation(
    () => tasklistService.updateBy(tasklistId, title),
    {
      onSuccess: newTasklist => {
        queryClient.invalidateQueries(taskKeys.lists())
        queryClient.setQueryData(taskKeys.list(tasklistId), newTasklist)
      },
    },
  )
  return mutation
}
