import { useAppDispatch, useAppSelector } from 'app/hooks'
import { updateTask } from 'app/tasks'
import React from 'react'
import { StyleSheet, TextInput } from 'react-native'

type Props = {
  title: string
}
const TaskTitle = ({ title }: Props) => {
  const dispatch = useAppDispatch()
  const { task } = useAppSelector(state => state.tasks)
  const handleOnChange = (text: string) =>
    dispatch(updateTask({ ...task, title: text }))
  return (
    <TextInput
      multiline
      style={styles.title}
      value={title}
      onChangeText={handleOnChange}
      placeholder="Add a Task"
      blurOnSubmit={false}
    />
  )
}

export default TaskTitle

const styles = StyleSheet.create({
  title: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
    fontSize: 20,
  },
})
