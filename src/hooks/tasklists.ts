import tasklistService from 'api/tasklists'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useNavigation } from '@react-navigation/native'

import { QueryKey, RouteName } from 'shared'
import { StackNavigationProps, TasklistQuery } from 'typings'
import { useMemo } from 'react'

export const useFetchTasklistQuery = () => {
  const queryResult = useQuery<TasklistQuery, Error>(
    QueryKey.Tasklists,
    async () => await tasklistService.findAll(),
  )
  return {
    ...queryResult,
    data: useMemo(() => queryResult.data?.items, [queryResult.data]),
  }
}

export const useAddTasklistMutation = (title: string) => {
  const queryClient = useQueryClient()
  const navigation = useNavigation<StackNavigationProps>()
  const mutation = useMutation(() => tasklistService.create(title), {
    onSuccess: data => {
      queryClient.invalidateQueries(QueryKey.Tasklists)
      navigation.navigate(RouteName.NewTasklist, {
        tasklist: data,
      })
    },
  })
  return mutation
}

export const useDeleteTasklistMutation = (selfLink: string) => {
  const queryClient = useQueryClient()
  const navigation = useNavigation<StackNavigationProps>()
  const mutation = useMutation(() => tasklistService.deleteBy(selfLink), {
    onSuccess: () => {
      queryClient.invalidateQueries(QueryKey.Tasklists)
      navigation.goBack()
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
      onSuccess: () => {
        queryClient.invalidateQueries(QueryKey.Tasklists)
      },
    },
  )
  return mutation
}
