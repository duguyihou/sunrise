import { ScrollView } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import IconButton from 'components/IconButton'
import { faAngleDown, faCheck } from '@fortawesome/free-solid-svg-icons'
import { useForm, Controller } from 'react-hook-form'
import { useAddTaskMutation } from 'hooks/tasks'
import { RootStackParamList } from 'typings'
import { RouteName } from 'shared'
import DateTimeView from 'components/DateTimeView'
import TaskTitle from 'components/TaskTitle'
import TaskNotes from 'components/TaskNotes'
import { TaskPayload } from 'typings/task'

const NewTaskScreen = () => {
  const navigation = useNavigation()
  const {
    params: { tasklistId },
  } = useRoute<RouteProp<RootStackParamList, RouteName.NewTask>>()
  useLayoutEffect(() =>
    navigation.setOptions({
      headerLeft: () => <IconButton icon={faAngleDown} fn={handleDismiss} />,
      headerRight: () => (
        <IconButton icon={faCheck} fn={handleSubmit(onSubmit)} />
      ),
    }),
  )
  const [newtask, setNewtask] = useState({
    title: '',
    notes: '',
    due: new Date(),
  })
  const { control, handleSubmit } = useForm({ defaultValues: newtask })
  const addTaskMutation = useAddTaskMutation(tasklistId, newtask)

  const onSubmit = (payload: TaskPayload) => {
    setNewtask(payload)
    addTaskMutation.mutate()
    navigation.goBack()
  }
  const handleDismiss = () => navigation.goBack()

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

export default NewTaskScreen
