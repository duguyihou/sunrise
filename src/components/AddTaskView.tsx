import { KeyboardAvoidingView, StyleSheet, TextInput, View } from 'react-native'
import React from 'react'
import { useHeaderHeight } from '@react-navigation/elements'
import { windowWidth } from 'utils/dimensions'
import { useAddTaskMutation } from 'hooks/tasks'
import { AccessoryID, theme } from 'shared'
import TaskAccessory from './TaskAccessory'
import DateTimeButton from './DateTimeButton'
import { useKeyboard } from 'shared/useKeyboard'
import TaskTitle from './TaskTitle'

type Props = {
  tasklistId: string
}
const AddTaskView = ({ tasklistId }: Props) => {
  const { addTaskMutation, newTask } = useAddTaskMutation(tasklistId)
  const isKeyboardOpen = useKeyboard()
  const { title, due } = newTask
  const showDateTimeButton = () => !!due && isKeyboardOpen
  // const handleSubmit = () => addTaskMutation.mutate()
  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior="padding"
      keyboardVerticalOffset={useHeaderHeight()}>
      <View style={styles.container}>
        <TaskTitle title={title} accessoryID={AccessoryID.Task} />
        {showDateTimeButton() && <DateTimeButton dateTime={due} />}
      </View>
      <TaskAccessory />
    </KeyboardAvoidingView>
  )
}

export default AddTaskView

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 50,
  },
  container: {
    width: windowWidth,
    backgroundColor: theme.bg.secondary,
    paddingHorizontal: 20,
    alignItems: 'flex-start',
  },
})
