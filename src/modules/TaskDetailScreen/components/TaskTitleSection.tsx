import { useUpdateTaskStatus, useUpdateTaskTitle } from 'hooks/tasks'
import { Checkbox } from 'modules/common/components'
import React, { useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { Task } from 'typings/task'

type Props = {
  task: Task
}
function TaskTitleSection({ task }: Props) {
  const { status, title } = task
  const [text, setText] = useState(title)
  const updateTaskTitle = useUpdateTaskTitle({ ...task, title: text })
  const updateTaskStatus = useUpdateTaskStatus({
    ...task,
    status: !status,
  })

  const handleTitle = () => updateTaskTitle.mutate()
  const handleCheck = () => updateTaskStatus.mutate()

  return (
    task && (
      <View style={styles.container}>
        <Checkbox isChecked={task.status} onPress={handleCheck} />
        <TextInput
          style={styles.title}
          value={text}
          onChangeText={setText}
          placeholder="Add a Task"
          blurOnSubmit={false}
          onSubmitEditing={handleTitle}
        />
      </View>
    )
  )
}

export default TaskTitleSection

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  title: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
})
