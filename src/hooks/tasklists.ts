import tasklistService from 'api/tasklists'
import { useQuery } from 'react-query'
import { queryKey } from 'shared'
import { TasklistQuery } from 'typings'

export const useFetchTasklistQuery = () => {
  const { isLoading, error, data } = useQuery<TasklistQuery, Error>(
    queryKey.tasklists,
    async () => await tasklistService.findAll(),
  )
  return { isLoading, error, data }
}
