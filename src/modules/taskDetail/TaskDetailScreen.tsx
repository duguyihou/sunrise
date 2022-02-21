import { ScrollView, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RouteProp, useRoute } from '@react-navigation/native'
import { useForm, Controller } from 'react-hook-form'
import { RootStackParamList } from 'typings'
import { RouteName } from 'shared'
import { useFetchTaskDetailQuery } from 'hooks/tasks'
import DateTimeView from 'components/DateTimeView'
import TaskTitle from 'components/TaskTitle'
import TaskNotes from 'components/TaskNotes'

const TaskDetailScreen = () => {
  const {
    params: { tasklistId, taskId },
  } = useRoute<RouteProp<RootStackParamList, RouteName.TaskDetail>>()
  const { isLoading, error, data } = useFetchTaskDetailQuery(tasklistId, taskId)
  const [task, setTask] = useState(data)
  useEffect(() => {
    if (!isLoading && data) setTask(data)
  }, [data, isLoading])
  const {
    control,
    formState: { errors },
  } = useForm({
    defaultValues: { ...task },
  })
  if (isLoading && !task) return <Text>loading...</Text>
  if (error) return <Text>`An error has occurred: ${error.message}`</Text>
  return (
    <ScrollView>
      <Controller
        name="title"
        control={control}
        render={({ field }) => <TaskTitle {...field} />}
      />
      {errors.title && <Text>This is required.</Text>}
      <Controller
        name="due"
        control={control}
        render={({ field }) => <DateTimeView {...field} />}
      />
      <Controller
        name="notes"
        control={control}
        render={({ field }) => <TaskNotes {...field} />}
      />
    </ScrollView>
  )
}

export default TaskDetailScreen
