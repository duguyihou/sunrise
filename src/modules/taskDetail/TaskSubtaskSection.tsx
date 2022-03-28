import { StyleSheet, TextInput, View } from 'react-native'
import React from 'react'
import IconButton from './IconButton'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import {
  useAddSubtaskMutation,
  useFetchSubtasksQuery,
} from 'common/hooks/tasks'
import { TaskPayload } from 'typings'
import { useAppDispatch, useAppSelector } from 'common/app/hooks'
import { updateSubtask } from 'common/app/tasks'
import Checkbox from './Checkbox'

const TaskSubtaskSection = () => {
  const {
    subtask,
    taskDetail: { id },
  } = useAppSelector(state => state.tasks)
  const dispatch = useAppDispatch()
  const { tasklistId, title } = subtask
  const { data: subtasks } = useFetchSubtasksQuery(tasklistId, id)
  const addSubtaskMutation = useAddSubtaskMutation(tasklistId, id, {
    title,
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
          value={title}
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
