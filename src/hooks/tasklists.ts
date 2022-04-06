import { useNavigation } from '@react-navigation/native'
import tasklistService from 'api/tasklists'
import { useMemo } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { QueryKey, RouteName, TasklistName } from 'shared/constants'
import { StackNavigationProps } from 'typings/route'
import { TasklistQuery } from 'typings/task'

export const useFetchTasklistQuery = () => {
  const queryResult = useQuery<TasklistQuery, Error>(
    QueryKey.Tasklists,
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
        queryClient.invalidateQueries(QueryKey.Tasklists)
        navigation.navigate(RouteName.NewTasklist, {
          tasklist: data,
        })
      },
    },
  )
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
