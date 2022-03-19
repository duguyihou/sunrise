import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { getCalendar } from 'utils/dateTime'
import { TaskStatus, theme } from 'shared'
import { useUpdateTaskMutation } from 'hooks/tasks'
import { Task } from 'typings'

type Props = {
  task: Task
}
const TaskInfo = ({ task }: Props) => {
  const { selfLink, updated, status } = task
  const isChecked = status === TaskStatus.Completed
  const updateTaskMutation = useUpdateTaskMutation(selfLink, {
    ...task,
    status: !isChecked ? TaskStatus.Completed : TaskStatus.NeedsAction,
  })
  const handleComplete = () => updateTaskMutation.mutate() //TODO: goback()
  const buttonTitle =
    status === TaskStatus.NeedsAction
      ? 'Marked completed'
      : 'Marked uncompleted'
  return (
    <View style={styles.container}>
      <Text style={styles.updateInfo}>Updated {getCalendar(updated)}</Text>
      <TouchableOpacity onPress={handleComplete}>
        <Text style={styles.button}>{buttonTitle}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default TaskInfo

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  updateInfo: {
    flex: 1,
    fontSize: 12,
    textAlign: 'center',
  },
  button: {
    fontSize: 14,
    color: theme.font.primary,
  },
})
