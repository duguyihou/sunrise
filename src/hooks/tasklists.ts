import tasklistService from 'api/tasklists'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useNavigation } from '@react-navigation/native'

import { QueryKey } from 'shared'
import { TasklistQuery } from 'typings'

export const useFetchTasklistQuery = () => {
  const { isLoading, error, data } = useQuery<TasklistQuery, Error>(
    QueryKey.Tasklists,
    async () => await tasklistService.findAll(),
  )
  return { isLoading, error, data }
}

export const useAddTasklistMutation = (title: string) => {
  const queryClient = useQueryClient()
  const mutation = useMutation(() => tasklistService.create(title), {
    onSuccess: () => {
      queryClient.invalidateQueries(QueryKey.Tasklists)
    },
  })
  return mutation
}

export const useDeleteTasklistMutation = (selfLink: string) => {
  const queryClient = useQueryClient()
  const navigation = useNavigation()
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
    () => tasklistService.updateById(tasklistId, title),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QueryKey.Tasklists)
      },
    },
  )
  return mutation
}
