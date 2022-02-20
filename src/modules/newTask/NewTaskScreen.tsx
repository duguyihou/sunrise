import { ScrollView, StyleSheet } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import IconButton from 'components/IconButton'
import { faAngleDown, faCheck } from '@fortawesome/free-solid-svg-icons'
import { windowWidth } from 'utils/dimensions'
import { useAddTaskMutation } from 'hooks/tasks'
import { RootStackParamList } from 'typings'
import { RouteName } from 'shared'
import DateTimeView from 'components/DateTimeView'
import { TaskPayload } from 'typings/task'
import TaskTitle from 'components/TaskTitle'
import TaskNotes from 'components/TaskNotes'

const NewTaskScreen = () => {
  const navigation = useNavigation()
  const {
    params: { tasklistId },
  } = useRoute<RouteProp<RootStackParamList, RouteName.NewTask>>()
  const initialState = { title: '', notes: '', due: new Date() } as TaskPayload
  const [task, setTask] = useState(initialState)
  const addTaskMutation = useAddTaskMutation(tasklistId, {
    ...task,
  })
  const handleSaveTask = () => {
    addTaskMutation.mutate()
    navigation.goBack()
  }
  const handleDismiss = () => navigation.goBack()

  useLayoutEffect(() =>
    navigation.setOptions({
      headerLeft: () => <IconButton icon={faAngleDown} fn={handleDismiss} />,
      headerRight: () => <IconButton icon={faCheck} fn={handleSaveTask} />,
    }),
  )

  return (
    <ScrollView style={styles.container}>
      <TaskTitle task={task} setTask={setTask} />
      <DateTimeView task={task} setTask={setTask} />
      <TaskNotes task={task} setTask={setTask} />
    </ScrollView>
  )
}

export default NewTaskScreen

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
  },
})
