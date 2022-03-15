import { KeyboardAvoidingView, StyleSheet, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { useHeaderHeight } from '@react-navigation/elements'
import { windowWidth } from 'utils/dimensions'
import { useAddTaskMutation } from 'hooks/tasks'
import { AccessoryID, RouteName, theme } from 'shared'
import { faAngleUp } from '@fortawesome/free-solid-svg-icons'
import IconButton from './IconButton'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProps } from 'typings'
import TaskAccessory from './TaskAccessory'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { updateTitle } from 'app/tasks'

type Props = {
  tasklistId: string
}
const AddTaskView = ({ tasklistId }: Props) => {
  const { newTask } = useAppSelector(state => state.tasks)
  const { title } = newTask
  const dispatch = useAppDispatch()
  const addTaskMutation = useAddTaskMutation(tasklistId, newTask, false)

  const handleOnSubmitEditing = () => addTaskMutation.mutate()

  const handleOnChangeTitle = (text: string) => dispatch(updateTitle(text))

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={useHeaderHeight()}>
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          value={title}
          onChangeText={handleOnChangeTitle}
          placeholder="Add a Task"
          inputAccessoryViewID={AccessoryID.Task}
          blurOnSubmit={false}
          onSubmitEditing={handleOnSubmitEditing}
        />
        <TaskAccessory />
      </View>
    </KeyboardAvoidingView>
  )
}

export default AddTaskView

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    backgroundColor: theme.bg.secondary,
    alignItems: 'center',
  },
  textInput: {
    padding: 20,
    fontSize: 20,
    width: '100%',
  },
})
