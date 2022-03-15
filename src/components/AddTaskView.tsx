import { KeyboardAvoidingView, StyleSheet, TextInput, View } from 'react-native'
import React from 'react'
import { useHeaderHeight } from '@react-navigation/elements'
import { windowWidth } from 'utils/dimensions'
import { useAddTaskMutation } from 'hooks/tasks'
import { AccessoryID, theme } from 'shared'
import TaskAccessory from './TaskAccessory'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { updateTitle } from 'app/tasks'
import DateTime from './DateTime'
import { useKeyboard } from 'shared/useKeyboard'

type Props = {
  tasklistId: string
}
const AddTaskView = ({ tasklistId }: Props) => {
  const dispatch = useAppDispatch()
  const { newTask } = useAppSelector(state => state.tasks)
  const { title, due } = newTask
  const addTaskMutation = useAddTaskMutation(tasklistId, newTask, false)
  const isKeyboardOpen = useKeyboard()
  const handleOnSubmitEditing = () => addTaskMutation.mutate()

  const handleOnChangeTitle = (text: string) => dispatch(updateTitle(text))

  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior="padding"
      keyboardVerticalOffset={useHeaderHeight()}>
      <View style={styles.container}>
        <TextInput
          style={styles.title}
          value={title}
          onChangeText={handleOnChangeTitle}
          placeholder="Add a Task"
          inputAccessoryViewID={AccessoryID.Task}
          blurOnSubmit={false}
          onSubmitEditing={handleOnSubmitEditing}
        />
        {!!due && isKeyboardOpen && <DateTime dateTime={due} />}
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
  title: {
    paddingVertical: 8,
    fontSize: 20,
    width: '100%',
  },
})
