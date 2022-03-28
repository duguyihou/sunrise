import { useNavigation } from '@react-navigation/native'
import tasksService from 'api/tasks'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { clearNewTask, clearSubtask, updateTaskDetail } from 'app/tasks'
import { useEffect } from 'react'
import { useMutation, useQueries, useQuery, useQueryClient } from 'react-query'
import { QueryKey, TaskStatus } from 'shared/constants'
import { StackNavigationProps, TaskQuery, Task, Tasklist } from 'typings'
import { RawTask, TaskPayload } from 'typings/task'

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
        needsActionTasks = tasks.filter(
          ({ status, parent }) => !status && !parent,
        )
        compeletedTasks = tasks.filter(
          ({ status, parent }) => status && !parent,
        )
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
  const status = task.status ? TaskStatus.Completed : TaskStatus.NeedsAction
  const rawTask = { ...task, status }
  const mutation = useMutation(() => tasksService.update(rawTask), {
    onSuccess: () => {
      queryClient.invalidateQueries(QueryKey.Tasks)
    },
  })
  return mutation
}

export const useFetchTaskDetailQuery = (selfLink: string) => {
  const dispatch = useAppDispatch()
  const { taskDetail } = useAppSelector(state => state.tasks)
  const { isLoading, error, data } = useQuery<RawTask, Error, Task>(
    QueryKey.TaskDetail,
    async () => tasksService.find(selfLink),
    {
      select: task => ({
        ...task,
        status: task.status === TaskStatus.Completed ? true : false,
      }),
    },
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

export const useAddSubtaskMutation = (
  tasklistId: string,
  taskId: string,
  subtask: TaskPayload,
) => {
  const queryClient = useQueryClient()
  const dispatch = useAppDispatch()
  const addTaskMutation = useMutation(
    () => tasksService.createSubtask(tasklistId, taskId, subtask),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QueryKey.Tasks, tasklistId])
        dispatch(clearSubtask())
      },
    },
  )
  return addTaskMutation
}

export const useFetchSubtasksQuery = (tasklistId: string, taskId: string) => {
  const queryResult = useQuery<TaskQuery, Error, Task[]>(
    [QueryKey.Tasks, tasklistId],
    async () => tasksService.findAll(tasklistId),
    {
      select: ({ items }) =>
        items
          .filter(({ parent }) => parent === taskId)
          .map(item => ({
            ...item,
            status: item.status === TaskStatus.Completed ? true : false,
          })),
    },
  )
  return queryResult
}
