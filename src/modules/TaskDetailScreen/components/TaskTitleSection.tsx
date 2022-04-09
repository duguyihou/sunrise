import { updateTask } from 'app/tasksSlice'
import { useAppDispatch, useTasks } from 'hooks/app'
import { useUpdateTaskMutation } from 'hooks/tasks'
import { Checkbox } from 'modules/common/components'
import React from 'react'
import { StyleSheet, TextInput } from 'react-native'

function TaskTitleSection() {
  const dispatch = useAppDispatch()
  const task = useTasks()

  const { status, title } = task
  const updateTaskStatusMutation = useUpdateTaskMutation({
    ...task,
    status: !status,
  })
  const handleCheck = () => updateTaskStatusMutation.mutate()
  const handleOnChangeText = (text: string) =>
    dispatch(updateTask({ ...task, title: text }))

  return (
    <Checkbox
      isChecked={status}
      onPress={handleCheck}
      textComponent={
        <TextInput
          style={styles.title}
          value={task.title}
          onChangeText={handleOnChangeText}
          placeholder="Add a Task"
          blurOnSubmit={false}
        />
      }
      text={title}
    />
  )
}

export default TaskTitleSection

const styles = StyleSheet.create({
  title: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
})
