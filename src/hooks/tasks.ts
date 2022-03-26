import { useNavigation } from '@react-navigation/native'
import tasksService from 'api/tasks'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { clearNewTask, updateTaskDetail } from 'app/tasks'
import { useEffect } from 'react'
import { useMutation, useQueries, useQuery, useQueryClient } from 'react-query'
import { QueryKey, TaskStatus } from 'shared'
import { StackNavigationProps, TaskQuery, Task, Tasklist } from 'typings'

export const useFetchTasksQuery = (
  tasklistId: string,
  showCompleted?: boolean,
  showDeleted?: boolean,
  showHidden?: boolean,
) => {
  let tasks: Task[] = [],
    needsActionTasks: Task[] = [],
    compeletedTasks: Task[] = []
  const queryResult = useQuery<TaskQuery, Error, void>(
    [QueryKey.Tasks, tasklistId],
    async () =>
      tasksService.findAll(tasklistId, showCompleted, showDeleted, showHidden),
    {
      select: ({ items }) => {
        tasks = items.map(item => ({
          ...item,
          status: item.status === TaskStatus.Completed ? true : false,
        }))
        needsActionTasks = tasks.filter(({ status }) => !status)
        compeletedTasks = tasks.filter(({ status }) => status)
      },
    },
  )
  return { ...queryResult, tasks, needsActionTasks, compeletedTasks }
}

export const useAddTaskMutation = (tasklistId: string) => {
  const queryClient = useQueryClient()
  const { newTask } = useAppSelector(state => state.tasks)
  const status = newTask.status ? TaskStatus.Completed : TaskStatus.NeedsAction
  const rawNewTask = { ...newTask, status }
  const dispatch = useAppDispatch()
  const addTaskMutation = useMutation(
    () => tasksService.create(tasklistId, rawNewTask),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QueryKey.Tasks, tasklistId])
        dispatch(clearNewTask())
      },
    },
  )
  return addTaskMutation
}

export const useUpdateTaskMutation = (task: Task) => {
  const queryClient = useQueryClient()
  const status = task.status ? TaskStatus.NeedsAction : TaskStatus.Completed
  const rawTask = { ...task, status }
  const mutation = useMutation(() => tasksService.update(rawTask), {
    onSuccess: () => {
      queryClient.invalidateQueries(QueryKey.Tasks)
    },
  })
  return mutation
}

export const useFetchTaskDetailQuery = (selfLink: string) => {
  const { taskDetail } = useAppSelector(state => state.tasks)
  const dispatch = useAppDispatch()
  const { isLoading, error, data } = useQuery<Task, Error>(
    QueryKey.TaskDetail,
    async () => tasksService.find(selfLink),
  )
  useEffect(() => {
    if (data) dispatch(updateTaskDetail(data))
  }, [data, dispatch])

  return { isLoading, error, taskDetail }
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
