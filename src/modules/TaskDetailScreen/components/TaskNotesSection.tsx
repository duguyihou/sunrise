import React from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { useAppDispatch, useTasks } from 'hooks/app'
import { theme } from 'shared/theme'
import { updateTaskDetail } from 'app/tasksSlice'

function TaskNotesSection() {
  const dispatch = useAppDispatch()
  const { taskDetail } = useTasks()
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
