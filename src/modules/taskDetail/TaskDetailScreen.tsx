import { ScrollView, Text } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { useForm, Controller } from 'react-hook-form'
import { RootStackParamList } from 'typings'
import { RouteName } from 'shared'
import { useDeleteTaskMutation, useFetchTaskDetailQuery } from 'hooks/tasks'
import TaskDateTime from 'components/TaskDateTime'
import TaskTitle from 'components/TaskTitle'
import TaskNotes from 'components/TaskNotes'
import IconButton from 'components/IconButton'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const TaskDetailScreen = () => {
  const {
    params: { selfLink },
  } = useRoute<RouteProp<RootStackParamList, RouteName.TaskDetail>>()
  const navigation = useNavigation()
  const { isLoading, error, data } = useFetchTaskDetailQuery(selfLink)
  const deleteTaskMutation = useDeleteTaskMutation(selfLink)
  useLayoutEffect(() =>
    navigation.setOptions({
      headerRight: () => <IconButton icon={faTrash} fn={handleDelete} />,
    }),
  )
  const { control, setValue } = useForm({ mode: 'onChange' })
  useEffect(() => {
    if (data) {
      setValue('title', data.title)
      setValue('due', data.due)
      setValue('notes', data.notes)
    }
  }, [data, setValue])
  const handleDelete = () => deleteTaskMutation.mutate()

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
          <TaskDateTime value={value} onChange={onChange} />
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
