import React from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { theme } from 'shared'
import { updateTaskDetail } from 'app/tasks'

const TaskNotesSection = () => {
  const dispatch = useAppDispatch()
  const { taskDetail } = useAppSelector(state => state.tasks)
  const { notes } = taskDetail
  const handleOnChange = (text: string) =>
    dispatch(updateTaskDetail({ ...taskDetail, notes: text }))
  return (
    <TextInput
      multiline
      style={styles.notes}
      value={notes}
      onChangeText={handleOnChange}
      placeholder="Add Notes"
      blurOnSubmit={false}
    />
  )
}

export default TaskNotesSection

const styles = StyleSheet.create({
  notes: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    color: theme.font.placeholder,
    minHeight: 150,
    backgroundColor: theme.bg.secondary,
  },
})