import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { updateSubtask } from 'app/tasksSlice'
import { useAppDispatch, useTasklists, useTasks } from 'hooks/app'
import { useAddSubtaskMutation, useFetchSubtasksQuery } from 'hooks/tasks'
import { Checkbox, IconButton } from 'modules/common/components'
import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { TaskPayload } from 'typings/task'

function TaskSubtaskSection() {
  const { subtaskTitle, taskDetail } = useTasks()
  const { tasklist } = useTasklists()
  const dispatch = useAppDispatch()
  const { data: subtasks } = useFetchSubtasksQuery(tasklist.id, taskDetail.id)
  const addSubtaskMutation = useAddSubtaskMutation(tasklist.id, taskDetail.id, {
    title: subtaskTitle,
  } as TaskPayload)
  const handleOnChangeText = (text: string) => dispatch(updateSubtask(text))
  const handleSubmitEditing = () => addSubtaskMutation.mutate()
  return (
    <View style={styles.container}>
      {subtasks &&
        subtasks.map(task => (
          <Checkbox
            key={task.id}
            isChecked={task.status}
            onPress={() => console.log('🐵 ', task.title)}
            text={task.title}
            textStyle={styles.subtask}
          />
        ))}
      <View style={styles.addContainer}>
        <IconButton icon={faPlus} />
        <TextInput
          style={styles.add}
          value={subtaskTitle}
          onChangeText={handleOnChangeText}
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
