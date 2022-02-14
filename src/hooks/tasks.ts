import tasksService from 'api/tasks'
import { useQuery } from 'react-query'
import { QueryKey } from 'shared'
import { TaskQuery } from 'typings/task'

export const useFetchTasksQuery = (tasklistId: string) => {
  const { isLoading, error, data } = useQuery<TaskQuery, Error>(
    QueryKey.Tasks,
    async () => tasksService.findAll(tasklistId),
  )
  return { isLoading, error, data }
}
