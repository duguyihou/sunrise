import tasklistService from 'api/tasklists'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useNavigation } from '@react-navigation/native'

import { queryKey } from 'shared'
import { TasklistQuery } from 'typings'

export const useFetchTasklistQuery = () => {
  const { isLoading, error, data } = useQuery<TasklistQuery, Error>(
    queryKey.tasklists,
    async () => await tasklistService.findAll(),
  )
  return { isLoading, error, data }
}

export const useDeleteTasklistMutation = (tasklistId: string) => {
  const queryClient = useQueryClient()
  const navigation = useNavigation()
  const mutation = useMutation(() => tasklistService.deleteById(tasklistId), {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey.tasklists)
      navigation.goBack()
    },
  })
  return mutation
}

export const useAddTasklistMutation = (title: string) => {
  const queryClient = useQueryClient()
  const mutation = useMutation(() => tasklistService.create(title), {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey.tasklists)
    },
  })
  return mutation
}
