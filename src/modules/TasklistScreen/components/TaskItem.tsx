import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { StackNavigationProps } from 'typings/route'
import { Task } from 'typings/task'
import { Checkbox, DateTimeText } from 'modules/common/components'
import { useUpdateTaskMutation } from 'hooks/tasks'
import { RouteName } from 'shared/constants'
import { theme } from 'shared/theme'
import { useNavigation } from '@react-navigation/native'

type Props = {
  task: Task
}
const TaskItem = ({ task }: Props) => {
  const { title, selfLink, status, due, notes } = task
  const navigation = useNavigation<StackNavigationProps>()

  const updateTaskMutation = useUpdateTaskMutation({ ...task, status: !status })
  const handleCheck = () => updateTaskMutation.mutate()
  const navigateToTaskDetail = () =>
    navigation.push(RouteName.TaskDetail, { selfLink })
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={navigateToTaskDetail}>
      <Checkbox isChecked={status} onPress={handleCheck} text={title} />
      {notes && (
        <Text numberOfLines={2} style={styles.notes}>
          {notes}
        </Text>
      )}
      {due && <DateTimeText dateTime={due} style={styles.dateTimeText} />}
    </TouchableOpacity>
  )
}

export default TaskItem

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },

  dateTimeText: {
    fontSize: 10,
    paddingLeft: 40,
    marginTop: 4,
  },

  notes: {
    color: theme.font.placeholder,
    paddingVertical: 5,
    paddingLeft: 40,
    marginTop: 4,
  },
})
