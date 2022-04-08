import { updateTask } from 'app/tasksSlice'
import { useAppDispatch, useTasks } from 'hooks/app'
import React from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { theme } from 'shared/theme'

function TaskNotesSection() {
  const dispatch = useAppDispatch()
  const { task } = useTasks()
  const { notes } = task
  const handleOnChange = (text: string) =>
    dispatch(updateTask({ ...task, notes: text }))
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
