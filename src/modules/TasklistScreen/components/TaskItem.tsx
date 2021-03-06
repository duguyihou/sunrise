import { useNavigation } from '@react-navigation/native'
import { useUpdateTaskStatus } from 'hooks/tasks'
import { Checkbox, DateTimeText } from 'modules/common/components'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { RouteName } from 'shared/constants'
import { theme } from 'shared/theme'
import { StackNavigationProps } from 'typings/route'
import { Task } from 'typings/task'

type Props = {
  task: Task
  tasklistId: string
}
function TaskItem({ task, tasklistId }: Props) {
  const { title, id, status, due, notes } = task
  const navigation = useNavigation<StackNavigationProps>()

  const updateTaskStatus = useUpdateTaskStatus({ ...task, status: !status })
  const handleCheck = () => updateTaskStatus.mutate()
  const navigateToTaskDetail = () =>
    navigation.push(RouteName.TaskDetail, { taskId: id, tasklistId })
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={navigateToTaskDetail}>
      <View style={styles.title}>
        <Checkbox isChecked={status} onPress={handleCheck} />
        <Text>{title}</Text>
      </View>
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

  title: {
    flexDirection: 'row',
    alignItems: 'center',
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
