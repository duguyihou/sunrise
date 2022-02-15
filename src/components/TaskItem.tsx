import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Task } from 'typings'
import { windowWidth } from 'utils/dimensions'
import Checkbox from './Checkbox'
import { useUpdateTaskStatusMutation } from 'hooks/tasks'
import { TaskStatus, theme } from 'shared'

type Props = {
  task: Task
  tasklistId: string
}
const TaskItem = ({ task, tasklistId }: Props) => {
  const { title, id, status } = task
  console.log('🐵 task', task)
  const [isChecked, setIsChecked] = useState(status === TaskStatus.Completed)
  console.log('🐵 ', isChecked)
  const updateTaskStatusMutation = useUpdateTaskStatusMutation(tasklistId, id, {
    ...task,
    status: isChecked ? TaskStatus.Completed : TaskStatus.NeedsAction,
  })
  const handleCheck = () => {
    setIsChecked(!isChecked)
    updateTaskStatusMutation.mutate()
  }
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => console.log('🐵 touch')}>
      <Checkbox onPress={handleCheck} isChecked={isChecked} />
      <Text style={isChecked ? styles.completedTitle : styles.needsActionTitle}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default TaskItem

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: windowWidth,
    padding: 10,
  },
  needsActionTitle: {
    fontSize: 20,
  },
  completedTitle: {
    fontSize: 20,
    color: theme.font.placeholder,
    textDecorationLine: 'line-through',
  },
})
