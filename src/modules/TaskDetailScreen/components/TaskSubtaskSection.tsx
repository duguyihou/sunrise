import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useAddSubtaskMutation, useFetchSubtasksQuery } from 'hooks/tasks'
import { Checkbox, IconButton } from 'modules/common/components'
import React, { useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { TaskPayload } from 'typings/task'

type Props = {
  tasklistId: string
  taskId: string
}
function TaskSubtaskSection({ tasklistId, taskId }: Props) {
  const [subtaskTitle, setSubtaskTitle] = useState('')
  const { data: subtasks } = useFetchSubtasksQuery(tasklistId, taskId)
  const addSubtaskMutation = useAddSubtaskMutation(tasklistId, taskId, {
    title: subtaskTitle,
  } as TaskPayload)
  const handleSubmitEditing = () => {
    addSubtaskMutation.mutate()
    setSubtaskTitle('')
  }
  return (
    <View style={styles.container}>
      {subtasks &&
        subtasks.map(subtask => (
          <Checkbox
            key={subtask.id}
            isChecked={subtask.status}
            onPress={() => console.log('🐵 ', subtask.title)}
            text={subtask.title}
            textStyle={styles.subtask}
          />
        ))}
      <View style={styles.addContainer}>
        <IconButton icon={faPlus} />
        <TextInput
          style={styles.add}
          value={subtaskTitle}
          onChangeText={setSubtaskTitle}
          placeholder="Add subtasks"
          blurOnSubmit={false}
          onSubmitEditing={handleSubmitEditing}
        />
      </View>
    </View>
  )
}

export default TaskSubtaskSection

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingVertical: 10,
  },
  addContainer: {
    flexDirection: 'row',
  },
  add: {
    flex: 1,
    paddingHorizontal: 10,
  },
  subtask: {
    paddingVertical: 5,
  },
})
