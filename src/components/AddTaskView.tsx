import { KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import React from 'react'
import { useHeaderHeight } from '@react-navigation/elements'
import { windowWidth } from 'utils/dimensions'
import { AccessoryID, theme } from 'shared'
import TaskAccessory from './TaskAccessory'
import DateTimeButton from './DateTimeButton'
import { useKeyboard } from 'shared/useKeyboard'
import TaskTitle from './TaskTitle'
import { useAppSelector } from 'app/hooks'

type Props = {
  tasklistId: string
}
const AddTaskView = ({ tasklistId }: Props) => {
  const { newTask } = useAppSelector(state => state.tasks)
  const { title, due } = newTask
  const isKeyboardOpen = useKeyboard()
  const showDateTimeButton = () => !!due && isKeyboardOpen
  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior="padding"
      keyboardVerticalOffset={useHeaderHeight()}>
      <View style={styles.container}>
        <TaskTitle title={title} accessoryID={AccessoryID.Task} />
        {showDateTimeButton() && <DateTimeButton dateTime={due} />}
      </View>
      <TaskAccessory tasklistId={tasklistId} />
    </KeyboardAvoidingView>
  )
}

export default AddTaskView

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 30,
  },
  container: {
    width: windowWidth - 20,
    backgroundColor: theme.bg.secondary,
    paddingHorizontal: 20,
  },
})
