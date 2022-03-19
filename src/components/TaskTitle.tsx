import { useNavigation } from '@react-navigation/native'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { updateNewTask, updateTask } from 'app/tasks'
import React from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { RouteName } from 'shared'
import { StackNavigationProps } from 'typings'
import { getPrevRoute } from 'utils/routes'

type Props = {
  title: string
  accessoryID?: string
}
const TaskTitle = ({ title, accessoryID }: Props) => {
  const navigation = useNavigation<StackNavigationProps>()

  const dispatch = useAppDispatch()
  const { task, newTask } = useAppSelector(state => state.tasks)
  const handleOnChangeText = (text: string) => {
    if (getPrevRoute(navigation).name === RouteName.Tasklists) {
      dispatch(updateNewTask({ ...newTask, title: text }))
    } else {
      dispatch(updateTask({ ...task, title: text }))
    }
  }
  return (
    <TextInput
      style={styles.title}
      value={title}
      inputAccessoryViewID={accessoryID}
      onChangeText={handleOnChangeText}
      placeholder="Add a Task"
      blurOnSubmit={false}
    />
  )
}

export default TaskTitle

const styles = StyleSheet.create({
  title: {
    width: '100%',
    paddingHorizontal: 10,
    fontSize: 20,
  },
})
