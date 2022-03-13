import { KeyboardAvoidingView, StyleSheet, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { useHeaderHeight } from '@react-navigation/elements'
import { windowWidth } from 'utils/dimensions'
import { useAddTaskMutation } from 'hooks/tasks'
import { AccessoryID, RouteName, theme } from 'shared'
import { faAngleUp } from '@fortawesome/free-solid-svg-icons'
import IconButton from './IconButton'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProps, TaskPayload } from 'typings'
import TaskAccessory from './TaskAccessory'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { updateTitle } from 'app/tasks'

type Props = {
  tasklistId: string
}
const AddTaskView = ({ tasklistId }: Props) => {
  const navigation = useNavigation<StackNavigationProps>()
  const { newTask } = useAppSelector(state => state.tasks)
  const dispatch = useAppDispatch()
  const [isFocused, setIsFocused] = useState(false)
  const addTaskMutation = useAddTaskMutation(tasklistId, newTask, false)

  const handleOnSubmitEditing = () => addTaskMutation.mutate()

  const handleExpand = () =>
    navigation.navigate(RouteName.NewTask, { tasklistId, taskPayload: newTask })
  const handleOnChangeTitle = (title: string) => dispatch(updateTitle(title))

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={useHeaderHeight()}>
      <View style={styles.container}>
        {isFocused && <IconButton icon={faAngleUp} fn={handleExpand} />}
        <TextInput
          style={styles.textInput}
          value={newTask.title}
          onChangeText={handleOnChangeTitle}
          placeholder="Add a Task"
          inputAccessoryViewID={AccessoryID.Task}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          blurOnSubmit={false}
          onSubmitEditing={handleOnSubmitEditing}
        />
        {/* <TaskAccessory
          taskPayload={taskPayload}
          setTaskPayload={setTaskPayload}
        /> */}
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
