import { StyleSheet, TextInput } from 'react-native'
import React, { Dispatch, SetStateAction } from 'react'
import { TaskPayload } from 'typings/task'
import { theme } from 'shared'

type Props = {
  task: TaskPayload
  setTask: Dispatch<SetStateAction<TaskPayload>>
}
const TaskNotes = ({ task, setTask }: Props) => {
  return (
    <TextInput
      style={styles.notes}
      value={task.notes}
      onChangeText={t => setTask({ ...task, notes: t })}
      placeholder="Add a Task"
      blurOnSubmit={false}
    />
  )
}

export default TaskNotes

const styles = StyleSheet.create({
  notes: {
    paddingHorizontal: 10,
    fontSize: 18,
    borderTopWidth: 1,
    paddingVertical: 10,
    borderColor: theme.border,
  },
})
