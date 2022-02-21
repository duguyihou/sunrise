import { ScrollView, Text } from 'react-native'
import React from 'react'
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
  const { control, setValue } = useForm({
    defaultValues: { ...data },
  })
  if (isLoading || !data) return <Text>loading...</Text>
  if (error) return <Text>`An error has occurred: ${error.message}`</Text>
  return (
    <ScrollView>
      <Controller
        name="title"
        control={control}
        render={({ field: { value, onChange } }) => (
          <TaskTitle value={value} onChange={onChange} />
        )}
      />
      <Controller
        name="due"
        control={control}
        render={({ field: { value } }) => (
          <DateTimeView value={value} setValue={setValue} />
        )}
      />
      <Controller
        name="notes"
        control={control}
        render={({ field: { value, onChange } }) => (
          <TaskNotes value={value} onChange={onChange} />
        )}
      />
    </ScrollView>
  )
}

export default TaskDetailScreen
