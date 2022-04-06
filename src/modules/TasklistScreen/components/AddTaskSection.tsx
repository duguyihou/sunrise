import { useHeaderHeight } from '@react-navigation/elements'
import { updateNewTask } from 'app/tasksSlice'
import { useAppDispatch, useTasks } from 'hooks/app'
import useKeyboard from 'hooks/useKeyboard'
import { Checkbox, DateTimeButton } from 'modules/common/components'
import React from 'react'
import { KeyboardAvoidingView, StyleSheet, TextInput, View } from 'react-native'
import { AccessoryID } from 'shared/constants'
import { theme } from 'shared/theme'

import TaskAccessory from './TaskAccessory'

function AddTaskSection() {
  const dispatch = useAppDispatch()
  const { newTask } = useTasks()
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
      <TaskAccessory />
    </KeyboardAvoidingView>
  )
}

export default AddTaskSection

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 30,
    width: '100%',
  },
  container: {
    paddingHorizontal: 20,
    backgroundColor: theme.bg.secondary,
  },
  title: {
    flex: 1,
    padding: 10,
    paddingLeft: 20,
    fontSize: 16,
  },
})
