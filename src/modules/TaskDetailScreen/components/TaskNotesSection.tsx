import { useUpdateTaskNotes } from 'hooks/tasks'
import React, { useState } from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { theme } from 'shared/theme'
import { Task } from 'typings/task'

type Props = {
  task: Task
}
function TaskNotesSection({ task }: Props) {
  const { notes } = task
  const [text, setText] = useState(notes)
  const updateTaskNotes = useUpdateTaskNotes({ ...task, notes: text })
  const handleSubmit = () => updateTaskNotes.mutate()
  return (
    <TextInput
      multiline
      style={styles.notes}
      value={text}
      onChangeText={setText}
      placeholder="Add Notes"
      blurOnSubmit={false}
      onSubmitEditing={handleSubmit}
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
