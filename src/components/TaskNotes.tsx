import React from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { theme } from 'shared'
import { updateTask } from 'app/tasks'

type Props = {
  notes: string
}
const TaskNotes = ({ notes }: Props) => {
  const dispatch = useAppDispatch()
  const { task } = useAppSelector(state => state.tasks)
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

export default TaskNotes

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
