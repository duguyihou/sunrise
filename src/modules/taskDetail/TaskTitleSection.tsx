import React from 'react'
import { Checkbox } from 'modules/common/components'
import { useUpdateTaskMutation } from 'hooks/tasks'
import { useAppDispatch, useAppSelector } from 'common/app/hooks'
import { StyleSheet, TextInput } from 'react-native'
import { updateTaskDetail } from 'common/app/tasks'

const TaskTitleSection = () => {
  const dispatch = useAppDispatch()
  const { taskDetail } = useAppSelector(state => state.tasks)

  const { status, title } = taskDetail
  const updateTaskStatusMutation = useUpdateTaskMutation({
    ...taskDetail,
    status: !status,
  })
  const handleCheck = () => updateTaskStatusMutation.mutate()
  const handleOnChangeText = (text: string) =>
    dispatch(updateTaskDetail({ ...taskDetail, title: text }))

  return (
    <Checkbox
      isChecked={status}
      onPress={handleCheck}
      textComponent={
        <TextInput
          style={styles.title}
          value={taskDetail.title}
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
