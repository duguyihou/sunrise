import { ScrollView, Text } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { useForm, Controller } from 'react-hook-form'
import { RootStackParamList } from 'typings'
import { RouteName } from 'shared'
import { useDeleteTaskMutation, useFetchTaskDetailQuery } from 'hooks/tasks'
import DateTimeView from 'components/DateTimeView'
import TaskTitle from 'components/TaskTitle'
import TaskNotes from 'components/TaskNotes'
import IconButton from 'components/IconButton'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const TaskDetailScreen = () => {
  const {
    params: { tasklistId, taskId },
  } = useRoute<RouteProp<RootStackParamList, RouteName.TaskDetail>>()
  const navigation = useNavigation()
  useLayoutEffect(() =>
    navigation.setOptions({
      headerRight: () => <IconButton icon={faTrash} fn={handleDelete} />,
    }),
  )
  const handleDelete = () => {
    deleteTaskMutation.mutate()
    navigation.goBack()
  }
  const deleteTaskMutation = useDeleteTaskMutation(tasklistId, taskId)
  const { isLoading, error, data } = useFetchTaskDetailQuery(tasklistId, taskId)
  const [defaultValues, setDefaultValues] = useState({
    title: '',
    due: new Date(),
    notes: '',
  })
  const { reset, control } = useForm({ defaultValues })
  useEffect(() => setDefaultValues(data!), [data])
  useEffect(() => reset(defaultValues), [defaultValues, reset])
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
        render={({ field: { value, onChange } }) => (
          <DateTimeView value={value} onChange={onChange} />
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
