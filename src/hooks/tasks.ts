import { useNavigation } from '@react-navigation/native'
import tasksService from 'api/tasks'
import { clearTask, updateTask } from 'app/tasksSlice'
import { useAppDispatch, useTasks } from 'hooks/app'
import { useEffect } from 'react'
import { useMutation, useQueries, useQuery, useQueryClient } from 'react-query'
import { QueryKey, TaskStatus } from 'shared/constants'
import { StackNavigationProps } from 'typings/route'
import { RawTask, Task, Tasklist, TaskPayload, TaskQuery } from 'typings/task'

export const useFetchTasksQuery = (
  tasklistId: string,
  showCompleted?: boolean,
  showDeleted?: boolean,
  showHidden?: boolean,
) => {
  let tasks: Task[] | undefined
  let needsActionTasks: Task[] | undefined
  let compeletedTasks: Task[] | undefined
  const queryResult = useQuery<TaskQuery, Error, void>(
    [QueryKey.Tasks, tasklistId],
    async () =>
      tasksService.findAll(tasklistId, showCompleted, showDeleted, showHidden),
    {
      select: ({ items }) => {
        tasks = items?.map(item => ({
          ...item,
          status: item.status === TaskStatus.Completed,
        }))
        needsActionTasks = tasks?.filter(
          ({ status, parent }) => !status && !parent,
        )
        compeletedTasks = tasks?.filter(
          ({ status, parent }) => status && !parent,
        )
      },
    },
  )
  return { ...queryResult, tasks, needsActionTasks, compeletedTasks }
}

export const useAddTaskMutation = (tasklistId: string) => {
  const queryClient = useQueryClient()
  const { task } = useTasks()
  const status = task.status ? TaskStatus.Completed : TaskStatus.NeedsAction
  const rawNewTask = { ...task, status }
  const dispatch = useAppDispatch()
  const addTaskMutation = useMutation(
    () => tasksService.create(tasklistId, rawNewTask),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QueryKey.Tasks, tasklistId])
        dispatch(clearTask())
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
  const { task } = useTasks()
  const { isLoading, error, data } = useQuery<RawTask, Error, Task>(
    QueryKey.TaskDetail,
    async () => tasksService.find(selfLink),
    {
      select: rawTask => ({
        ...rawTask,
        status: rawTask.status === TaskStatus.Completed,
      }),
    },
  )
  useEffect(() => {
    if (data) dispatch(updateTask(data))
  }, [data, dispatch])

  return { isLoading, error, task }
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
    tasklistIds.map(tasklistId => ({
      queryKey: [QueryKey.Tasks, tasklistId],
      queryFn: () => tasksService.findAll(tasklistId),
    })),
  )
  return queryResults
}

export const useAddSubtaskMutation = (
  tasklistId: string,
  taskId: string,
  subtask: TaskPayload,
) => {
  const queryClient = useQueryClient()
  const addTaskMutation = useMutation(
    () => tasksService.createSubtask(tasklistId, taskId, subtask),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QueryKey.Tasks, tasklistId])
      },
    },
  )
  return addTaskMutation
}

export const useFetchSubtasksQuery = (tasklistId: string, taskId: string) => {
  const queryResult = useQuery<TaskQuery, Error, Task[] | undefined>(
    [QueryKey.Tasks, tasklistId],
    async () => tasksService.findAll(tasklistId),
    {
      select: ({ items }) => {
        const rawSubtasks = items?.filter(({ parent }) => parent === taskId)
        const subtasks = rawSubtasks?.map(item => ({
          ...item,
          status: item.status === TaskStatus.Completed,
        }))
        return subtasks
      },
    },
  )
  return queryResult
}
