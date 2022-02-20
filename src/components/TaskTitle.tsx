import { StyleSheet, TextInput } from 'react-native'
import React, { Dispatch, SetStateAction } from 'react'
import { TaskPayload } from 'typings/task'

type Props = {
  task: TaskPayload
  setTask: Dispatch<SetStateAction<TaskPayload>>
}
const TaskTitle = ({ task, setTask }: Props) => {
  return (
    <TextInput
      style={styles.title}
      value={task.title}
      onChangeText={t => setTask({ ...task, title: t })}
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
