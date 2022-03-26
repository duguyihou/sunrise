import { KeyboardAvoidingView, StyleSheet, TextInput, View } from 'react-native'
import React from 'react'
import { useHeaderHeight } from '@react-navigation/elements'
import { windowWidth } from 'utils/dimensions'
import { AccessoryID, theme } from 'shared'
import TaskAccessory from './TaskAccessory'
import DateTimeButton from './DateTimeButton'
import { useKeyboard } from 'shared/useKeyboard'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import Checkbox from './Checkbox'
import { updateNewTask } from 'app/tasks'

type Props = {
  tasklistId: string
}
const AddTaskView = ({ tasklistId }: Props) => {
  const dispatch = useAppDispatch()
  const { newTask } = useAppSelector(state => state.tasks)
  const { title, due, status } = newTask
  const handleCheck = () =>
    dispatch(updateNewTask({ ...newTask, status: !status }))

  const isKeyboardOpen = useKeyboard()
  const showDateTimeButton = () => !!due && isKeyboardOpen
  const handleOnChangeText = (text: string) =>
    dispatch(updateNewTask({ ...newTask, title: text }))

  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior="padding"
      keyboardVerticalOffset={useHeaderHeight()}>
      <View style={styles.container}>
        <Checkbox
          isChecked={status}
          onPress={handleCheck}
          textComponent={
            <TextInput
              style={styles.title}
              value={title}
              inputAccessoryViewID={AccessoryID.Task}
              onChangeText={handleOnChangeText}
              placeholder="Add a Task"
              blurOnSubmit={false}
            />
          }
          text={title}
        />
        {showDateTimeButton() && <DateTimeButton dateTime={due} />}
      </View>
      <TaskAccessory tasklistId={tasklistId} due={due} />
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
  title: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
})
