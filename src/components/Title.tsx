import { StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { updateTaskDetail } from 'app/tasks'

type Props = {
  accessoryID?: string
}
const Title = (props: Props) => {
  const { accessoryID } = props
  const dispatch = useAppDispatch()
  const { taskDetail } = useAppSelector(state => state.tasks)
  const handleOnChangeText = (text: string) => {
    dispatch(updateTaskDetail({ ...taskDetail, title: text }))
  }
  return (
    <TextInput
      editable={!accessoryID}
      style={styles.title}
      value={taskDetail.title}
      inputAccessoryViewID={accessoryID}
      onChangeText={handleOnChangeText}
      placeholder="Add a Task"
      blurOnSubmit={false}
    />
  )
}

export default Title

const styles = StyleSheet.create({
  title: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
})
